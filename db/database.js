/**
 * Pure JSON file database — zero compilation, works on any host.
 * Data stored in db/data.json
 * 
 * NOW WITH BYBIT P2P RATE ENGINE — fetches real rates every 6 hours
 */
const fs     = require('fs');
const path   = require('path');
const bcrypt = require('bcryptjs');
const { getBybitP2PRate } = require('./bybit-p2p-rate');
const DATA_PATH = process.env.DB_PATH || path.join(__dirname, 'data.json');

// ── Default data ──
const DEFAULT = {
  settings: {
    buy_rate:        { value: '1388',                          label: 'We Buy Rate',        group: 'rates' },
    sell_rate:       { value: '1489',                          label: 'We Sell Rate',        group: 'rates' },
    wa_number:       { value: '2347010975329',                 label: 'WhatsApp Number',     group: 'contact' },
    ig_handle:       { value: 'gogreenxafrica',                label: 'Instagram Handle',    group: 'social' },
    tiktok:          { value: 'gogreenxafrica',                label: 'TikTok Handle',       group: 'social' },
    twitter:         { value: 'gogreenxafrica',                label: 'Twitter/X Handle',    group: 'social' },
    hero_headline:   { value: 'Whatever Digital Money.',       label: 'Hero Headline',       group: 'hero' },
    hero_subheading: { value: 'Get Naira. Fast.',              label: 'Hero Subheading',     group: 'hero' },
    hero_badge:      { value: 'Live & Trading 24/7',           label: 'Hero Badge',          group: 'hero' },
    feat1_tag:       { value: 'Trust & Safety',                label: 'Feature 1 Tag',       group: 'features' },
    feat1_title:     { value: 'CAC Registered & Trademarked',  label: 'Feature 1 Title',     group: 'features' },
    feat1_body:      { value: 'CAC registered, trademarked. 50+ proofs on Instagram.', label: 'Feature 1 Body', group: 'features' },
    feat2_tag:       { value: 'Speed',                         label: 'Feature 2 Tag',       group: 'features' },
    feat2_title:     { value: 'Instant Naira. No Delays.',     label: 'Feature 2 Title',     group: 'features' },
    feat2_body:      { value: 'Once confirmed, e don enter your account. No stories.', label: 'Feature 2 Body', group: 'features' },
    feat3_tag:       { value: 'Coverage',                      label: 'Feature 3 Tag',       group: 'features' },
    feat3_title:     { value: 'Any Currency. Any Country.',    label: 'Feature 3 Title',     group: 'features' },
    feat3_body:      { value: 'EUR, USD, UK, Canada, India and more.', label: 'Feature 3 Body', group: 'features' },
    cta_heading:     { value: 'Ready to trade?',               label: 'CTA Heading',         group: 'cta' },
    footer_copy:     { value: '© 2026 Purplegreen Investment Limited', label: 'Footer Copyright', group: 'footer' },
    auto_buy_spread:    { value: '-30',  label: 'Buy Spread',         group: 'automation' },
    auto_sell_spread:   { value: '60',   label: 'Sell Spread',        group: 'automation' },
    auto_market_rate:   { value: '0',    label: 'Last Market Rate',   group: 'automation' },
    auto_last_fetched:  { value: '',     label: 'Last Fetch Time',    group: 'automation' },
    auto_scrape_status: { value: 'idle', label: 'Scraper Status',     group: 'automation' },
    auto_enabled:       { value: '1',    label: 'Auto Rate Enabled',  group: 'automation' },
  },
  reviews: [
    { id: 1, name: '@opeyemiiii_', handle: '@opeyemiiii_', platform: 'Instagram', quote: 'Tested and trusted. Emphasis on the fast.', source_url: 'https://www.instagram.com/reel/DShQ3wrCClp/?comment_id=17911295154146322', initials: 'OP', active: true, sort_order: 1 },
    { id: 2, name: 'Niki Lauda', handle: 'Niki Lauda', platform: 'TikTok', quote: "Omoooo the most reliable vendor ever, never ever disappoints me in any form. I love y'all", source_url: 'https://www.tiktok.com/@gogreenxafrica/video/7453028858912206118', initials: 'NL', active: true, sort_order: 2 },
    { id: 3, name: '@winnie_xcx', handle: '@winnie_xcx', platform: 'Instagram', quote: 'Seamless service, very impressive.', source_url: 'https://www.instagram.com/reel/DShP99GCEII/?comment_id=18092244838973814', initials: 'WX', active: true, sort_order: 3 },
  ],
  faqs: [
    { id: 1, question: 'Is Gogreen legit?', answer: 'We are CAC-registered under Purplegreen Investment Limited. Check @gogreenxafrica on Instagram — 50+ real proofs.', active: true, sort_order: 1 },
    { id: 2, question: 'Do you buy BTC and crypto?', answer: 'Yes — BTC, USDT, ETH and more. Send asset type and amount on WhatsApp for a live rate.', active: true, sort_order: 2 },
    { id: 3, question: 'How fast is payment?', answer: 'Instant after confirmation. No delay, no story.', active: true, sort_order: 3 },
    { id: 4, question: 'Do you accept PayPal and digital wallets?', answer: 'Yes — PayPal, CashApp, Chime, Apple Pay, Venmo, GCash, Revolut, Skrill, Neteller and more.', active: true, sort_order: 4 },
    { id: 5, question: 'Which countries do you cover?', answer: 'EUR/SEPA, UK, US, Canada, Australia, Mexico, India and many more.', active: true, sort_order: 5 },
  ],
  services: [
    { id: 1, name: 'Crypto', description: 'USDT, USDC, SOL, BTC, ETH and more.', icon: 'crypto', wa_message: 'Crypto', active: true, sort_order: 1 },
    { id: 2, name: 'Gift Cards', description: 'Amazon, iTunes, Steam, Google Play and more.', icon: 'gift', wa_message: 'Gift Cards', active: true, sort_order: 2 },
    { id: 3, name: 'CashApp', description: 'Send your CashApp balance. Receive naira to your bank.', icon: 'cashapp', wa_message: 'CashApp', active: true, sort_order: 3 },
    { id: 4, name: 'EUR Payments', description: 'Got euros? We convert at competitive rates.', icon: 'eur', wa_message: 'EUR Payments', active: true, sort_order: 4 },
    { id: 5, name: 'USA Transfers', description: 'Receive funds from the US fast.', icon: 'transfer', wa_message: 'USA Transfers', active: true, sort_order: 5 },
    { id: 6, name: 'Wire Transfers', description: 'International wire payments processed fast.', icon: 'wire', wa_message: 'Wire Transfers', active: true, sort_order: 6 },
  ],
  admin_users: [],
  _nextId: { reviews: 4, faqs: 6, services: 7 }
};

// ── Load / save ──
function load() {
  try {
    if (fs.existsSync(DATA_PATH)) {
      return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('DB load error:', e.message);
  }
  return JSON.parse(JSON.stringify(DEFAULT));
}

function save(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('DB save error:', e.message);
  }
}

function getDB() {
  return load();
}

// ── 🤖 BYBIT P2P RATE ENGINE ──
async function updateRatesFromBybit() {
  const data = load();
  
  // Check if auto rate is enabled
  if (data.settings.auto_enabled && data.settings.auto_enabled.value === '0') {
    console.log('🤖 Auto rate disabled, skipping Bybit update');
    return;
  }
  
  console.log('🤖 Bybit P2P: Fetching real-time USDT/NGN rates...');
  
  data.settings.auto_scrape_status.value = 'fetching';
  save(data);
  
  try {
    // Fetch rates from Bybit P2P (50k NGN typical trade amount)
    const rateData = await getBybitP2PRate(50000);
    
    console.log('✅ Bybit P2P rates received');
    console.log('📊 Market Buy Rate (baseline): ₦' + rateData.market_buy_rate);
    console.log('📊 Market Sell Rate (reference): ₦' + rateData.market_sell_rate);
    
    // Apply your spread settings
    const buySpread = parseInt(data.settings.auto_buy_spread.value) || -30;
    const sellSpread = parseInt(data.settings.auto_sell_spread.value) || 60;
    
    // Use market buy rate as baseline for both (consistent base)
    const ourBuyRate = Math.round(rateData.market_buy_rate + buySpread);   // Market - 30
    const ourSellRate = Math.round(rateData.market_buy_rate + sellSpread); // Market + 60
    
    console.log('💰 Our Buy Rate (we buy from customers): ₦' + ourBuyRate + ' (market ' + buySpread + ')');
    console.log('💰 Our Sell Rate (we sell to customers): ₦' + ourSellRate + ' (market +' + sellSpread + ')');
    console.log('📈 Our Spread: ₦' + (ourSellRate - ourBuyRate));
    
    // Update database
    const freshData = load();
    freshData.settings.buy_rate.value = String(ourBuyRate);
    freshData.settings.sell_rate.value = String(ourSellRate);
    freshData.settings.auto_market_rate.value = String(rateData.market_buy_rate);
    freshData.settings.auto_last_fetched.value = rateData.timestamp;
    freshData.settings.auto_scrape_status.value = 'success';
    
    save(freshData);
    console.log('✅ Rates updated successfully from Bybit P2P!');
    
  } catch (err) {
    console.error('❌ Bybit P2P update failed:', err.message);
    
    const freshData = load();
    freshData.settings.auto_scrape_status.value = 'error';
    save(freshData);
  }
}

// ── Init ──
async function initDB() {
  let data = load();

  // Merge any missing default settings
  for (const [key, val] of Object.entries(DEFAULT.settings)) {
    if (!data.settings[key]) data.settings[key] = val;
  }
  if (!data._nextId) data._nextId = { ...DEFAULT._nextId };

  // Seed admin if empty
  if (!data.admin_users || data.admin_users.length === 0) {
    const pass = process.env.ADMIN_PASS || 'gogreen2026';
    const hash = await bcrypt.hash(pass, 12);
    data.admin_users = [{ id: 1, username: 'admin', password_hash: hash }];
    console.log('Admin created — user: admin  pass:', pass);
  }

  // Apply env overrides to rates
  if (process.env.BUY_RATE)  data.settings.buy_rate.value  = process.env.BUY_RATE;
  if (process.env.SELL_RATE) data.settings.sell_rate.value = process.env.SELL_RATE;
  if (process.env.WA_NUMBER) data.settings.wa_number.value = process.env.WA_NUMBER;

  save(data);
  console.log('Database ready —', DATA_PATH);
  
  // 🤖 Start Bybit P2P rate engine with random intervals
  console.log('🚀 Bybit P2P Rate Engine initialized - updating every 2-5 minutes (random)');
  
  /**
   * Schedule next update with random interval between 2-5 minutes
   */
  function scheduleNextUpdate() {
    // Random interval between 2 and 5 minutes (in milliseconds)
    const minInterval = 2 * 60 * 1000;  // 2 minutes
    const maxInterval = 5 * 60 * 1000;  // 5 minutes
    const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
    
    const nextUpdateMinutes = (randomInterval / 60000).toFixed(1);
    console.log(`⏰ Next rate update in ${nextUpdateMinutes} minutes`);
    
    setTimeout(async () => {
      await updateRatesFromBybit();
      scheduleNextUpdate(); // Schedule the next one after this completes
    }, randomInterval);
  }
  
  // Run first update after 10 seconds (give server time to start)
  setTimeout(async () => {
    await updateRatesFromBybit();
    scheduleNextUpdate(); // Start the random scheduling loop
  }, 10000);
}

module.exports = { getDB, save, load, initDB };
