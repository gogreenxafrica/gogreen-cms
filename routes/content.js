const express = require('express');
const router  = express.Router();
const { load } = require('../db/database');

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

router.get('/rates', (req, res) => {
  try {
    const s = load().settings;
    res.json({ buy_rate: s.buy_rate?.value, sell_rate: s.sell_rate?.value, wa_number: s.wa_number?.value });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
