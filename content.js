<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gogreen CMS — Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root {
  --g:#2DA437; --g2:#89CE33; --bg:#080c08; --bg2:#111611; --bg3:#181f18;
  --text:#eef2ee; --muted:rgba(238,242,238,.4); --muted2:rgba(238,242,238,.65);
  --border:rgba(255,255,255,.07); --border-g:rgba(45,164,55,.2);
  --r:12px; --spring:cubic-bezier(.34,1.56,.64,1); --ease:cubic-bezier(.16,1,.3,1);
  --sidebar:240px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;display:flex;overflow:hidden}

/* ── SIDEBAR ── */
.sidebar{width:var(--sidebar);height:100vh;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto}
.sidebar-logo{padding:20px 18px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
.logo-mark{width:32px;height:32px;background:linear-gradient(135deg,var(--g),var(--g2));border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:.7rem;color:#fff;flex-shrink:0}
.logo-text{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:.82rem;line-height:1.2}
.logo-sub{font-size:.55rem;font-weight:400;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}
.nav-group{padding:12px 10px 4px}
.nav-group-label{font-size:.52rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);padding:0 8px;margin-bottom:4px}
.nav-item{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px;cursor:pointer;font-family:'Bricolage Grotesque',sans-serif;font-size:.75rem;font-weight:600;color:var(--muted2);transition:all .2s;margin-bottom:2px;border:1px solid transparent}
.nav-item:hover{background:var(--bg3);color:var(--text)}
.nav-item.active{background:rgba(45,164,55,.1);color:var(--g2);border-color:rgba(45,164,55,.15)}
.nav-item svg{width:14px;height:14px;flex-shrink:0;opacity:.7}
.nav-item.active svg{opacity:1}
.sidebar-footer{margin-top:auto;padding:12px 10px;border-top:1px solid var(--border)}
.logout-btn{width:100%;display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;background:none;border:1px solid var(--border);cursor:pointer;color:var(--muted);font-family:'Bricolage Grotesque',sans-serif;font-size:.72rem;font-weight:600;transition:all .2s}
.logout-btn:hover{border-color:rgba(255,80,80,.3);color:#ff6b6b;background:rgba(255,80,80,.05)}

/* ── MAIN ── */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{padding:14px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--bg);flex-shrink:0}
.topbar-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1rem}
.topbar-right{display:flex;align-items:center;gap:10px}
.save-all-btn{background:linear-gradient(135deg,var(--g),var(--g2));border:none;border-radius:100px;padding:8px 18px;color:#fff;font-family:'Bricolage Grotesque',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .25s var(--spring);box-shadow:0 4px 16px rgba(45,164,55,.25)}
.save-all-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(45,164,55,.4)}
.save-all-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.admin-tag{font-family:'Bricolage Grotesque',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(45,164,55,.1);border:1px solid rgba(45,164,55,.2);border-radius:100px;padding:4px 10px;color:var(--g2)}

.content{flex:1;overflow-y:auto;padding:24px}

/* ── PANELS ── */
.panel{display:none}
.panel.active{display:block}

/* ── CARDS ── */
.card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:20px;margin-bottom:16px}
.card-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:.82rem;margin-bottom:4px;display:flex;align-items:center;gap:8px}
.card-sub{font-size:.7rem;color:var(--muted);margin-bottom:16px}
.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}

/* ── FORM FIELDS ── */
.field{display:flex;flex-direction:column;gap:5px}
.field label{font-family:'Bricolage Grotesque',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.field input,.field textarea,.field select{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;transition:border-color .2s,box-shadow .2s;resize:vertical}
.field input:focus,.field textarea:focus{border-color:rgba(45,164,55,.4);box-shadow:0 0 0 3px rgba(45,164,55,.08)}
.field textarea{min-height:80px;line-height:1.6}
.field-full{grid-column:1/-1}

/* ── RATE FIELDS (big) ── */
.rate-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:20px;display:flex;flex-direction:column;gap:8px;transition:border-color .3s}
.rate-card:hover{border-color:var(--border-g)}
.rate-label{font-family:'Bricolage Grotesque',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--muted)}
.rate-input{font-family:'Bricolage Grotesque',sans-serif;font-size:2rem;font-weight:800;background:none;border:none;color:var(--g2);outline:none;width:100%;letter-spacing:-.02em}
.rate-input.sell{color:#e74c3c}
.rate-sub{font-size:.65rem;color:var(--muted)}

/* ── TABLE ── */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{font-family:'Bricolage Grotesque',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding:8px 12px;text-align:left;border-bottom:1px solid var(--border)}
td{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.8rem;vertical-align:top}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(255,255,255,.02)}
.td-name{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.82rem}
.td-muted{color:var(--muted);font-size:.72rem}
.td-actions{display:flex;gap:6px;align-items:center}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;font-family:'Bricolage Grotesque',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;border:none;transition:all .2s}
.btn-edit{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--muted2)}
.btn-edit:hover{background:rgba(255,255,255,.1);color:var(--text)}
.btn-del{background:rgba(255,80,80,.06);border:1px solid rgba(255,80,80,.15);color:rgba(255,107,107,.7)}
.btn-del:hover{background:rgba(255,80,80,.12);color:#ff6b6b}
.btn-add{background:rgba(45,164,55,.1);border:1px solid rgba(45,164,55,.2);color:var(--g2)}
.btn-add:hover{background:rgba(45,164,55,.18);border-color:rgba(45,164,55,.35)}
.btn-primary{background:linear-gradient(135deg,var(--g),var(--g2));color:#fff;box-shadow:0 2px 10px rgba(45,164,55,.2)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(45,164,55,.35)}
.toggle{display:inline-flex;align-items:center;gap:6px;cursor:pointer;font-size:.72rem;color:var(--muted2)}
.toggle input{display:none}
.toggle-track{width:32px;height:18px;background:rgba(255,255,255,.1);border-radius:100px;position:relative;transition:background .2s;flex-shrink:0}
.toggle input:checked + .toggle-track{background:var(--g)}
.toggle-track::after{content:'';position:absolute;width:12px;height:12px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s var(--spring)}
.toggle input:checked + .toggle-track::after{transform:translateX(14px)}

/* ── MODAL ── */
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(6px);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px}
.modal-backdrop.open{display:flex}
.modal{background:var(--bg2);border:1px solid var(--border-g);border-radius:16px;padding:24px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 32px 64px rgba(0,0,0,.6)}
.modal-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:.95rem;margin-bottom:4px}
.modal-sub{font-size:.7rem;color:var(--muted);margin-bottom:20px}
.modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.modal-footer{display:flex;gap:8px;justify-content:flex-end;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)}

/* ── STATUS BADGE ── */
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:100px;font-family:'Bricolage Grotesque',sans-serif;font-size:.52rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.badge-on{background:rgba(45,164,55,.12);color:var(--g2);border:1px solid rgba(45,164,55,.2)}
.badge-off{background:rgba(255,255,255,.05);color:var(--muted);border:1px solid var(--border)}

/* ── TOAST ── */
.cms-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--bg2);border:1px solid rgba(45,164,55,.3);border-radius:100px;padding:10px 20px;font-family:'Bricolage Grotesque',sans-serif;font-size:.7rem;font-weight:700;color:var(--g2);box-shadow:0 8px 32px rgba(0,0,0,.4);opacity:0;pointer-events:none;transition:all .4s var(--spring);z-index:9999;white-space:nowrap}
.cms-toast.error{border-color:rgba(255,80,80,.3);color:#ff6b6b}
.cms-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* ── LOGIN SCREEN ── */
.login-screen{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:9999}
.login-card{background:var(--bg2);border:1px solid var(--border-g);border-radius:20px;padding:36px;width:360px;box-shadow:0 32px 64px rgba(0,0,0,.5)}
.login-logo{text-align:center;margin-bottom:24px}
.login-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1.1rem;text-align:center;margin-bottom:4px}
.login-sub{font-size:.72rem;color:var(--muted);text-align:center;margin-bottom:24px}
.login-err{background:rgba(255,80,80,.08);border:1px solid rgba(255,80,80,.2);border-radius:8px;padding:8px 12px;font-size:.72rem;color:#ff6b6b;margin-bottom:12px;display:none}
.login-btn{width:100%;padding:12px;background:linear-gradient(135deg,var(--g),var(--g2));border:none;border-radius:100px;color:#fff;font-family:'Bricolage Grotesque',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;margin-top:8px;transition:all .25s var(--spring)}
.login-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(45,164,55,.4)}

/* ── STATS ── */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.stat-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:16px}
.stat-val{font-family:'Bricolage Grotesque',sans-serif;font-size:1.5rem;font-weight:800;color:var(--g2);letter-spacing:-.02em}
.stat-lbl{font-size:.62rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;margin-top:2px}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}

@media(max-width:768px){
  .sidebar{position:fixed;left:-var(--sidebar);z-index:200;transition:left .3s}
  .sidebar.open{left:0}
  .stats-row{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>

<!-- LOGIN -->
<div class="login-screen" id="loginScreen">
  <div class="login-card">
    <div class="login-logo">
      <div style="width:48px;height:48px;background:linear-gradient(135deg,#2DA437,#89CE33);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;color:#fff;font-size:.9rem">GG</div>
    </div>
    <div class="login-title">Gogreen CMS</div>
    <div class="login-sub">Admin access only. Enter your credentials.</div>
    <div class="login-err" id="loginErr"></div>
    <div class="field" style="margin-bottom:10px">
      <label>Username</label>
      <input type="text" id="loginUser" placeholder="admin" value="admin" />
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" id="loginPass" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()" />
    </div>
    <button class="login-btn" onclick="doLogin()" id="loginBtn">Sign In</button>
  </div>
</div>

<!-- SIDEBAR -->
<div class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-mark">GG</div>
    <div class="logo-text">Gogreen<div class="logo-sub">CMS Dashboard</div></div>
  </div>

  <div class="nav-group">
    <div class="nav-group-label">Overview</div>
    <div class="nav-item active" onclick="showPanel('dashboard')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      Dashboard
    </div>
  </div>

  <div class="nav-group">
    <div class="nav-group-label">Rates & Contact</div>
    <div class="nav-item" onclick="showPanel('autoRate')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      Auto Rate
      <span id="autoRateDot" style="margin-left:auto;width:7px;height:7px;border-radius:50%;background:#555;flex-shrink:0"></span>
    </div>
    <div class="nav-item" onclick="showPanel('rates')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      Rates
    </div>
    <div class="nav-item" onclick="showPanel('contact')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
      Contact & Social
    </div>
  </div>

  <div class="nav-group">
    <div class="nav-group-label">Page Content</div>
    <div class="nav-item" onclick="showPanel('hero')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
      Hero Section
    </div>
    <div class="nav-item" onclick="showPanel('features')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      Feature Cards
    </div>
    <div class="nav-item" onclick="showPanel('how')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      How It Works
    </div>
    <div class="nav-item" onclick="showPanel('services')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7c0-2.2-1.8-4-4-4S8 4.8 8 7"/></svg>
      Services
    </div>
    <div class="nav-item" onclick="showPanel('reviews')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Reviews
    </div>
    <div class="nav-item" onclick="showPanel('faqs')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      FAQs
    </div>
    <div class="nav-item" onclick="showPanel('cta')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      CTA & Footer
    </div>
  </div>

  <div class="nav-group">
    <div class="nav-group-label">Account</div>
    <div class="nav-item" onclick="showPanel('security')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
      Security
    </div>
  </div>

  <div class="sidebar-footer">
    <button class="logout-btn" onclick="doLogout()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Sign Out
    </button>
  </div>
</div>

<!-- MAIN -->
<div class="main">
  <div class="topbar">
    <span class="topbar-title" id="topbarTitle">Dashboard</span>
    <div class="topbar-right">
      <span class="admin-tag" id="adminTag">admin</span>
      <button class="save-all-btn" id="saveAllBtn" onclick="saveCurrentPanel()" style="display:none">Save Changes</button>
    </div>
  </div>

  <div class="content" id="mainContent">

    <!-- AUTO RATE -->
    <div class="panel" id="panel-autoRate">
      <div class="card">
        <div class="card-title">🤖 Automatic Rate Fetching
          <span id="arStatusBadge" class="badge badge-off" style="margin-left:8px">Loading...</span>
        </div>
        <div class="card-sub">Fetches the black market USD/NGN rate from ngnrates.com every hour and applies your spread automatically.</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
          <div class="stat-card">
            <div class="stat-val" id="ar-market" style="font-size:1.2rem">—</div>
            <div class="stat-lbl">Market Rate (ngnrates)</div>
          </div>
          <div class="stat-card">
            <div class="stat-val" id="ar-last" style="font-size:.75rem;color:var(--muted2)">—</div>
            <div class="stat-lbl">Last Fetched</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:14px;background:rgba(45,164,55,.05);border:1px solid rgba(45,164,55,.12);border-radius:10px">
          <label class="toggle" style="font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.78rem;color:var(--text)">
            <input type="checkbox" id="ar-enabled" onchange="saveAutoRateToggle()" />
            <div class="toggle-track"></div>
            Enable Auto Rate
          </label>
          <span style="font-size:.68rem;color:var(--muted);margin-left:4px">Rates update every hour automatically</span>
          <button class="btn btn-add" style="margin-left:auto" onclick="fetchNow()">↻ Fetch Now</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">⚖️ Spread Settings</div>
        <div class="card-sub">Your rate = market rate ± spread. Current market rate shown above.</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
          <div class="rate-card">
            <div class="rate-label">Buy Spread (₦) — negative to go below market</div>
            <input class="rate-input" id="ar-buySpread" type="number" placeholder="-30" />
            <div class="rate-sub" id="ar-buyPreview">We Buy = market − 30</div>
          </div>
          <div class="rate-card">
            <div class="rate-label">Sell Spread (₦) — positive to go above market</div>
            <input class="rate-input sell" id="ar-sellSpread" type="number" placeholder="60" />
            <div class="rate-sub" id="ar-sellPreview">We Sell = market + 60</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button class="btn btn-primary" onclick="saveAutoRateSettings()">Save Spread Settings</button>
          <span style="font-size:.68rem;color:var(--muted)">Saving will immediately recalculate and update your live rates.</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">📊 Result Preview</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="rate-card">
            <div class="rate-label">We Buy (current)</div>
            <div class="rate-input" id="ar-buyResult" style="font-size:1.8rem;padding:0">—</div>
          </div>
          <div class="rate-card">
            <div class="rate-label">We Sell (current)</div>
            <div class="rate-input sell" id="ar-sellResult" style="font-size:1.8rem;padding:0">—</div>
          </div>
        </div>
        <div style="margin-top:12px;font-size:.68rem;color:var(--muted);padding:10px 12px;background:rgba(255,200,0,.04);border:1px solid rgba(255,200,0,.1);border-radius:8px">
          ⚠️ When Auto Rate is ON, manual rate edits in the Rates panel will be overwritten on next fetch. Turn Auto Rate OFF to set rates manually.
        </div>
      </div>
    </div>

    <!-- DASHBOARD -->
    <div class="panel active" id="panel-dashboard">
      <div class="stats-row" id="dashStats">
        <div class="stat-card"><div class="stat-val" id="ds-buy">—</div><div class="stat-lbl">Buy Rate ₦/$</div></div>
        <div class="stat-card"><div class="stat-val" style="color:#e74c3c" id="ds-sell">—</div><div class="stat-lbl">Sell Rate ₦/$</div></div>
        <div class="stat-card"><div class="stat-val" id="ds-reviews">—</div><div class="stat-lbl">Reviews</div></div>
        <div class="stat-card"><div class="stat-val" id="ds-faqs">—</div><div class="stat-lbl">FAQs</div></div>
      </div>
      <div class="card">
        <div class="card-title">👋 Welcome to Gogreen CMS</div>
        <div class="card-sub">Everything on your landing page is controlled from here. Use the sidebar to navigate sections.</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-top:4px">
          <div onclick="showPanel('rates')" style="background:rgba(45,164,55,.06);border:1px solid rgba(45,164,55,.15);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='rgba(45,164,55,.12)'" onmouseout="this.style.background='rgba(45,164,55,.06)'">
            <div style="font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.78rem;margin-bottom:3px;color:#89CE33">Update Rates</div>
            <div style="font-size:.68rem;color:var(--muted)">Change buy/sell rates instantly</div>
          </div>
          <div onclick="showPanel('reviews')" style="background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='rgba(255,255,255,.03)'">
            <div style="font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.78rem;margin-bottom:3px">Add Reviews</div>
            <div style="font-size:.68rem;color:var(--muted)">Add new customer testimonials</div>
          </div>
          <div onclick="showPanel('faqs')" style="background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='rgba(255,255,255,.03)'">
            <div style="font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.78rem;margin-bottom:3px">Manage FAQs</div>
            <div style="font-size:.68rem;color:var(--muted)">Add, edit or remove FAQs</div>
          </div>
          <div onclick="showPanel('contact')" style="background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='rgba(255,255,255,.03)'">
            <div style="font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.78rem;margin-bottom:3px">Update Handles</div>
            <div style="font-size:.68rem;color:var(--muted)">Social & WhatsApp links</div>
          </div>
        </div>
      </div>
    </div>

    <!-- RATES -->
    <div class="panel" id="panel-rates">
      <div class="card">
        <div class="card-title">💱 Exchange Rates</div>
        <div class="card-sub">These update across the landing page and rate calculator immediately on save.</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <div class="rate-card">
            <div class="rate-label">We Buy (₦ per $)</div>
            <input class="rate-input" id="f-buy_rate" type="number" placeholder="1388" />
            <div class="rate-sub">Customers sell to you at this rate</div>
          </div>
          <div class="rate-card">
            <div class="rate-label">We Sell (₦ per $)</div>
            <input class="rate-input sell" id="f-sell_rate" type="number" placeholder="1489" />
            <div class="rate-sub">Customers buy from you at this rate</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTACT & SOCIAL -->
    <div class="panel" id="panel-contact">
      <div class="card">
        <div class="card-title">📱 WhatsApp</div>
        <div class="card-grid">
          <div class="field field-full"><label>WhatsApp Number (with country code, no + or spaces)</label><input type="text" id="f-wa_number" placeholder="2347010975329" /></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🌐 Social Media Handles</div>
        <div class="card-sub">Enter handles without the @ symbol</div>
        <div class="card-grid">
          <div class="field"><label>Instagram (Main)</label><input type="text" id="f-ig_handle" placeholder="gogreenxafrica" /></div>
          <div class="field"><label>Instagram (Backup)</label><input type="text" id="f-ig_backup" placeholder="gogreenexchange" /></div>
          <div class="field"><label>TikTok</label><input type="text" id="f-tiktok" placeholder="gogreenxafrica" /></div>
          <div class="field"><label>Twitter / X</label><input type="text" id="f-twitter" placeholder="gogreenxafrica" /></div>
          <div class="field"><label>LinkedIn</label><input type="text" id="f-linkedin" placeholder="gogreenxafrica" /></div>
        </div>
      </div>
    </div>

    <!-- HERO -->
    <div class="panel" id="panel-hero">
      <div class="card">
        <div class="card-title">🦸 Hero Section</div>
        <div class="card-grid">
          <div class="field"><label>Badge Text</label><input type="text" id="f-hero_badge" /></div>
          <div class="field"><label>Main Headline</label><input type="text" id="f-hero_headline" /></div>
          <div class="field"><label>Subheading</label><input type="text" id="f-hero_subheading" /></div>
          <div class="field field-full"><label>Body Text</label><textarea id="f-hero_sub"></textarea></div>
          <div class="field field-full"><label>Bento Quote</label><textarea id="f-bento_quote" style="min-height:55px"></textarea></div>
        </div>
      </div>
    </div>

    <!-- FEATURES -->
    <div class="panel" id="panel-features">
      <div class="card">
        <div class="card-title">⭐ Feature Card 1 — Dark</div>
        <div class="card-grid">
          <div class="field"><label>Tag</label><input type="text" id="f-feat1_tag" /></div>
          <div class="field"><label>Title</label><input type="text" id="f-feat1_title" /></div>
          <div class="field field-full"><label>Body</label><textarea id="f-feat1_body"></textarea></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">⭐ Feature Card 2 — Cream</div>
        <div class="card-grid">
          <div class="field"><label>Tag</label><input type="text" id="f-feat2_tag" /></div>
          <div class="field"><label>Title</label><input type="text" id="f-feat2_title" /></div>
          <div class="field field-full"><label>Body</label><textarea id="f-feat2_body"></textarea></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">⭐ Feature Card 3 — Lime</div>
        <div class="card-grid">
          <div class="field"><label>Tag</label><input type="text" id="f-feat3_tag" /></div>
          <div class="field"><label>Title</label><input type="text" id="f-feat3_title" /></div>
          <div class="field field-full"><label>Body</label><textarea id="f-feat3_body"></textarea></div>
        </div>
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <div class="panel" id="panel-how">
      <div class="card">
        <div class="card-title">📋 How It Works Steps</div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div><div style="font-family:'Bricolage Grotesque',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--g2);margin-bottom:8px">Step 01</div>
            <div class="card-grid"><div class="field"><label>Title</label><input type="text" id="f-how_step1_title" /></div><div class="field field-full"><label>Body</label><textarea id="f-how_step1_body" style="min-height:60px"></textarea></div></div>
          </div>
          <div style="border-top:1px solid var(--border);padding-top:14px"><div style="font-family:'Bricolage Grotesque',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--g2);margin-bottom:8px">Step 02</div>
            <div class="card-grid"><div class="field"><label>Title</label><input type="text" id="f-how_step2_title" /></div><div class="field field-full"><label>Body</label><textarea id="f-how_step2_body" style="min-height:60px"></textarea></div></div>
          </div>
          <div style="border-top:1px solid var(--border);padding-top:14px"><div style="font-family:'Bricolage Grotesque',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--g2);margin-bottom:8px">Step 03</div>
            <div class="card-grid"><div class="field"><label>Title</label><input type="text" id="f-how_step3_title" /></div><div class="field field-full"><label>Body</label><textarea id="f-how_step3_body" style="min-height:60px"></textarea></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- SERVICES -->
    <div class="panel" id="panel-services">
      <div class="card">
        <div class="card-title">🛍️ Services <button class="btn btn-add" style="margin-left:auto" onclick="openServiceModal()">+ Add Service</button></div>
        <div class="card-sub">These appear in the services grid on the homepage.</div>
        <div class="table-wrap">
          <table id="servicesTable">
            <thead><tr><th>Name</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody id="servicesTbody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- REVIEWS -->
    <div class="panel" id="panel-reviews">
      <div class="card">
        <div class="card-title">💬 Customer Reviews <button class="btn btn-add" style="margin-left:auto" onclick="openReviewModal()">+ Add Review</button></div>
        <div class="card-sub">All reviews shown on the homepage. Click a row to edit.</div>
        <div class="table-wrap">
          <table><thead><tr><th>Name</th><th>Platform</th><th>Quote</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="reviewsTbody"></tbody></table>
        </div>
      </div>
    </div>

    <!-- FAQS -->
    <div class="panel" id="panel-faqs">
      <div class="card">
        <div class="card-title">❓ FAQs <button class="btn btn-add" style="margin-left:auto" onclick="openFaqModal()">+ Add FAQ</button></div>
        <div class="table-wrap">
          <table><thead><tr><th>#</th><th>Question</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="faqsTbody"></tbody></table>
        </div>
      </div>
    </div>

    <!-- CTA & FOOTER -->
    <div class="panel" id="panel-cta">
      <div class="card">
        <div class="card-title">📣 CTA Section</div>
        <div class="card-grid">
          <div class="field"><label>CTA Heading</label><input type="text" id="f-cta_heading" /></div>
          <div class="field field-full"><label>CTA Body</label><textarea id="f-cta_body" style="min-height:55px"></textarea></div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">🔻 Footer</div>
        <div class="card-grid">
          <div class="field field-full"><label>Copyright Text</label><input type="text" id="f-footer_copy" /></div>
        </div>
      </div>
    </div>

    <!-- SECURITY -->
    <div class="panel" id="panel-security">
      <div class="card">
        <div class="card-title">🔒 Change Password</div>
        <div class="card-sub">Password must be at least 8 characters.</div>
        <div style="max-width:360px;display:flex;flex-direction:column;gap:10px">
          <div class="field"><label>Current Password</label><input type="password" id="sec-current" placeholder="••••••••" /></div>
          <div class="field"><label>New Password</label><input type="password" id="sec-new" placeholder="••••••••" /></div>
          <div class="field"><label>Confirm New Password</label><input type="password" id="sec-confirm" placeholder="••••••••" /></div>
          <button class="btn btn-primary" style="align-self:flex-start;margin-top:4px" onclick="changePassword()">Update Password</button>
        </div>
      </div>
    </div>

  </div><!-- end content -->
</div><!-- end main -->

<!-- MODALS -->
<div class="modal-backdrop" id="reviewModal">
  <div class="modal">
    <div class="modal-title" id="reviewModalTitle">Add Review</div>
    <div class="modal-sub">Add a real customer testimonial</div>
    <input type="hidden" id="rm-id" />
    <div class="modal-grid">
      <div class="field"><label>Name</label><input type="text" id="rm-name" /></div>
      <div class="field"><label>Handle / @</label><input type="text" id="rm-handle" /></div>
      <div class="field"><label>Platform</label><input type="text" id="rm-platform" placeholder="Instagram, TikTok..." /></div>
      <div class="field"><label>Initials (for avatar)</label><input type="text" id="rm-initials" maxlength="2" placeholder="OP" /></div>
      <div class="field field-full"><label>Quote</label><textarea id="rm-quote" placeholder="What the customer said..."></textarea></div>
      <div class="field field-full"><label>Source URL</label><input type="text" id="rm-url" placeholder="https://instagram.com/..." /></div>
      <div class="field"><label style="margin-bottom:8px">Show on site</label><label class="toggle"><input type="checkbox" id="rm-active" checked /><div class="toggle-track"></div>Active</label></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-edit" onclick="closeModal('reviewModal')">Cancel</button>
      <button class="btn btn-primary" onclick="saveReview()">Save Review</button>
    </div>
  </div>
</div>

<div class="modal-backdrop" id="faqModal">
  <div class="modal">
    <div class="modal-title" id="faqModalTitle">Add FAQ</div>
    <div class="modal-sub">Add a frequently asked question</div>
    <input type="hidden" id="fm-id" />
    <div style="display:flex;flex-direction:column;gap:10px">
      <div class="field"><label>Question</label><input type="text" id="fm-q" /></div>
      <div class="field"><label>Answer</label><textarea id="fm-a" style="min-height:100px"></textarea></div>
      <label class="toggle"><input type="checkbox" id="fm-active" checked /><div class="toggle-track"></div>Show on site</label>
    </div>
    <div class="modal-footer">
      <button class="btn btn-edit" onclick="closeModal('faqModal')">Cancel</button>
      <button class="btn btn-primary" onclick="saveFaq()">Save FAQ</button>
    </div>
  </div>
</div>

<div class="modal-backdrop" id="serviceModal">
  <div class="modal">
    <div class="modal-title">Edit Service</div>
    <input type="hidden" id="sm-id" />
    <div class="modal-grid">
      <div class="field"><label>Name</label><input type="text" id="sm-name" /></div>
      <div class="field"><label>WhatsApp Message</label><input type="text" id="sm-wa" /></div>
      <div class="field field-full"><label>Description</label><textarea id="sm-desc" style="min-height:70px"></textarea></div>
      <div class="field"><label style="margin-bottom:8px">Show on site</label><label class="toggle"><input type="checkbox" id="sm-active" checked /><div class="toggle-track"></div>Active</label></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-edit" onclick="closeModal('serviceModal')">Cancel</button>
      <button class="btn btn-primary" onclick="saveService()">Save Service</button>
    </div>
  </div>
</div>

<!-- TOAST -->
<div class="cms-toast" id="cmsToast"></div>

<script>
// ── CONFIG ──
var API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  : window.location.origin;

var TOKEN = null;
var currentPanel = 'dashboard';
var settingsCache = {};

// ── AUTH ──
async function doLogin() {
  var user = document.getElementById('loginUser').value;
  var pass = document.getElementById('loginPass').value;
  var btn  = document.getElementById('loginBtn');
  var err  = document.getElementById('loginErr');
  if (!user || !pass) { showLoginErr('Enter username and password'); return; }
  btn.textContent = 'Signing in...'; btn.disabled = true;
  try {
    var r = await fetch(API + '/api/admin/login', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username: user, password: pass })
    });
    var d = await r.json();
    if (d.token) {
      TOKEN = d.token;
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminTag').textContent = d.username;
      loadDashboard();
    } else {
      showLoginErr(d.error || 'Invalid credentials');
    }
  } catch(e) { showLoginErr('Cannot reach server'); }
  btn.textContent = 'Sign In'; btn.disabled = false;
}

function showLoginErr(msg) {
  var el = document.getElementById('loginErr');
  el.textContent = msg; el.style.display = 'block';
}

function doLogout() {
  TOKEN = null;
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginPass').value = '';
}

// ── API HELPERS ──
async function apiGet(path) {
  var r = await fetch(API + path, { headers: { 'x-admin-token': TOKEN } });
  return r.json();
}
async function apiPost(path, body) {
  var r = await fetch(API + path, { method:'POST', headers:{'Content-Type':'application/json','x-admin-token':TOKEN}, body: JSON.stringify(body) });
  return r.json();
}
async function apiPut(path, body) {
  var r = await fetch(API + path, { method:'PUT', headers:{'Content-Type':'application/json','x-admin-token':TOKEN}, body: JSON.stringify(body) });
  return r.json();
}
async function apiDel(path) {
  var r = await fetch(API + path, { method:'DELETE', headers:{'x-admin-token':TOKEN} });
  return r.json();
}

// ── TOAST ──
var toastTimer;
function toast(msg, isErr) {
  var el = document.getElementById('cmsToast');
  el.textContent = msg;
  el.className = 'cms-toast' + (isErr?' error':'') + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 3000);
}

// ── NAVIGATION ──
function showPanel(name) {
  document.querySelectorAll('.panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
  document.getElementById('panel-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(function(n){
    if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'"+name+"'")) n.classList.add('active');
  });
  currentPanel = name;
  var titles = {dashboard:'Dashboard',autoRate:'Auto Rate',rates:'Exchange Rates',contact:'Contact & Social',hero:'Hero Section',features:'Feature Cards',how:'How It Works',services:'Services',reviews:'Reviews',faqs:'FAQs',cta:'CTA & Footer',security:'Security'};
  document.getElementById('topbarTitle').textContent = titles[name] || name;
  var hasSave = ['rates','contact','hero','features','how','cta'].includes(name);
  document.getElementById('saveAllBtn').style.display = hasSave ? 'inline-flex' : 'none';
  if (name === 'reviews')  loadReviews();
  if (name === 'autoRate')  loadAutoRate();
  if (name === 'faqs')     loadFaqs();
  if (name === 'services') loadServices();
  if (name !== 'dashboard' && name !== 'reviews' && name !== 'faqs' && name !== 'services' && name !== 'security') loadSettingsIntoPanel(name);
}

// ── SETTINGS ──
async function loadAllSettings() {
  var grouped = await apiGet('/api/admin/settings');
  // Flatten into cache
  Object.values(grouped).forEach(function(arr){
    arr.forEach(function(s){ settingsCache[s.key] = s.value; });
  });
  return settingsCache;
}

function loadSettingsIntoPanel(panel) {
  var panelKeys = {
    rates:    ['buy_rate','sell_rate'],
    contact:  ['wa_number','ig_handle','ig_backup','tiktok','twitter','linkedin'],
    hero:     ['hero_badge','hero_headline','hero_subheading','hero_sub','bento_quote'],
    features: ['feat1_tag','feat1_title','feat1_body','feat2_tag','feat2_title','feat2_body','feat3_tag','feat3_title','feat3_body'],
    how:      ['how_step1_title','how_step1_body','how_step2_title','how_step2_body','how_step3_title','how_step3_body'],
    cta:      ['cta_heading','cta_body','footer_copy'],
  };
  var keys = panelKeys[panel] || [];
  keys.forEach(function(k){
    var el = document.getElementById('f-'+k);
    if (el && settingsCache[k] !== undefined) el.value = settingsCache[k];
  });
}

async function saveCurrentPanel() {
  var panelKeys = {
    rates:    ['buy_rate','sell_rate'],
    contact:  ['wa_number','ig_handle','ig_backup','tiktok','twitter','linkedin'],
    hero:     ['hero_badge','hero_headline','hero_subheading','hero_sub','bento_quote'],
    features: ['feat1_tag','feat1_title','feat1_body','feat2_tag','feat2_title','feat2_body','feat3_tag','feat3_title','feat3_body'],
    how:      ['how_step1_title','how_step1_body','how_step2_title','how_step2_body','how_step3_title','how_step3_body'],
    cta:      ['cta_heading','cta_body','footer_copy'],
  };
  var keys = panelKeys[currentPanel] || [];
  var updates = {};
  keys.forEach(function(k){
    var el = document.getElementById('f-'+k);
    if (el) { updates[k] = el.value; settingsCache[k] = el.value; }
  });
  var btn = document.getElementById('saveAllBtn');
  btn.textContent = 'Saving...'; btn.disabled = true;
  var r = await apiPost('/api/admin/settings/batch', { updates });
  btn.textContent = 'Save Changes'; btn.disabled = false;
  if (r.success) toast('✦ Saved successfully');
  else toast('Failed to save', true);
}

// ── DASHBOARD ──
async function loadDashboard() {
  await loadAllSettings();
  loadSettingsIntoPanel(currentPanel);
  document.getElementById('ds-buy').textContent  = settingsCache['buy_rate']  || '—';
  document.getElementById('ds-sell').textContent = settingsCache['sell_rate'] || '—';
  var reviews  = await apiGet('/api/admin/reviews');
  var faqs     = await apiGet('/api/admin/faqs');
  document.getElementById('ds-reviews').textContent = Array.isArray(reviews) ? reviews.filter(function(r){return r.active}).length : '—';
  document.getElementById('ds-faqs').textContent    = Array.isArray(faqs)    ? faqs.filter(function(f){return f.active}).length    : '—';
}

// ── REVIEWS ──
async function loadReviews() {
  var reviews = await apiGet('/api/admin/reviews');
  var tbody = document.getElementById('reviewsTbody');
  tbody.innerHTML = reviews.map(function(r){
    return '<tr><td><div class="td-name">'+esc(r.name)+'</div><div class="td-muted">'+esc(r.handle||'')+'</div></td>'
      + '<td><div class="td-muted">'+esc(r.platform||'')+'</div></td>'
      + '<td style="max-width:240px;font-size:.75rem;color:var(--muted2)">'+esc(r.quote.slice(0,80))+(r.quote.length>80?'…':'')+'</td>'
      + '<td><span class="badge '+(r.active?'badge-on':'badge-off')+'">'+(r.active?'Live':'Hidden')+'</span></td>'
      + '<td><div class="td-actions"><button class="btn btn-edit" onclick="editReview('+r.id+')">Edit</button>'
      + '<button class="btn btn-del" onclick="delReview('+r.id+')">Del</button></div></td></tr>';
  }).join('');
}

function openReviewModal(r) {
  document.getElementById('reviewModalTitle').textContent = r ? 'Edit Review' : 'Add Review';
  document.getElementById('rm-id').value       = r ? r.id : '';
  document.getElementById('rm-name').value     = r ? r.name : '';
  document.getElementById('rm-handle').value   = r ? r.handle : '';
  document.getElementById('rm-platform').value = r ? r.platform : '';
  document.getElementById('rm-initials').value = r ? r.initials : '';
  document.getElementById('rm-quote').value    = r ? r.quote : '';
  document.getElementById('rm-url').value      = r ? r.source_url : '';
  document.getElementById('rm-active').checked = r ? !!r.active : true;
  document.getElementById('reviewModal').classList.add('open');
}

async function editReview(id) {
  var reviews = await apiGet('/api/admin/reviews');
  var r = reviews.find(function(x){return x.id===id});
  if (r) openReviewModal(r);
}

async function saveReview() {
  var id   = document.getElementById('rm-id').value;
  var body = {
    name:       document.getElementById('rm-name').value,
    handle:     document.getElementById('rm-handle').value,
    platform:   document.getElementById('rm-platform').value,
    initials:   document.getElementById('rm-initials').value,
    quote:      document.getElementById('rm-quote').value,
    source_url: document.getElementById('rm-url').value,
    active:     document.getElementById('rm-active').checked,
    sort_order: 99,
  };
  var r = id ? await apiPut('/api/admin/reviews/'+id, body) : await apiPost('/api/admin/reviews', body);
  if (r.success || r.id) { toast('Review saved'); closeModal('reviewModal'); loadReviews(); }
  else toast('Error saving review', true);
}

async function delReview(id) {
  if (!confirm('Delete this review?')) return;
  await apiDel('/api/admin/reviews/'+id);
  toast('Review deleted'); loadReviews();
}

// ── FAQS ──
async function loadFaqs() {
  var faqs = await apiGet('/api/admin/faqs');
  var tbody = document.getElementById('faqsTbody');
  tbody.innerHTML = faqs.map(function(f){
    return '<tr><td style="color:var(--muted);font-family:\'Bricolage Grotesque\',sans-serif;font-weight:700">'+f.sort_order+'</td>'
      + '<td class="td-name" style="max-width:280px">'+esc(f.question)+'</td>'
      + '<td><span class="badge '+(f.active?'badge-on':'badge-off')+'">'+(f.active?'Live':'Hidden')+'</span></td>'
      + '<td><div class="td-actions"><button class="btn btn-edit" onclick="editFaq('+f.id+')">Edit</button>'
      + '<button class="btn btn-del" onclick="delFaq('+f.id+')">Del</button></div></td></tr>';
  }).join('');
}

function openFaqModal(f) {
  document.getElementById('faqModalTitle').textContent = f ? 'Edit FAQ' : 'Add FAQ';
  document.getElementById('fm-id').value     = f ? f.id : '';
  document.getElementById('fm-q').value      = f ? f.question : '';
  document.getElementById('fm-a').value      = f ? f.answer : '';
  document.getElementById('fm-active').checked = f ? !!f.active : true;
  document.getElementById('faqModal').classList.add('open');
}

async function editFaq(id) {
  var faqs = await apiGet('/api/admin/faqs');
  var f = faqs.find(function(x){return x.id===id});
  if (f) openFaqModal(f);
}

async function saveFaq() {
  var id   = document.getElementById('fm-id').value;
  var body = { question: document.getElementById('fm-q').value, answer: document.getElementById('fm-a').value, active: document.getElementById('fm-active').checked, sort_order: 99 };
  var r = id ? await apiPut('/api/admin/faqs/'+id, body) : await apiPost('/api/admin/faqs', body);
  if (r.success || r.id) { toast('FAQ saved'); closeModal('faqModal'); loadFaqs(); }
  else toast('Error saving FAQ', true);
}

async function delFaq(id) {
  if (!confirm('Delete this FAQ?')) return;
  await apiDel('/api/admin/faqs/'+id);
  toast('FAQ deleted'); loadFaqs();
}

// ── SERVICES ──
async function loadServices() {
  var svcs = await apiGet('/api/admin/services');
  document.getElementById('servicesTbody').innerHTML = svcs.map(function(s){
    return '<tr><td class="td-name">'+esc(s.name)+'</td>'
      + '<td style="max-width:200px;font-size:.75rem;color:var(--muted2)">'+esc(s.description.slice(0,60))+'…</td>'
      + '<td><span class="badge '+(s.active?'badge-on':'badge-off')+'">'+(s.active?'Live':'Hidden')+'</span></td>'
      + '<td><div class="td-actions"><button class="btn btn-edit" onclick="editService('+s.id+')">Edit</button></div></td></tr>';
  }).join('');
}

function openServiceModal(s) {
  document.getElementById('sm-id').value     = s ? s.id : '';
  document.getElementById('sm-name').value   = s ? s.name : '';
  document.getElementById('sm-desc').value   = s ? s.description : '';
  document.getElementById('sm-wa').value     = s ? s.wa_message : '';
  document.getElementById('sm-active').checked = s ? !!s.active : true;
  document.getElementById('serviceModal').classList.add('open');
}

async function editService(id) {
  var svcs = await apiGet('/api/admin/services');
  var s = svcs.find(function(x){return x.id===id});
  if (s) openServiceModal(s);
}

async function saveService() {
  var id   = document.getElementById('sm-id').value;
  var body = { name: document.getElementById('sm-name').value, description: document.getElementById('sm-desc').value, wa_message: document.getElementById('sm-wa').value, active: document.getElementById('sm-active').checked, sort_order: 99 };
  var r = id ? await apiPut('/api/admin/services/'+id, body) : await apiPost('/api/admin/services', body);
  if (r.success || r.id) { toast('Service saved'); closeModal('serviceModal'); loadServices(); }
  else toast('Error', true);
}

// ── SECURITY ──
async function changePassword() {
  var cur = document.getElementById('sec-current').value;
  var nw  = document.getElementById('sec-new').value;
  var cf  = document.getElementById('sec-confirm').value;
  if (!cur || !nw || !cf) { toast('Fill all fields', true); return; }
  if (nw !== cf) { toast('New passwords do not match', true); return; }
  if (nw.length < 8) { toast('Password must be 8+ characters', true); return; }
  var r = await apiPost('/api/admin/change-password', { currentPassword: cur, newPassword: nw });
  if (r.success) {
    toast('Password updated');
    document.getElementById('sec-current').value = '';
    document.getElementById('sec-new').value     = '';
    document.getElementById('sec-confirm').value = '';
  } else toast(r.error || 'Failed', true);
}

// ── MODAL HELPERS ──
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-backdrop').forEach(function(m){
  m.addEventListener('click', function(e){ if (e.target === m) m.classList.remove('open'); });
});

// ── AUTO RATE ──
async function loadAutoRate() {
  var d = await apiGet('/api/admin/auto-rate');
  if (!d) return;

  // Status badge
  var badge = document.getElementById('arStatusBadge');
  var dot   = document.getElementById('autoRateDot');
  if (d.enabled) {
    badge.className = 'badge badge-on'; badge.textContent = 'Active';
    dot.style.background = '#2DA437';
  } else {
    badge.className = 'badge badge-off'; badge.textContent = 'Off';
    dot.style.background = '#555';
  }

  document.getElementById('ar-enabled').checked  = d.enabled;
  document.getElementById('ar-market').textContent = d.marketRate ? '₦' + parseInt(d.marketRate).toLocaleString() : '—';
  document.getElementById('ar-buySpread').value  = d.buySpread  || '-30';
  document.getElementById('ar-sellSpread').value = d.sellSpread || '60';
  document.getElementById('ar-buyResult').textContent  = d.buyRate  ? '₦' + parseInt(d.buyRate).toLocaleString()  : '—';
  document.getElementById('ar-sellResult').textContent = d.sellRate ? '₦' + parseInt(d.sellRate).toLocaleString() : '—';

  if (d.lastFetched) {
    var dt = new Date(d.lastFetched);
    document.getElementById('ar-last').textContent = isNaN(dt) ? d.lastFetched : dt.toLocaleString();
  }

  if (d.status && d.status !== 'ok' && d.status !== 'idle') {
    badge.className = 'badge badge-off'; badge.textContent = 'Error';
    dot.style.background = '#e74c3c';
  }

  updateSpreadPreviews();
}

function updateSpreadPreviews() {
  var market   = parseInt(document.getElementById('ar-market').textContent.replace(/[₦,]/g,'')) || 0;
  var buySprd  = parseInt(document.getElementById('ar-buySpread').value)  || -30;
  var sellSprd = parseInt(document.getElementById('ar-sellSpread').value) ||  60;
  document.getElementById('ar-buyPreview').textContent  = market ? 'We Buy = ₦' + (market+buySprd).toLocaleString()  : 'We Buy = market ' + (buySprd >= 0 ? '+' : '') + buySprd;
  document.getElementById('ar-sellPreview').textContent = market ? 'We Sell = ₦' + (market+sellSprd).toLocaleString() : 'We Sell = market +' + sellSprd;
}

document.addEventListener('input', function(e) {
  if (e.target.id === 'ar-buySpread' || e.target.id === 'ar-sellSpread') updateSpreadPreviews();
});

async function saveAutoRateToggle() {
  var enabled = document.getElementById('ar-enabled').checked;
  await apiPost('/api/admin/auto-rate', { enabled: enabled });
  toast(enabled ? '✦ Auto Rate enabled' : 'Auto Rate disabled');
  loadAutoRate();
}

async function saveAutoRateSettings() {
  var buySpread  = parseInt(document.getElementById('ar-buySpread').value);
  var sellSpread = parseInt(document.getElementById('ar-sellSpread').value);
  if (isNaN(buySpread) || isNaN(sellSpread)) { toast('Enter valid spread numbers', true); return; }
  var r = await apiPost('/api/admin/auto-rate', { buySpread: buySpread, sellSpread: sellSpread });
  if (r.success) {
    // Trigger immediate recalculation
    await fetchNow();
  } else { toast('Failed to save', true); }
}

async function fetchNow() {
  var btn = event && event.target;
  if (btn) { btn.textContent = 'Fetching...'; btn.disabled = true; }
  var r = await apiPost('/api/admin/auto-rate/fetch-now', {});
  if (btn) { btn.textContent = '↻ Fetch Now'; btn.disabled = false; }
  if (r.success) {
    toast('✦ Rate updated — Market: ₦' + r.result.marketRate + ' | Buy: ₦' + r.result.buyRate + ' | Sell: ₦' + r.result.sellRate);
    loadAutoRate();
  } else {
    toast(r.error || 'Fetch failed — check server logs', true);
  }
}

// ── UTILS ──
function esc(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── BOOT ──
document.getElementById('loginPass').addEventListener('keydown', function(e){ if(e.key==='Enter') doLogin(); });
</script>
</body>
</html>
