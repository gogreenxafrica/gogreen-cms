require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const { initDB } = require('./db/database');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Serve admin UI ──
app.use('/admin', express.static(path.join(__dirname, 'admin/public')));

// ── Serve landing page (if exists in /public) ──
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ──
app.use('/api/content',  require('./routes/content'));
app.use('/api/admin',    require('./routes/admin'));

// ── Health ──
app.get('/api', (req, res) => res.json({
  status: 'Gogreen CMS running',
  version: '2.0.0',
  mode: 'manual_rates',
  admin: '/admin'
}));

// ── Boot ──
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Gogreen CMS live on port ${PORT}`);
    console.log(`🔧 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`📝 MANUAL RATE MODE: Update rates through admin panel`);
    console.log(`💡 Auto-scraping disabled due to hosting network restrictions`);
  });
}).catch(err => {
  console.error('DB init failed:', err);
  process.exit(1);
});
