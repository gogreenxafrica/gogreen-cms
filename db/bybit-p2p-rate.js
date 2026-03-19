/**
 * Bybit P2P Rate Engine
 * Fetches real-time USD/NGN rates from Bybit P2P marketplace
 * No API keys required - uses public endpoint
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Fallback storage
const FALLBACK_PATH = path.join(__dirname, 'last_bybit_rate.json');

// Safety limits
const MIN_LIMIT = 5000;  // Ignore ads with limits below 5k NGN
const MAX_REASONABLE_PRICE = 2000; // Ignore suspicious prices above ₦2000/$
const MIN_REASONABLE_PRICE = 1000; // Ignore suspicious prices below ₦1000/$
const MIN_COMPLETION_RATE = 0.95; // Only trust advertisers with 95%+ completion

/**
 * Fetch P2P ads from Bybit
 * @param {string} side - '0' for BUY (get sellers), '1' for SELL (get buyers)
 * @returns {Promise<Array>}
 */
function fetchBybitP2P(side) {
  return new Promise((resolve, reject) => {
    const url = `https://api.bybit.com/v5/market/get-p2p-ad?tokenId=USDT&currencyId=NGN&side=${side}&size=100`;
    
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          
          if (parsed.retCode === 0 && parsed.result && parsed.result.items) {
            resolve(parsed.result.items);
          } else {
            reject(new Error('Invalid API response: ' + (parsed.retMsg || 'Unknown error')));
          }
        } catch (err) {
          reject(new Error('JSON parse error: ' + err.message));
        }
      });
    }).on('error', (err) => {
      reject(new Error('HTTPS request failed: ' + err.message));
    });
  });
}

/**
 * Apply your exact filtering logic with safety checks
 * @param {Array} ads - Raw ads from API
 * @param {number} tradeAmount - Your intended trade amount in NGN
 * @returns {Array} Filtered ads
 */
function safeFilterAds(ads, tradeAmount = 50000) {
  if (!Array.isArray(ads) || ads.length === 0) {
    return [];
  }
  
  return ads
    // 1. Only eligible ads (has recent orders)
    .filter(ad => ad.recentOrderNum && parseInt(ad.recentOrderNum) > 0)
    
    // 2. Only block advertisers (high completion rate >= 95%)
    .filter(ad => ad.recentExecuteRate && parseFloat(ad.recentExecuteRate) >= MIN_COMPLETION_RATE)
    
    // 3. Amount must fit within ad limits
    .filter(ad => {
      const min = parseFloat(ad.minAmount || 0);
      const max = parseFloat(ad.maxAmount || 0);
      
      // Ignore very low limits
      if (min < MIN_LIMIT) return false;
      
      return tradeAmount >= min && tradeAmount <= max;
    })
    
    // 4. Must have valid price within reasonable range
    .filter(ad => {
      const price = parseFloat(ad.price || 0);
      return price >= MIN_REASONABLE_PRICE && price <= MAX_REASONABLE_PRICE;
    })
    
    // 5. Sort by completed order number (highest first)
    .sort((a, b) => parseInt(b.recentOrderNum) - parseInt(a.recentOrderNum));
}

/**
 * Calculate realistic average from top ads, ignoring outliers
 * @param {Array} ads - Filtered ads
 * @param {number} topN - Number of top ads to consider
 * @returns {number} Average price
 */
function calculateAveragePrice(ads, topN = 10) {
  if (!Array.isArray(ads) || ads.length === 0) {
    return 0;
  }
  
  // Take top N ads
  const topAds = ads.slice(0, Math.min(topN, ads.length));
  const prices = topAds.map(ad => parseFloat(ad.price)).filter(p => p > 0);
  
  if (prices.length === 0) return 0;
  if (prices.length === 1) return prices[0];
  
  // Calculate mean
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  
  // Calculate standard deviation
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  const stdDev = Math.sqrt(variance);
  
  // Remove outliers (prices > 2 standard deviations from mean)
  const filtered = prices.filter(price => Math.abs(price - mean) <= 2 * stdDev);
  
  if (filtered.length === 0) return mean;
  
  // Return average of non-outliers, rounded to 2 decimals
  const average = filtered.reduce((a, b) => a + b, 0) / filtered.length;
  return Math.round(average * 100) / 100;
}

/**
 * Load last saved rate (fallback)
 * @returns {Object|null}
 */
function loadFallbackRate() {
  try {
    if (fs.existsSync(FALLBACK_PATH)) {
      const data = fs.readFileSync(FALLBACK_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load fallback rate:', err.message);
  }
  return null;
}

/**
 * Save rate as fallback
 * @param {Object} rateData
 */
function saveFallbackRate(rateData) {
  try {
    fs.writeFileSync(FALLBACK_PATH, JSON.stringify(rateData, null, 2));
  } catch (err) {
    console.error('Failed to save fallback rate:', err.message);
  }
}

/**
 * MAIN FUNCTION - Get Bybit P2P market rates
 * @param {number} tradeAmount - Your typical trade amount in NGN (default 50k)
 * @returns {Promise<Object>} Rate object
 */
async function getBybitP2PRate(tradeAmount = 50000) {
  try {
    console.log('🔍 Fetching Bybit P2P rates for ₦' + tradeAmount.toLocaleString() + ' trades...');
    
    // Fetch both sides in parallel
    const [sellersRaw, buyersRaw] = await Promise.all([
      fetchBybitP2P('0'), // We buy USDT (from sellers)
      fetchBybitP2P('1')  // We sell USDT (to buyers)
    ]);
    
    console.log(`📊 Fetched ${sellersRaw.length} sellers, ${buyersRaw.length} buyers`);
    
    // Filter ads with safety checks
    const sellers = safeFilterAds(sellersRaw, tradeAmount);
    const buyers = safeFilterAds(buyersRaw, tradeAmount);
    
    console.log(`✅ After filtering: ${sellers.length} valid sellers, ${buyers.length} valid buyers`);
    
    if (sellers.length === 0 || buyers.length === 0) {
      throw new Error('Not enough valid ads after filtering (need sellers and buyers)');
    }
    
    // Calculate rates from top 10 ads each
    const marketBuyRate = calculateAveragePrice(sellers, 10);  // You buy USDT at this rate
    const marketSellRate = calculateAveragePrice(buyers, 10); // You sell USDT at this rate
    
    if (marketBuyRate === 0 || marketSellRate === 0) {
      throw new Error('Calculated rate is zero - data quality issue');
    }
    
    const result = {
      market_buy_rate: Math.round(marketBuyRate),
      market_sell_rate: Math.round(marketSellRate),
      source: 'bybit_p2p',
      timestamp: new Date().toISOString(),
      metadata: {
        sellers_count: sellers.length,
        buyers_count: buyers.length,
        trade_amount: tradeAmount,
        top_seller_price: sellers.length > 0 ? parseFloat(sellers[0].price) : null,
        top_buyer_price: buyers.length > 0 ? parseFloat(buyers[0].price) : null
      }
    };
    
    // Save as fallback
    saveFallbackRate(result);
    
    console.log(`💰 Market Buy Rate (you buy USDT): ₦${result.market_buy_rate}`);
    console.log(`💰 Market Sell Rate (you sell USDT): ₦${result.market_sell_rate}`);
    console.log(`📈 Spread: ₦${result.market_sell_rate - result.market_buy_rate}`);
    
    return result;
    
  } catch (err) {
    console.error('❌ Bybit P2P fetch failed:', err.message);
    
    // Try to use fallback
    const fallback = loadFallbackRate();
    
    if (fallback) {
      const ageMinutes = Math.round((Date.now() - new Date(fallback.timestamp).getTime()) / 60000);
      console.warn(`⚠️ Using fallback rate from ${ageMinutes} minutes ago`);
      
      return {
        market_buy_rate: fallback.market_buy_rate,
        market_sell_rate: fallback.market_sell_rate,
        source: 'bybit_p2p_fallback',
        timestamp: new Date().toISOString(),
        metadata: {
          ...fallback.metadata,
          fallback_age_minutes: ageMinutes,
          original_timestamp: fallback.timestamp
        }
      };
    }
    
    throw new Error('Bybit P2P failed and no fallback available: ' + err.message);
  }
}

// Export for use in your system
module.exports = { getBybitP2PRate };

// Allow direct testing: node bybit-p2p-rate.js
if (require.main === module) {
  getBybitP2PRate(50000)
    .then(result => {
      console.log('\n📋 Full Result:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('\n💥 Error:', err.message);
      process.exit(1);
    });
}
