/* Shared UI: icons, sidebar, helpers */

import React from 'react';
import { DATA, NAV } from '../data';
import avatarLight from '../assets/nelson.jpeg';
import avatarDark from '../assets/dark_nelson.png';
import resumePdf from '../assets/Nelson-Fodjo-Resume.pdf';

const Icon = ({ name, ...p }) => {
  const paths = {
    home: <><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/></>,
    chat: <><path d="M4 5h16v11H9l-4 3v-3H4z"/></>,
    education: <><path d="M12 4 2.5 9 12 14l9.5-5z"/><path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></>,
    projects: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/></>,
    experience: <><rect x="3.5" y="7" width="17" height="13" rx="2"/><path d="M8.5 7V5.2A1.7 1.7 0 0 1 10.2 3.5h3.6A1.7 1.7 0 0 1 15.5 5.2V7"/></>,
    skills: <><path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8-4.2-4.1 5.9-.9z"/></>,
    community: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 6.2a3 3 0 0 1 0 5.6"/><path d="M17.5 14.2c2 .7 3.5 2.4 3.5 4.8"/></>,
    gallery: <><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="8.5" cy="9" r="1.6"/><path d="M4 16.5 9.5 12l3.5 3 2.5-2 4.5 4"/></>,
    blog: <><rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M8 8.5h8M8 12h8M8 15.5h5"/></>,
    download: <><path d="M12 4v11"/><path d="m7.5 11 4.5 4.5 4.5-4.5"/><path d="M5 20h14"/></>,
    calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17"/><path d="M8 3v4M16 3v4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.5M12 19v2.5M4.2 7l2.1 1.2M17.7 15.8l2.1 1.2M19.8 7l-2.1 1.2M6.3 15.8 4.2 17M2.5 12H5M19 12h2.5"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    send: <><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></>,
    moon: <><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></>,
    phone: <><path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></>,
    pin: <><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8.5 5 3.5-5 3.5z" fill="currentColor" stroke="none"/></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8.5 13 11l2.5 1-2.5 1-1 2.5-1-2.5L8.5 12 11 11z" fill="currentColor" stroke="none"/></>,
    panel: <><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M9 4.5v15"/></>,
    panelLeft: <><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M9 4.5v15"/><path d="m15.5 9.5-2.5 2.5 2.5 2.5"/></>,
    panelRight: <><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M9 4.5v15"/><path d="m12.8 9.5 2.5 2.5-2.5 2.5"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      {paths[name] || null}
    </svg>
  );
};

const SOCIAL_PATHS = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
};
const SocialIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17">
    <path fill="currentColor" d={SOCIAL_PATHS[name]} />
  </svg>
);

/* ---------------- Sidebar ---------------- */
function Sidebar({ route, go, collapsed, setCollapsed, width, startResize, mobileOpen, onMessage, onResume, theme }) {
  const { profile } = DATA;
  const avatar = theme === "dark" ? avatarDark : avatarLight;

  const cls = ["sidebar", collapsed && "collapsed", mobileOpen === false && "mobile-hidden"].filter(Boolean).join(" ");
  const w = collapsed ? 76 : width;
  const style = { width: w, minWidth: w, maxWidth: w, flexBasis: w };

  return (
    <aside className={cls} style={style}>
      <div className="sb-inner">
        <div className="sb-head">
          <button className="sb-home" onClick={() => go("home")} title="Home">
            <img className="avatar" src={avatar} alt={profile.name} />
            <div className="sb-id">
              <div className="sb-name">{profile.name}</div>
              <div className="sb-tag">{profile.tagline}</div>
            </div>
          </button>
          <button
            className="sb-collapse"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={collapsed ? "panelRight" : "panelLeft"} />
          </button>
        </div>

        <nav className="sb-nav">
          <div className="sb-section-label">Portfolio</div>
          {NAV.map((n) => (
            <button
              key={n.id}
              className={"navitem" + (route === n.id ? " active" : "")}
              onClick={() => go(n.id)}
              title={n.label}
            >
              <span className="ico"><Icon name={n.icon} /></span>
              <span className="lbl">{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="sb-foot">
          <div className="social-row">
            {profile.socials.map((s) => (
              <a key={s.id} className="soc" href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                <SocialIcon name={s.id} />
              </a>
            ))}
          </div>
          <button className="btn block" onClick={onResume} title="Download Resume">
            <span className="ico"><Icon name="download" /></span>
            <span className="lbl">Download Resume</span>
          </button>
          <button className="btn primary block" onClick={onMessage} title="Send me a message">
            <span className="ico"><Icon name="mail" /></span>
            <span className="lbl">Send me a message</span>
          </button>
        </div>
      </div>

      <div className="sb-resize" onMouseDown={startResize} title="Drag to resize"></div>
    </aside>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      aria-label="Toggle theme"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}

function MessageModal({ open, onClose }) {
  const { profile } = DATA;
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const firstRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;

    setTimeout(() => firstRef.current && firstRef.current.focus(), 60);
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const send = (e) => {
    e.preventDefault();
    if (!subject.trim() && !body.trim()) return;
    const url = "mailto:" + profile.email +
      "?subject=" + encodeURIComponent(subject || "Hello Nelson") +
      "&body=" + encodeURIComponent(body);
    window.location.href = url;
    setSent(true);
    setTimeout(() => { onClose(); setSubject(""); setBody(""); setSent(false); }, 1400);
  };

  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" fill="none"/></svg>
        </button>
        <div className="modal-head">
          <div className="eyebrow">Get in touch</div>
          <h2>Send me a message</h2>
          <p>Drop a subject and a note — it opens your mail app addressed straight to me.</p>
        </div>
        {sent ? (
          <div className="modal-sent">
            <span className="sent-dot"></span>
            Opening your mail app…
          </div>
        ) : (
          <form className="modal-form" onSubmit={send}>
            <label className="field">
              <span>Subject</span>
              <input ref={firstRef} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder="Write your message…" />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn primary" disabled={!subject.trim() && !body.trim()}>
                <span className="ico"><Icon name="send" /></span> Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ResumeGateModal({ open, onClose }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const firstRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;

    setTimeout(() => firstRef.current && firstRef.current.focus(), 60);
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const nameError = !name.trim() ? "Name is required." : "";
  const emailError = !email.trim() ? "Email is required." : !email.includes("@") ? "Email must contain @." : "";
  const orgError = !org.trim() ? "Organisation is required." : "";
  const valid = !nameError && !emailError && !orgError;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    try {
      const entry = { name: name.trim(), email: email.trim(), org: org.trim(), at: new Date().toISOString() };
      const log = JSON.parse(localStorage.getItem("nf_resume_leads") || "[]");
      log.push(entry);
      localStorage.setItem("nf_resume_leads", JSON.stringify(log));
    } catch { /* ignored */ }

    const a = document.createElement("a");
    a.href = resumePdf;
    a.download = "Nelson-Fodjo-Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setName(""); setEmail(""); setOrg(""); setTouched(false);
    onClose();
  };

  const cancel = () => {
    setName(""); setEmail(""); setOrg(""); setTouched(false);
    onClose();
  };

  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" fill="none"/></svg>
        </button>
        <div className="modal-head">
          <div className="eyebrow">Before you download</div>
          <h2>Who's asking?</h2>
          <p>Quick intro so I know who's looking at my resume — then it's all yours.</p>
        </div>
        <form className="modal-form" onSubmit={submit} noValidate>
          <label className="field">
            <span>Name</span>
            <input ref={firstRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-invalid={touched && !!nameError} />
            {touched && nameError && <div className="field-error">{nameError}</div>}
          </label>
          <label className="field">
            <span>Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-invalid={touched && !!emailError} />
            {touched && emailError && <div className="field-error">{emailError}</div>}
          </label>
          <label className="field">
            <span>Organisation</span>
            <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company / school" aria-invalid={touched && !!orgError} />
            {touched && orgError && <div className="field-error">{orgError}</div>}
          </label>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={cancel}>Cancel</button>
            <button type="submit" className="btn primary">
              <span className="ico"><Icon name="download" /></span> Download Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NeuralBg({ theme }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, nodes, raf;
    let running = true;

    const dotColor = theme === "dark" ? "148, 163, 184" : "100, 116, 139";
    const lineColor = theme === "dark" ? "96, 165, 250" : "59, 130, 246";

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.round((w * h) / 7000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.strokeStyle = `rgba(${lineColor}, ${0.3 * (1 - dist / 160)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${dotColor}, 0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      raf = requestAnimationFrame(step);
    } else {
      step();
    }

    const onVisibility = () => {
      running = document.visibilityState === "visible" && !reduceMotion;
      if (running) raf = requestAnimationFrame(step);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />;
}

export { Icon, SocialIcon, Sidebar, ThemeToggle, MessageModal, ResumeGateModal, NeuralBg };
