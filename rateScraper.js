const https = require('https');
const { load, save } = require('../db/database');

const SCRAPE_URL  = 'https://www.ngnrates.com/market/exchange-rates/us-dollar-to-naira/black-market';
const INTERVAL_MS = 60 * 60 * 1000;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,*/*;q=0.8',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function parseRate(html) {
  const patterns = [
    /average of[^₦\d]*₦\s*([\d,]+(?:\.\d+)?)/i,
    /parallel market[^₦\d]*₦\s*([\d,]+(?:\.\d+)?)/i,
    /black.market[^₦\d]*₦\s*([\d,]+(?:\.\d+)?)/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) {
      const rate = parseFloat(m[1].replace(/,/g, ''));
      if (rate > 500 && rate < 10000) return rate;
    }
  }
  return null;
}

async function scrapeAndUpdate() {
  console.log('[RateScraper] Fetching...');
  try {
    const html = await fetchPage(SCRAPE_URL);
    const marketRate = parseRate(html);
    if (!marketRate) {
      const data = load();
      data.settings.auto_scrape_status.value = 'parse_failed';
      save(data);
      return null;
    }
    const data = load();
    const buySpread  = parseFloat(data.settings.auto_buy_spread?.value)  || -30;
    const sellSpread = parseFloat(data.settings.auto_sell_spread?.value) ||  60;
    const buyRate  = Math.round(marketRate + buySpread);
    const sellRate = Math.round(marketRate + sellSpread);
    data.settings.auto_market_rate.value   = String(marketRate);
    data.settings.buy_rate.value           = String(buyRate);
    data.settings.sell_rate.value          = String(sellRate);
    data.settings.auto_last_fetched.value  = new Date().toISOString();
    data.settings.auto_scrape_status.value = 'ok';
    save(data);
    console.log('[RateScraper] Market:', marketRate, '| Buy:', buyRate, '| Sell:', sellRate);
    return { marketRate, buyRate, sellRate };
  } catch (err) {
    try {
      const data = load();
      data.settings.auto_scrape_status.value = 'error: ' + err.message;
      save(data);
    } catch(e) {}
    console.error('[RateScraper] Failed:', err.message);
    return null;
  }
}

async function startScraper() {
  const data = load();
  if (data.settings.auto_enabled?.value !== '1') { console.log('[RateScraper] Disabled'); return; }
  scrapeAndUpdate();
  setInterval(scrapeAndUpdate, INTERVAL_MS);
  console.log('[RateScraper] Started — runs every 60 min');
}

module.exports = { startScraper, scrapeAndUpdate, parseRate };
