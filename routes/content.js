const express = require('express');
const router  = express.Router();
const { load } = require('../db/database');

// GET /api/content - Full content dump for landing page
router.get('/', (req, res) => {
  try {
    const data = load();
    const settings = {};
    Object.entries(data.settings).forEach(([k, v]) => settings[k] = v.value);
    res.json({
      settings,
      reviews:  data.reviews.filter(r => r.active).sort((a,b) => a.sort_order - b.sort_order),
      faqs:     data.faqs.filter(f => f.active).sort((a,b) => a.sort_order - b.sort_order),
      services: data.services.filter(s => s.active).sort((a,b) => a.sort_order - b.sort_order),
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/content/settings - Public settings only (for landing page)
router.get('/settings', (req, res) => {
  try {
    const data = load();
    const publicSettings = {
      buy_rate: data.settings.buy_rate?.value || '0',
      sell_rate: data.settings.sell_rate?.value || '0',
      wa_number: data.settings.wa_number?.value || '',
      hero_headline: data.settings.hero_headline?.value || '',
      hero_subheading: data.settings.hero_subheading?.value || '',
    };
    res.json(publicSettings);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/content/rates - Just rates (legacy endpoint)
router.get('/rates', (req, res) => {
  try {
    const s = load().settings;
    res.json({ buy_rate: s.buy_rate?.value, sell_rate: s.sell_rate?.value, wa_number: s.wa_number?.value });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
