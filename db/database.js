/**
 * FULLY CUSTOMIZABLE CMS DATABASE
 * Every visual element on landing page is editable via CMS
 */
const fs     = require('fs');
const path   = require('path');
const bcrypt = require('bcryptjs');

const DATA_PATH = process.env.DB_PATH || path.join(__dirname, 'data.json');

// ── Default data ──
const DEFAULT = {
  settings: {
    // ── RATES ──
    buy_rate:        { value: '0', label: 'We Buy Rate', group: 'rates' },
    sell_rate:       { value: '0', label: 'We Sell Rate', group: 'rates' },
    
    // ── CONTACT ──
    wa_number:       { value: '2347010975329', label: 'WhatsApp Number', group: 'contact' },
    
    // ── SOCIAL MEDIA ──
    ig_handle:       { value: 'gogreenxafrica', label: 'Instagram Handle', group: 'social' },
    ig_backup:       { value: '', label: 'Instagram Backup', group: 'social' },
    tiktok:          { value: 'gogreenxafrica', label: 'TikTok Handle', group: 'social' },
    twitter:         { value: 'gogreenxafrica', label: 'Twitter/X Handle', group: 'social' },
    linkedin:        { value: '', label: 'LinkedIn', group: 'social' },
    
    // ── BRANDING ──
    site_name:       { value: 'Gogreen Exchange', label: 'Site Name', group: 'branding' },
    logo_text:       { value: 'GG', label: 'Logo Text (2-3 chars)', group: 'branding' },
    favicon_emoji:   { value: '💚', label: 'Favicon Emoji', group: 'branding' },
    company_name:    { value: 'Purplegreen Investment Limited', label: 'Company Legal Name', group: 'branding' },
    
    // ── THEME COLORS ──
    color_primary:   { value: '#2DA437', label: 'Primary Green', group: 'colors' },
    color_secondary: { value: '#89CE33', label: 'Light Green', group: 'colors' },
    color_bg_dark:   { value: '#080c08', label: 'Dark Background', group: 'colors' },
    color_bg_light:  { value: '#f5f9f5', label: 'Light Background', group: 'colors' },
    color_text_dark: { value: '#0a0e0a', label: 'Dark Text', group: 'colors' },
    color_text_light:{ value: '#eef2ee', label: 'Light Text', group: 'colors' },
    
    // ── HERO SECTION ──
    hero_badge:      { value: 'Live & Trading 24/7', label: 'Hero Badge', group: 'hero' },
    hero_headline:   { value: 'Whatever Digital Money.', label: 'Hero Headline', group: 'hero' },
    hero_subheading: { value: 'Get Naira. Fast.', label: 'Hero Subheading', group: 'hero' },
    hero_sub:        { value: '', label: 'Hero Sub-text (optional)', group: 'hero' },
    bento_quote:     { value: '', label: 'Bento Quote (optional)', group: 'hero' },
    
    // ── ANIMATED HERO WORDS ──
    hero_word1:      { value: 'USDT', label: 'Word 1', group: 'hero_words' },
    hero_word2:      { value: 'PayPal', label: 'Word 2', group: 'hero_words' },
    hero_word3:      { value: 'Gift Cards', label: 'Word 3', group: 'hero_words' },
    hero_word4:      { value: 'CashApp', label: 'Word 4', group: 'hero_words' },
    hero_word5:      { value: 'Crypto', label: 'Word 5', group: 'hero_words' },
    hero_word6:      { value: 'EUR', label: 'Word 6', group: 'hero_words' },
    hero_word7:      { value: 'Venmo', label: 'Word 7', group: 'hero_words' },
    hero_word8:      { value: 'BTC', label: 'Word 8', group: 'hero_words' },
    
    // ── FEATURES ──
    feat1_tag:       { value: 'Trust & Safety', label: 'Feature 1 Tag', group: 'features' },
    feat1_title:     { value: 'CAC Registered & Trademarked', label: 'Feature 1 Title', group: 'features' },
    feat1_body:      { value: 'CAC registered, trademarked. 50+ proofs on Instagram.', label: 'Feature 1 Body', group: 'features' },
    feat2_tag:       { value: 'Speed', label: 'Feature 2 Tag', group: 'features' },
    feat2_title:     { value: 'Instant Naira. No Delays.', label: 'Feature 2 Title', group: 'features' },
    feat2_body:      { value: 'Once confirmed, e don enter your account. No stories.', label: 'Feature 2 Body', group: 'features' },
    feat3_tag:       { value: 'Coverage', label: 'Feature 3 Tag', group: 'features' },
    feat3_title:     { value: 'Any Currency. Any Country.', label: 'Feature 3 Title', group: 'features' },
    feat3_body:      { value: 'EUR, USD, UK, Canada, India and more.', label: 'Feature 3 Body', group: 'features' },
    
    // ── HOW IT WORKS ──
    how_section_title: { value: 'How It Works', label: 'Section Title', group: 'how' },
    how_step1_emoji:   { value: '💬', label: 'Step 1 Emoji', group: 'how' },
    how_step1_title:   { value: 'Send a Message', label: 'Step 1 Title', group: 'how' },
    how_step1_body:    { value: 'Tap WhatsApp, tell us what you\'re trading.', label: 'Step 1 Description', group: 'how' },
    how_step2_emoji:   { value: '💸', label: 'Step 2 Emoji', group: 'how' },
    how_step2_title:   { value: 'Get Your Rate', label: 'Step 2 Title', group: 'how' },
    how_step2_body:    { value: 'We quote you instantly. No hidden fees.', label: 'Step 2 Description', group: 'how' },
    how_step3_emoji:   { value: '✅', label: 'Step 3 Emoji', group: 'how' },
    how_step3_title:   { value: 'Receive Naira', label: 'Step 3 Title', group: 'how' },
    how_step3_body:    { value: 'Transfer confirmed. Naira hits your account.', label: 'Step 3 Description', group: 'how' },
    
    // ── CTA SECTION ──
    cta_heading:     { value: 'Ready to trade?', label: 'CTA Heading', group: 'cta' },
    cta_body:        { value: '', label: 'CTA Body (optional)', group: 'cta' },
    cta_button_text: { value: 'Start Trading', label: 'Button Text', group: 'cta' },
    
    // ── FOOTER ──
    footer_copy:     { value: '© 2026 Purplegreen Investment Limited', label: 'Copyright Text', group: 'footer' },
    
    // ── THEME SWITCH EASTER EGG ──
    theme_emoji1:    { value: '🌙', label: 'Emoji 1', group: 'theme_easter' },
    theme_emoji2:    { value: '☀️', label: 'Emoji 2', group: 'theme_easter' },
    theme_emoji3:    { value: '💚', label: 'Emoji 3', group: 'theme_easter' },
    theme_emoji4:    { value: '🎉', label: 'Emoji 4', group: 'theme_easter' },
    theme_emoji5:    { value: '✨', label: 'Emoji 5', group: 'theme_easter' },
    theme_toast_msg: { value: 'Vibing! 🎨', label: 'Toast Message', group: 'theme_easter' },
    
    // ── CALCULATOR ──
    calc_title:      { value: 'Quick Calculator', label: 'Title', group: 'calculator' },
    calc_subtitle:   { value: 'See what you\'ll get', label: 'Subtitle', group: 'calculator' },
    
    // ── SEO / META ──
    meta_title:      { value: 'Gogreen Exchange — Trade It, Get Naira', label: 'Page Title', group: 'seo' },
    meta_description:{ value: 'Sell crypto, gift cards, CashApp and more. Get naira fast. Nigeria\'s trusted digital exchange. 24/7.', label: 'Meta Description', group: 'seo' },
    
    // ── AUTOMATION (Hidden) ──
    auto_buy_spread:    { value: '-30', label: 'Buy Spread', group: 'automation' },
    auto_sell_spread:   { value: '60', label: 'Sell Spread', group: 'automation' },
    auto_market_rate:   { value: '0', label: 'Market Rate', group: 'automation' },
    auto_last_fetched:  { value: '', label: 'Last Fetch', group: 'automation' },
    auto_scrape_status: { value: 'idle', label: 'Status', group: 'automation' },
    auto_enabled:       { value: '0', label: 'Enabled', group: 'automation' },
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
      const existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
      const merged = JSON.parse(JSON.stringify(DEFAULT));
      
      // Merge settings (preserve existing values, add new defaults)
      if (existing.settings) {
        Object.keys(DEFAULT.settings).forEach(key => {
          if (existing.settings[key]) {
            merged.settings[key].value = existing.settings[key].value;
          }
        });
      }
      
      // Preserve other data
      if (existing.reviews) merged.reviews = existing.reviews;
      if (existing.faqs) merged.faqs = existing.faqs;
      if (existing.services) merged.services = existing.services;
      if (existing.admin_users) merged.admin_users = existing.admin_users;
      if (existing._nextId) merged._nextId = existing._nextId;
      
      return merged;
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

// ── Init ──
async function initDB() {
  const data = load();
  
  if (!data.admin_users || data.admin_users.length === 0) {
    const hash = await bcrypt.hash('gogreen2025', 12);
    data.admin_users = [{ id: 1, username: '1stprincedk', password_hash: hash }];
    save(data);
    console.log('✅ Default admin created - Username: 1stprincedk');
  }
  
  console.log('✅ Database initialized - Full customization mode');
}

module.exports = { load, save, getDB, initDB };
