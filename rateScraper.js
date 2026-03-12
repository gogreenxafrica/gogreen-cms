const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const auth    = require('../middleware/auth');
const { run, get, all } = require('../db/database');

const SECRET = () => process.env.JWT_SECRET || 'gg-secret-change-me';

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const user = await get('SELECT * FROM admin_users WHERE username=?', [username]);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: 'admin' }, SECRET(), { expiresIn: '8h' });
  res.json({ token, username: user.username });
});

// CHANGE PASSWORD
router.post('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await get('SELECT * FROM admin_users WHERE id=?', [req.user.id]);
  const valid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Current password incorrect' });
  const hash = await bcrypt.hash(newPassword, 12);
  await run('UPDATE admin_users SET password_hash=? WHERE id=?', [hash, req.user.id]);
  res.json({ success: true });
});

// SETTINGS
router.get('/settings', auth, async (req, res) => {
  const rows = await all('SELECT * FROM settings ORDER BY group_name, key');
  const s = {};
  rows.forEach(r => s[r.key] = r.value);
  res.json(s);
});

router.put('/settings', auth, async (req, res) => {
  const { key, value } = req.body;
  await run('UPDATE settings SET value=?, updated_at=CURRENT_TIMESTAMP WHERE key=?', [value, key]);
  res.json({ success: true });
});

router.post('/settings/batch', auth, async (req, res) => {
  const { settings } = req.body;
  for (const [key, value] of Object.entries(settings)) {
    await run('UPDATE settings SET value=?, updated_at=CURRENT_TIMESTAMP WHERE key=?', [String(value), key]);
  }
  res.json({ success: true });
});

// REVIEWS
router.get('/reviews', auth, async (req, res) => {
  res.json(await all('SELECT * FROM reviews ORDER BY sort_order'));
});
router.post('/reviews', auth, async (req, res) => {
  const { name, handle, platform, quote, source_url, initials, active, sort_order } = req.body;
  const r = await run(
    'INSERT INTO reviews (name,handle,platform,quote,source_url,initials,active,sort_order) VALUES (?,?,?,?,?,?,?,?)',
    [name, handle||'', platform||'', quote, source_url||'', initials||name.substring(0,2).toUpperCase(), active!==false?1:0, sort_order||0]
  );
  res.json({ success: true, id: r.lastID });
});
router.put('/reviews/:id', auth, async (req, res) => {
  const { name, handle, platform, quote, source_url, initials, active, sort_order } = req.body;
  await run(
    'UPDATE reviews SET name=?,handle=?,platform=?,quote=?,source_url=?,initials=?,active=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [name, handle||'', platform||'', quote, source_url||'', initials||'', active?1:0, sort_order||0, req.params.id]
  );
  res.json({ success: true });
});
router.delete('/reviews/:id', auth, async (req, res) => {
  await run('DELETE FROM reviews WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// FAQS
router.get('/faqs', auth, async (req, res) => {
  res.json(await all('SELECT * FROM faqs ORDER BY sort_order'));
});
router.post('/faqs', auth, async (req, res) => {
  const { question, answer, active, sort_order } = req.body;
  const maxRow = await get('SELECT MAX(sort_order) as m FROM faqs');
  const r = await run(
    'INSERT INTO faqs (question,answer,active,sort_order) VALUES (?,?,?,?)',
    [question, answer, active!==false?1:0, sort_order||(maxRow?.m||0)+1]
  );
  res.json({ success: true, id: r.lastID });
});
router.put('/faqs/:id', auth, async (req, res) => {
  const { question, answer, active, sort_order } = req.body;
  await run(
    'UPDATE faqs SET question=?,answer=?,active=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [question, answer, active?1:0, sort_order||0, req.params.id]
  );
  res.json({ success: true });
});
router.delete('/faqs/:id', auth, async (req, res) => {
  await run('DELETE FROM faqs WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// SERVICES
router.get('/services', auth, async (req, res) => {
  res.json(await all('SELECT * FROM services ORDER BY sort_order'));
});
router.put('/services/:id', auth, async (req, res) => {
  const { name, description, icon, wa_message, active, sort_order } = req.body;
  await run(
    'UPDATE services SET name=?,description=?,icon=?,wa_message=?,active=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [name, description||'', icon||'', wa_message||name, active?1:0, sort_order||0, req.params.id]
  );
  res.json({ success: true });
});
router.post('/services', auth, async (req, res) => {
  const { name, description, icon, wa_message, sort_order } = req.body;
  const maxRow = await get('SELECT MAX(sort_order) as m FROM services');
  const r = await run(
    'INSERT INTO services (name,description,icon,wa_message,sort_order) VALUES (?,?,?,?,?)',
    [name, description||'', icon||'', wa_message||name, sort_order||(maxRow?.m||0)+1]
  );
  res.json({ success: true, id: r.lastID });
});
router.delete('/services/:id', auth, async (req, res) => {
  await run('DELETE FROM services WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// AUTO RATE
router.get('/auto-rate', auth, async (req, res) => {
  const keys = ['auto_enabled','auto_market_rate','auto_buy_spread','auto_sell_spread','auto_last_fetched','auto_scrape_status','buy_rate','sell_rate'];
  const rows = await all(`SELECT key,value FROM settings WHERE key IN (${keys.map(()=>'?').join(',')})`, keys);
  const s = {};
  rows.forEach(r => s[r.key] = r.value);
  res.json({
    enabled:     s.auto_enabled === '1',
    marketRate:  s.auto_market_rate,
    buySpread:   s.auto_buy_spread,
    sellSpread:  s.auto_sell_spread,
    lastFetched: s.auto_last_fetched,
    status:      s.auto_scrape_status,
    buyRate:     s.buy_rate,
    sellRate:    s.sell_rate,
  });
});

router.post('/auto-rate', auth, async (req, res) => {
  const { enabled, buySpread, sellSpread } = req.body;
  if (enabled !== undefined) await run("UPDATE settings SET value=? WHERE key='auto_enabled'", [enabled?'1':'0']);
  if (buySpread  !== undefined) await run("UPDATE settings SET value=? WHERE key='auto_buy_spread'",  [String(buySpread)]);
  if (sellSpread !== undefined) await run("UPDATE settings SET value=? WHERE key='auto_sell_spread'", [String(sellSpread)]);
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
