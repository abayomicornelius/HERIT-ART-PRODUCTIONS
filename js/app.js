// HERIT ART PRODUCTION — App Utilities

// ─── Auth ────────────────────────────────────────────────────────────────────
const Auth = {
  getUser: () => JSON.parse(localStorage.getItem('hap_user') || 'null'),
  setUser: (u) => localStorage.setItem('hap_user', JSON.stringify(u)),
  logout() {
    localStorage.removeItem('hap_user');
    const depth = window.location.pathname.split('/').length - 2;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';
    window.location.href = prefix + 'auth/signin.html';
  },
};

// ─── Toast ───────────────────────────────────────────────────────────────────
const Toast = {
  wrap: null,
  init() {
    if (this.wrap) return;
    this.wrap = document.createElement('div');
    this.wrap.className = 'toast-wrap';
    document.body.appendChild(this.wrap);
  },
  show(msg, type = 'info', ms = 3500) {
    this.init();
    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span style="flex-shrink:0;font-size:.95rem">${icons[type]}</span><span>${msg}</span>`;
    this.wrap.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .2s,transform .2s';
      el.style.opacity = '0'; el.style.transform = 'translateX(16px)';
      setTimeout(() => el.remove(), 220);
    }, ms);
  },
  success: (m) => Toast.show(m, 'success'),
  error:   (m) => Toast.show(m, 'error'),
  warning: (m) => Toast.show(m, 'warning'),
  info:    (m) => Toast.show(m, 'info'),
};

// ─── Modal ───────────────────────────────────────────────────────────────────
const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    el.addEventListener('click', (e) => { if (e.target === el) Modal.close(id); }, { once: false });
  },
  close(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('hidden');
    document.body.style.overflow = '';
  },
};

// ─── Tags input ──────────────────────────────────────────────────────────────
function initTags(wrapEl, values = []) {
  const input = wrapEl.querySelector('.tag-input');
  let tags = [...values];

  function render() {
    wrapEl.querySelectorAll('.tag').forEach(t => t.remove());
    tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.innerHTML = `${t}<button class="tag-remove" type="button">✕</button>`;
      tag.querySelector('.tag-remove').onclick = () => { tags = tags.filter(x => x !== t); render(); };
      wrapEl.insertBefore(tag, input);
    });
  }

  input.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
      e.preventDefault();
      const val = input.value.trim().replace(/,+$/, '');
      if (val && !tags.includes(val)) { tags.push(val); render(); }
      input.value = '';
    }
    if (e.key === 'Backspace' && !input.value && tags.length) {
      tags.pop(); render();
    }
  });

  wrapEl.addEventListener('click', () => input.focus());
  render();
  return { getTags: () => tags };
}

// ─── OTP inputs ──────────────────────────────────────────────────────────────
function initOTP() {
  const inputs = [...document.querySelectorAll('.otp-input')];
  inputs.forEach((inp, i) => {
    inp.addEventListener('input', () => {
      if (inp.value.length > 1) inp.value = inp.value.slice(-1);
      if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
    });
  });
}

// ─── Password toggle ─────────────────────────────────────────────────────────
function initPwToggles() {
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = document.getElementById(btn.dataset.for);
      if (!inp) return;
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      btn.textContent = show ? '🙈' : '👁';
    });
  });
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tabs').forEach(group => {
    group.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        if (target) {
          document.querySelectorAll('[data-tab-content]').forEach(c => c.classList.add('hidden'));
          const el = document.getElementById(target);
          if (el) el.classList.remove('hidden');
        }
      });
    });
  });
}

// ─── Dropdowns ───────────────────────────────────────────────────────────────
function initDropdowns() {
  document.querySelectorAll('[data-dd]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = document.getElementById(trigger.dataset.dd);
      if (!menu) return;
      const open = !menu.classList.contains('hidden');
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
      if (!open) menu.classList.remove('hidden');
    });
  });
  document.addEventListener('click', () =>
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'))
  );
}

// ─── File upload zones ───────────────────────────────────────────────────────
function initUploads() {
  document.querySelectorAll('.upload-zone').forEach(zone => {
    const fileInput = zone.querySelector('input[type=file]');

    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault(); zone.classList.remove('drag');
      addFiles([...e.dataTransfer.files], zone);
    });
    zone.addEventListener('click', () => fileInput && fileInput.click());
    if (fileInput) fileInput.addEventListener('change', () => addFiles([...fileInput.files], zone));
  });
}

function addFiles(files, zone) {
  const listId = zone.dataset.list;
  const list = listId ? document.getElementById(listId) : null;
  if (!list) return;
  const icons = { pdf:'📄', png:'🖼️', jpg:'🖼️', jpeg:'🖼️', mp4:'🎬', mov:'🎬', avi:'🎬', doc:'📝', docx:'📝', ppt:'📊', pptx:'📊', zip:'📦', ai:'✏️', psd:'🎨' };
  files.forEach(f => {
    const ext = f.name.split('.').pop().toLowerCase();
    const ic = icons[ext] || '📎';
    const size = f.size > 1048576 ? (f.size/1048576).toFixed(1)+' MB' : (f.size/1024).toFixed(1)+' KB';
    const el = document.createElement('div');
    el.className = 'file-item fade-in';
    el.innerHTML = `<span class="file-icon">${ic}</span><div class="flex-1 min-w-0"><div class="file-name">${f.name}</div><div class="file-size">${size}</div></div><button class="btn btn-ghost btn-sm" type="button" onclick="this.closest('.file-item').remove()">✕</button>`;
    list.appendChild(el);
  });
  Toast.success(`${files.length} file(s) added`);
}

// ─── Sidebar active ───────────────────────────────────────────────────────────
function initSidebar() {
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-item[href]').forEach(item => {
    const href = item.getAttribute('href').replace(/^\.\.\//, '').replace('.html', '');
    if (path.includes(href)) item.classList.add('active');
  });

  const user = Auth.getUser();
  if (user) {
    const nameEl = document.querySelector('.sidebar-user-name');
    const roleEl = document.querySelector('.sidebar-user-role');
    const avEl   = document.querySelector('.sidebar-avatar');
    if (nameEl) nameEl.textContent = user.name || user.email || 'User';
    if (roleEl) roleEl.textContent = user.role === 'production' ? 'Production Team' : 'Brand';
    if (avEl)   avEl.textContent   = initials(user.name || user.email || 'U');
  }

  document.querySelectorAll('[data-logout]').forEach(el =>
    el.addEventListener('click', () => { if (confirm('Log out?')) Auth.logout(); })
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function initials(name = '') {
  return name.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';
}

function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPwToggles();
  initOTP();
  initTabs();
  initDropdowns();
  initUploads();
  initSidebar();
});
