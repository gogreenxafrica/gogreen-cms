require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const { initDB } = require('./db/database');
const { startScraper } = require('./services/rateScraper');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Serve admin UI ──
app.use('/admin', express.static(path.join(__dirname, 'admin/public')));

// ── API Routes ──
app.use('/api/content',  require('./routes/content'));
app.use('/api/admin',    require('./routes/admin'));

// ── Health ──
app.get('/', (req, res) => res.json({
  status: 'Gogreen CMS running',
  version: '2.0.0',
  admin: '/admin'
}));

// ── Boot ──
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Gogreen CMS live on port ${PORT}`);
    console.log(`🔧 Admin panel: http://localhost:${PORT}/admin`);
    startScraper(); // start hourly rate scraper
  });
}).catch(err => {
  console.error('DB init failed:', err);
  process.exit(1);
});
