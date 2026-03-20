const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const auth    = require('../middleware/auth');
const { load, save } = require('../db/database');

const SECRET = () => process.env.JWT_SECRET || 'gg-secret-change-me';

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const data = load();
  const user = data.admin_users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: 'admin' }, SECRET(), { expiresIn: '8h' });
  res.json({ token, username: user.username });
});

// CHANGE PASSWORD
router.post('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const data = load();
  const user = data.admin_users.find(u => u.id === req.user.id);
  const valid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Current password incorrect' });
  user.password_hash = await bcrypt.hash(newPassword, 12);
  save(data);
  res.json({ success: true });
});

// SETTINGS
router.get('/settings', auth, (req, res) => {
  const data = load();
  // Group settings by their group property
  const grouped = {};
  Object.entries(data.settings).forEach(([k, v]) => {
    const group = v.group || 'other';
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push({ key: k, value: v.value, label: v.label });
  });
  res.json(grouped);
});

router.put('/settings', auth, (req, res) => {
  const { key, value } = req.body;
  const data = load();
  if (data.settings[key]) data.settings[key].value = String(value);
  else data.settings[key] = { value: String(value), label: key, group: 'custom' };
  save(data);
  res.json({ success: true });
});

router.post('/settings/batch', auth, (req, res) => {
  const { settings } = req.body;
  const data = load();
  Object.entries(settings).forEach(([k, v]) => {
    if (data.settings[k]) data.settings[k].value = String(v);
    else data.settings[k] = { value: String(v), label: k, group: 'custom' };
  });
  save(data);
  res.json({ success: true });
});

// REVIEWS
router.get('/reviews', auth, (req, res) => res.json(load().reviews));
router.post('/reviews', auth, (req, res) => {
  const data = load();
  const id = (data._nextId.reviews || data.reviews.length + 1);
  data._nextId.reviews = id + 1;
  const review = { id, ...req.body, active: req.body.active !== false };
  data.reviews.push(review);
  save(data);
  res.json({ success: true, id });
});
router.put('/reviews/:id', auth, (req, res) => {
  const data = load();
  const idx = data.reviews.findIndex(r => r.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.reviews[idx] = { ...data.reviews[idx], ...req.body, id: data.reviews[idx].id };
  save(data);
  res.json({ success: true });
});
router.delete('/reviews/:id', auth, (req, res) => {
  const data = load();
  data.reviews = data.reviews.filter(r => r.id != req.params.id);
  save(data);
  res.json({ success: true });
});

// FAQS
router.get('/faqs', auth, (req, res) => res.json(load().faqs));
router.post('/faqs', auth, (req, res) => {
  const data = load();
  const id = (data._nextId.faqs || data.faqs.length + 1);
  data._nextId.faqs = id + 1;
  data.faqs.push({ id, ...req.body, active: req.body.active !== false });
  save(data);
  res.json({ success: true, id });
});
router.put('/faqs/:id', auth, (req, res) => {
  const data = load();
  const idx = data.faqs.findIndex(f => f.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.faqs[idx] = { ...data.faqs[idx], ...req.body, id: data.faqs[idx].id };
  save(data);
  res.json({ success: true });
});
router.delete('/faqs/:id', auth, (req, res) => {
  const data = load();
  data.faqs = data.faqs.filter(f => f.id != req.params.id);
  save(data);
  res.json({ success: true });
});

// SERVICES
router.get('/services', auth, (req, res) => res.json(load().services));
router.post('/services', auth, (req, res) => {
  const data = load();
  const id = (data._nextId.services || data.services.length + 1);
  data._nextId.services = id + 1;
  data.services.push({ id, ...req.body, active: req.body.active !== false });
  save(data);
  res.json({ success: true, id });
});
router.put('/services/:id', auth, (req, res) => {
  const data = load();
  const idx = data.services.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.services[idx] = { ...data.services[idx], ...req.body, id: data.services[idx].id };
  save(data);
  res.json({ success: true });
});
router.delete('/services/:id', auth, (req, res) => {
  const data = load();
  data.services = data.services.filter(s => s.id != req.params.id);
  save(data);
  res.json({ success: true });
});

// AUTO RATE
router.get('/auto-rate', auth, (req, res) => {
  const s = load().settings;
  const g = k => s[k]?.value || '';
  res.json({
    enabled:     g('auto_enabled') === '1',
    marketRate:  g('auto_market_rate'),
    buySpread:   g('auto_buy_spread'),
    sellSpread:  g('auto_sell_spread'),
    lastFetched: g('auto_last_fetched'),
    status:      g('auto_scrape_status'),
    buyRate:     g('buy_rate'),
    sellRate:    g('sell_rate'),
  });
});
router.post('/auto-rate', auth, (req, res) => {
  const data = load();
  const { enabled, buySpread, sellSpread } = req.body;
  if (enabled !== undefined)    data.settings.auto_enabled.value    = enabled ? '1' : '0';
  if (buySpread !== undefined)  data.settings.auto_buy_spread.value  = String(buySpread);
  if (sellSpread !== undefined) data.settings.auto_sell_spread.value = String(sellSpread);
  save(data);
  res.json({ success: true });
});
router.post('/auto-rate/fetch-now', auth, async (req, res) => {
  try {
    const { scrapeAndUpdate } = require('../services/rateScraper');
    const result = await scrapeAndUpdate();
    if (result) res.json({ success: true, result });
    else res.json({ success: false, error: 'Could not parse rate' });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

module.exports = router;
