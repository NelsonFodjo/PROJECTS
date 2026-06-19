/* Hero + content pages */

import React from 'react';
import { Icon } from '../components/index';
import { DATA } from '../data';

function TopBar({ title, onMenu, scrolled }) {
  return (
    <div className={"topbar" + (scrolled ? " scrolled" : "")}>
      <button className="icon-btn mobile-only" onClick={onMenu} title="Menu"><Icon name="menu" /></button>
      <div className="crumb">Nelson/ <b>{title}</b></div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ go }) {
  const { profile } = DATA;
  const [q, setQ] = React.useState("");
  const links = window.NAV.filter((n) => n.id !== "home" && n.id !== "chat");

  const ask = (text) => {
    const value = (text ?? q).trim();
    if (!value) return;
    go("chat", value);
  };

  return (
    <div className="hero">
      <div className="hero-l">
        <div className="hero-divider"></div>
        <div className="eyebrow" style={{ marginTop: 18 }}>{profile.tagline}</div>
        <h1>
          Hi, I'm Nelson.<br />I build <span className="accent">scalable</span> solutions.
        </h1>
        <p className="lead">{profile.summary}</p>

        <form className="hero-ask" onSubmit={(e) => { e.preventDefault(); ask(); }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask me anything about Nelson…"
            aria-label="Ask the AI assistant"
          />
          <button className="send-btn" type="submit" disabled={!q.trim()} title="Start chat">
            <Icon name="send" style={{ stroke: "currentColor", fill: "none", strokeWidth: 1.8 }} />
          </button>
        </form>
        <div className="hero-hint">
          <span className="try">Try:</span>
          <button onClick={() => ask("What projects has Nelson built?")}>What projects has Nelson built?</button>
          <button onClick={() => ask("What's Nelson's experience?")}>His experience?</button>
        </div>

        <div className="quick-links">
          {links.map((l) => (
            <button className="qlink" key={l.id} onClick={() => go(l.id)}>
              {l.label} <span className="ar"><Icon name="arrow" style={{ width: 13, height: 13, stroke: "currentColor", fill: "none", strokeWidth: 1.8 }} /></span>
            </button>
          ))}
        </div>
      </div>

      <div className="hero-photo">
        <img src="src/assets/nelson.jpeg" alt={profile.fullName} />
        <div className="badge"><span className="pulse"></span> Open to opportunities</div>
      </div>
    </div>
  );
}

/* ---------------- Page header ---------------- */
function PageHead({ eyebrow, title, sub }) {
  return (
    <div className="page-head">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function AskMore() { return null; }

/* ---------------- Education ---------------- */
function Education({ go }) {
  const { education, certifications } = DATA;
  return (
    <div className="page">
      <PageHead eyebrow="01 — Education" title="How I learned to build" sub="A blend of formal CS, applied data-science fellowships and a perfect-GPA science foundation." />
      <div className="timeline">
        {education.map((e) => (
          <div className="tl-item" key={e.school}>
            <div className="tl-when">{e.when}</div>
            <div className="tl-body">
              <h3>{e.degree}</h3>
              <div className="tl-org">{e.school} · {e.place}</div>
              {e.note && <div className="tag accent" style={{ display: "inline-block", marginBottom: 6 }}>{e.note}</div>}
              <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", margin: "38px 0 14px", fontWeight: 500 }}>Certifications</h3>
      <div className="stack">
        {certifications.map((c, i) => (
          <div className="card hover" key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 20px" }}>
            <span className="dot"></span>
            <span style={{ fontSize: 14.5 }}>{c}</span>
          </div>
        ))}
      </div>
      <AskMore go={go} topic="my coursework" />
    </div>
  );
}

/* ---------------- Projects ---------------- */
function Projects({ go }) {
  const { projects } = DATA;
  const [active, setActive] = React.useState(null);
  return (
    <div className="page wide">
      <PageHead eyebrow="02 — Projects" title="Things I've built" sub="From EdTech platforms to zero-knowledge experiments. Tap any project for the full story." />
      <div className="grid2">
        {projects.map((p) => (
          <div className="card hover proj clickable" key={p.name} onClick={() => setActive(p)} role="button" tabIndex={0}
               onKeyDown={(e) => { if (e.key === "Enter") setActive(p); }}>
            <div className="proj-top">
              <div>
                <div className="kicker">{p.kicker}</div>
                <h3 style={{ marginTop: 4 }}>{p.name}</h3>
              </div>
              {p.featured && <span className="tag accent">Featured</span>}
            </div>
            <p>{p.desc}</p>
            <div className="proj-foot">
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
            <span className="proj-more">View details <Icon name="arrow" style={{ width: 12, height: 12, stroke: "currentColor", fill: "none", strokeWidth: 1.8 }} /></span>
          </div>
        ))}
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project]);
  if (!project) return null;
  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div className="modal project" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" fill="none"/></svg>
        </button>
        <div className="pm-kicker">{project.kicker}</div>
        <h2 className="pm-title">{project.name}</h2>
        <div className="pm-meta">
          {project.year && <span className="tag">{project.year}</span>}
          {project.role && <span className="tag accent">{project.role}</span>}
        </div>
        <p className="pm-long">{project.long || project.desc}</p>
        {project.highlights && (
          <React.Fragment>
            <div className="pm-sub">Highlights</div>
            <ul className="pm-highlights">
              {project.highlights.map((h, i) => <li key={i}><span className="dot"></span>{h}</li>)}
            </ul>
          </React.Fragment>
        )}
        <div className="pm-tags">
          {project.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Experience ---------------- */
function Experience({ go }) {
  const { experience } = DATA;
  return (
    <div className="page">
      <PageHead eyebrow="03 — Experience" title="Where I've made an impact" sub="Roles across education, technology and community development — with the numbers behind them." />
      <div className="timeline">
        {experience.map((e) => (
          <div className="tl-item" key={e.role + e.org}>
            <div className="tl-when">{e.when}</div>
            <div className="tl-body">
              <h3>{e.role}</h3>
              <div className="tl-org">{e.org} · {e.place}</div>
              <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
      <AskMore go={go} topic="my experience" />
    </div>
  );
}

/* ---------------- Skills ---------------- */
function Skills({ go }) {
  const { skills } = DATA;
  return (
    <div className="page">
      <PageHead eyebrow="04 — Skills" title="The tools I work with" sub="A working toolkit across engineering, data, architecture and leadership." />
      {skills.map((g) => (
        <div className="skill-group" key={g.group}>
          <h3>{g.group}</h3>
          <div className="chips">
            {g.items.map((s) => (
              <span className="chip" key={s.n}>{s.n}{s.l && <span className="lvl">{s.l}</span>}</span>
            ))}
          </div>
        </div>
      ))}
      <AskMore go={go} topic="my technical depth" />
    </div>
  );
}

/* ---------------- Community ---------------- */
function Community({ go }) {
  const { community, profile } = DATA;
  return (
    <div className="page wide">
      <PageHead eyebrow="05 — Community" title="Teaching, organizing, giving back" sub="Beyond the code — building people and communities around technology." />
      <div className="grid2">
        {community.map((c) => (
          <div className="card hover proj" key={c.name}>
            <div>
              <div className="kicker">{c.role}</div>
              <h3 style={{ marginTop: 4 }}>{c.name}</h3>
            </div>
            <p style={{ marginTop: 10 }}>{c.desc}</p>
            <div className="proj-foot">
              {c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", margin: "40px 0 16px", fontWeight: 500 }}>Get in touch</h3>
      <div className="contact-grid">
        <a className="contact-row" href={"mailto:" + profile.email}>
          <span className="ci"><Icon name="mail" /></span>
          <span><div className="cl">Email</div><div className="cv">{profile.email}</div></span>
        </a>
        <a className="contact-row" href={"tel:" + profile.phone.replace(/\s/g, "")}>
          <span className="ci"><Icon name="phone" /></span>
          <span><div className="cl">Phone</div><div className="cv">{profile.phone}</div></span>
        </a>
        <div className="contact-row" style={{ cursor: "default" }}>
          <span className="ci"><Icon name="pin" /></span>
          <span><div className="cl">Based in</div><div className="cv">{profile.location}</div></span>
        </div>
        <a className="contact-row" href={profile.calendly} target="_blank" rel="noreferrer">
          <span className="ci"><Icon name="calendar" /></span>
          <span><div className="cl">Let's talk</div><div className="cv">Book 30 minutes</div></span>
        </a>
      </div>
    </div>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const { gallery } = DATA;
  return (
    <div className="page wide">
      <PageHead eyebrow="Gallery" title="Out in the world" sub="Talks, summits and community moments. Drag an image onto any tile to fill it." />
      <div className="gallery-grid">
        {gallery.map((g) => (
          <div className="gallery-cell" key={g.id}>
            <image-slot id={g.id} shape="rounded" radius="14" placeholder={g.cap}></image-slot>
            <div className="cap">{g.cap}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Blog ---------------- */
function Blog() {
  const { blog } = DATA;
  return (
    <div className="page">
      <PageHead eyebrow="Blog" title="Notes & writing" sub="Thoughts on building, learning and teaching technology." />
      <div className="blog-list">
        {blog.map((b) => (
          <article className="blog-item" key={b.title}>
            <div>
              <div className="blog-meta">
                <span className="tag accent">{b.tag}</span>
                <span className="blog-date">{b.date}</span>
              </div>
              <h3>{b.title}</h3>
              <p>{b.excerpt}</p>
            </div>
            <div className="blog-read">{b.read}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Contact ---------------- */
function Contact({ go, onMessage }) {
  const { profile } = DATA;
  return (
    <div className="page">
      <PageHead eyebrow="Contact" title="Let's build something" sub="Open to internships, collaborations and good conversations. Reach me whichever way suits you best." />

      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 22, background: "var(--surface)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)", color: "var(--on-accent)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
            <Icon name="mail" style={{ width: 20, height: 20, stroke: "currentColor", fill: "none", strokeWidth: 1.6 }} />
          </span>
          <div>
            <div style={{ fontWeight: 650, fontSize: 16 }}>Send me a message</div>
            <div style={{ fontSize: 13.5, color: "var(--ink-3)" }}>Opens a pre-filled email straight to my inbox.</div>
          </div>
        </div>
        <button className="btn primary" onClick={onMessage}>
          <span className="ico"><Icon name="send" /></span> Send a message
        </button>
      </div>

      <div className="contact-grid">
        <a className="contact-row" href={"mailto:" + profile.email}>
          <span className="ci"><Icon name="mail" /></span>
          <span><div className="cl">Email</div><div className="cv">{profile.email}</div></span>
        </a>
        <a className="contact-row" href={"tel:" + profile.phone.replace(/\s/g, "")}>
          <span className="ci"><Icon name="phone" /></span>
          <span><div className="cl">Phone</div><div className="cv">{profile.phone}</div></span>
        </a>
        <div className="contact-row" style={{ cursor: "default" }}>
          <span className="ci"><Icon name="pin" /></span>
          <span><div className="cl">Based in</div><div className="cv">{profile.location}</div></span>
        </div>
        <a className="contact-row" href={profile.socials.find((s) => s.id === "whatsapp").url} target="_blank" rel="noreferrer">
          <span className="ci"><SocialIcon name="whatsapp" /></span>
          <span><div className="cl">WhatsApp</div><div className="cv">Message me</div></span>
        </a>
      </div>

      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", margin: "34px 0 14px", fontWeight: 500 }}>Find me online</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {profile.socials.filter((s) => s.id !== "whatsapp").map((s) => (
          <a key={s.id} className="btn" href={s.url} target="_blank" rel="noreferrer">
            <span style={{ display: "grid", placeItems: "center", width: 16 }}><SocialIcon name={s.id} /></span>
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TopBar, Hero, Education, Projects, Experience, Skills, Community, Gallery, Blog, Contact });

export { TopBar, Hero, Education, Projects, Experience, Skills, Community, Gallery, Blog, Contact };
