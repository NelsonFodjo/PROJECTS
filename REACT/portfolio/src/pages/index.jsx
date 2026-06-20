/* Hero + content pages */

import React from 'react';
import { Icon, SocialIcon } from '../components/index';
import { DATA, NAV } from '../data';
import avatarLight from '../assets/nelson.jpeg';
import avatarDark from '../assets/dark_nelson.png';

function TopBar({ title, onMenu, scrolled }) {
  return (
    <div className={"topbar" + (scrolled ? " scrolled" : "")}>
      <button className="icon-btn mobile-only" onClick={onMenu} title="Menu"><Icon name="menu" /></button>
      <div className="crumb">Nelson/ <b>{title}</b></div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ go, theme }) {
  const { profile } = DATA;
  const [q, setQ] = React.useState("");
  const links = NAV.filter((n) => n.id !== "home" && n.id !== "chat");
  const avatar = theme === "dark" ? avatarDark : avatarLight;

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
          Hi, I'm Nelson.<br />I Copy, Paste then  <span className="accent">Innovate</span> .
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
        <img src={avatar} alt={profile.fullName} key={theme} />
      </div>
    </div>
  );
}

/* ---------------- Scroll reveal ---------------- */
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={"reveal" + (visible ? " in" : "") + (className ? " " + className : "")}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
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
        {education.map((e, i) => (
          <Reveal as="div" className="tl-item" key={e.school} delay={i * 80}>
            <div className="tl-when">{e.when}</div>
            <div className="tl-body">
              <h3>{e.degree}</h3>
              <div className="tl-org">{e.school} · {e.place}</div>
              {e.note && <div className="tag accent" style={{ display: "inline-block", marginBottom: 6 }}>{e.note}</div>}
              <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", margin: "38px 0 14px", fontWeight: 500 }}>Certifications</h3>
      <div className="stack">
        {certifications.map((c, i) => (
          <Reveal as="div" className="card hover" key={i} delay={i * 70} style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 20px" }}>
            <span className="dot"></span>
            <span style={{ fontSize: 14.5 }}>{c}</span>
          </Reveal>
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
        {projects.map((p, i) => (
          <Reveal as="div" className="card hover proj clickable" key={p.name} delay={i * 70} onClick={() => setActive(p)} role="button" tabIndex={0}
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
          </Reveal>
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
        {experience.map((e, i) => (
          <Reveal as="div" className="tl-item" key={e.role + e.org} delay={i * 80}>
            <div className="tl-when">{e.when}</div>
            <div className="tl-body">
              <h3>{e.role}</h3>
              <div className="tl-org">{e.org} · {e.place}</div>
              <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          </Reveal>
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
      {skills.map((g, i) => (
        <Reveal as="div" className="skill-group" key={g.group} delay={i * 80}>
          <h3>{g.group}</h3>
          <div className="chips">
            {g.items.map((s) => (
              <span className="chip" key={s.n}>{s.n}{s.l && <span className="lvl">{s.l}</span>}</span>
            ))}
          </div>
        </Reveal>
      ))}
      <AskMore go={go} topic="my technical depth" />
    </div>
  );
}

/* ---------------- Community ---------------- */
function Community({ go }) {
  const { community } = DATA;
  return (
    <div className="page wide">
      <PageHead eyebrow="05 — Community" title="Teaching, organizing, giving back" sub="Beyond the code — building people and communities around technology." />
      <div className="grid2">
        {community.map((c, i) => (
          <Reveal as="div" className="card hover proj" key={c.name} delay={i * 70}>
            <div>
              <div className="kicker">{c.role}</div>
              <h3 style={{ marginTop: 4 }}>{c.name}</h3>
            </div>
            <p style={{ marginTop: 10 }}>{c.desc}</p>
            <div className="proj-foot">
              {c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const { gallery } = DATA;
  return (
    <div className="page wide">
      <PageHead eyebrow="Gallery" title="Out in the world" sub="Talks, summits and community moments." />
      <div className="gallery-grid">
        {gallery.map((g, i) => (
          <Reveal as="div" className="gallery-cell" key={g.id} delay={i * 60}>
            <image-slot id={g.id} shape="rounded" radius="14" placeholder={g.cap}></image-slot>
            <div className="cap">{g.cap}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Blog ---------------- */
function Blog() {
  const { blog } = DATA;
  const [active, setActive] = React.useState(null);
  return (
    <div className="page">
      <PageHead eyebrow="Blog" title="Notes & writing" sub="Thoughts on building, learning and teaching technology." />
      <div className="blog-list">
        {blog.map((b, i) => (
          <Reveal as="article" className="blog-item clickable" key={b.title} delay={i * 80} onClick={() => setActive(b)} role="button" tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") setActive(b); }}>
            <div>
              <div className="blog-meta">
                <span className="tag accent">{b.tag}</span>
                <span className="blog-date">{b.date}</span>
              </div>
              <h3>{b.title}</h3>
              <p>{b.excerpt}</p>
              <span className="blog-more">Read more <Icon name="arrow" style={{ width: 12, height: 12, stroke: "currentColor", fill: "none", strokeWidth: 1.8 }} /></span>
            </div>
            <div className="blog-read">{b.read}</div>
          </Reveal>
        ))}
      </div>
      {active && <BlogPostModal key={active.title} post={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function loadBlogState(title) {
  try {
    const stored = JSON.parse(localStorage.getItem("nf_blog_" + title) || "{}");
    return { liked: !!stored.liked, likes: stored.likes || 0, comments: stored.comments || [] };
  } catch {
    return { liked: false, likes: 0, comments: [] };
  }
}

function BlogPostModal({ post, onClose }) {
  const initial = React.useMemo(() => loadBlogState(post.title), [post.title]);
  const [liked, setLiked] = React.useState(initial.liked);
  const [likes, setLikes] = React.useState(initial.likes);
  const [comments, setComments] = React.useState(initial.comments);
  const [draft, setDraft] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const persist = (next) => {
    try { localStorage.setItem("nf_blog_" + post.title, JSON.stringify(next)); } catch { /* ignored */ }
  };

  const toggleLike = () => {
    const nextLiked = !liked;
    const nextLikes = Math.max(0, likes + (nextLiked ? 1 : -1));
    setLiked(nextLiked); setLikes(nextLikes);
    persist({ liked: nextLiked, likes: nextLikes, comments });
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const next = [...comments, { text: draft.trim(), at: new Date().toISOString() }];
    setComments(next);
    setDraft("");
    persist({ liked, likes, comments: next });
  };

  const share = async () => {
    const url = location.origin + location.pathname + "#blog";
    try {
      if (navigator.share) await navigator.share({ title: post.title, text: post.excerpt, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    } catch { /* user cancelled or clipboard unavailable */ }
  };

  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div className="modal post" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" fill="none"/></svg>
        </button>
        <div className="blog-meta">
          <span className="tag accent">{post.tag}</span>
          <span className="blog-date">{post.date}</span>
          <span className="blog-read">{post.read}</span>
        </div>
        <h2 className="pm-title">{post.title}</h2>
        <p className="pm-long">{post.excerpt}</p>

        <div className="blog-actions">
          <button className={"btn" + (liked ? " primary" : "")} onClick={toggleLike}>
            <span className="ico"><Icon name="spark" /></span> {liked ? "Liked" : "Like"}{likes > 0 ? ` · ${likes}` : ""}
          </button>
          <button className="btn" onClick={share}>
            <span className="ico"><Icon name="send" /></span> {copied ? "Link copied" : "Share"}
          </button>
        </div>

        <div className="blog-comments">
          <div className="pm-sub">Comments {comments.length > 0 ? `(${comments.length})` : ""}</div>
          {comments.length === 0 && <p className="blog-no-comments">Be the first to comment.</p>}
          <ul className="blog-comment-list">
            {comments.map((c, i) => <li key={i}>{c.text}</li>)}
          </ul>
          <form className="blog-comment-form" onSubmit={addComment}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a comment…" />
            <button type="submit" className="btn primary" disabled={!draft.trim()}>Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Memory game ---------------- */
const GAME_ICONS = [
  "home", "chat", "education", "projects", "experience", "skills", "community", "gallery",
  "blog", "calendar", "settings", "send", "menu", "sun", "moon", "mail",
  "phone", "pin", "play", "spark", "panel", "panelLeft",
];
const GAME_SIZE = 8;
const GAME_PAIRS = (GAME_SIZE * GAME_SIZE) / 2;

function shuffledDeck() {
  const faces = [];
  for (let i = 0; i < GAME_PAIRS; i++) {
    const icon = GAME_ICONS[i % GAME_ICONS.length];
    const variant = i >= GAME_ICONS.length ? "accent" : "plain";
    faces.push({ icon, variant }, { icon, variant });
  }
  for (let i = faces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [faces[i], faces[j]] = [faces[j], faces[i]];
  }
  return faces.map((f, i) => ({ ...f, id: i }));
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

function MemoryGame() {
  const [deck, setDeck] = React.useState(() => shuffledDeck());
  const [flipped, setFlipped] = React.useState([]);
  const [matched, setMatched] = React.useState([]);
  const [moves, setMoves] = React.useState(0);
  const [startedAt, setStartedAt] = React.useState(null);
  const [finishedAt, setFinishedAt] = React.useState(null);
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    if (!startedAt || finishedAt) return;
    const id = setInterval(() => setNow(Date.now()), 30);
    return () => clearInterval(id);
  }, [startedAt, finishedAt]);

  const reset = () => {
    setDeck(shuffledDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStartedAt(null);
    setFinishedAt(null);
  };

  const elapsed = startedAt ? (finishedAt || now) - startedAt : 0;
  const done = matched.length === deck.length;

  const flip = (id) => {
    if (finishedAt || flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;
    if (!startedAt) setStartedAt(() => Date.now());

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      const cardA = deck.find((c) => c.id === a);
      const cardB = deck.find((c) => c.id === b);
      if (cardA.icon === cardB.icon && cardA.variant === cardB.variant) {
        const newMatched = [...matched, a, b];
        setTimeout(() => {
          setMatched(newMatched);
          setFlipped([]);
          if (newMatched.length === deck.length) setFinishedAt(Date.now());
        }, 350);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  return (
    <div className="memory-game">
      <div className="memory-head">
        <div>
          <div className="memory-title">Quick memory match</div>
          <div className="memory-sub">{GAME_PAIRS} pairs · {GAME_SIZE}×{GAME_SIZE} grid — flip two cards, find the match.</div>
        </div>
        <div className="memory-stats">
          <div className="memory-stat"><span>Time</span><b>{formatTime(elapsed)}</b></div>
          <div className="memory-stat"><span>Moves</span><b>{moves}</b></div>
          <button className="btn" onClick={reset}>Restart</button>
        </div>
      </div>

      {done && (
        <div className="memory-done">
          Solved in <b>{formatTime(elapsed)}</b> with <b>{moves}</b> moves.
        </div>
      )}

      <div className="memory-grid">
        {deck.map((c) => {
          const isFlipped = flipped.includes(c.id) || matched.includes(c.id);
          const isMatched = matched.includes(c.id);
          return (
            <button
              key={c.id}
              className={"memory-card" + (isFlipped ? " flipped" : "") + (isMatched ? " matched" : "")}
              onClick={() => flip(c.id)}
              aria-label={isFlipped ? c.icon : "Hidden card"}
            >
              <div className="memory-card-inner">
                <div className="memory-card-back"><Icon name="spark" /></div>
                <div className={"memory-card-front" + (c.variant === "accent" ? " accent" : "")}>
                  <Icon name={c.icon} />
                </div>
              </div>
            </button>
          );
        })}
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

/* ---------------- Game ---------------- */
function Game() {
  return (
    <div className="page">
      <PageHead eyebrow="Just for fun" title="Quick memory match" sub="Flip two cards, find the matching icon, and see how fast you can clear the board. Nelson's best score is 06:50.23 and 152 Moves." />
      <MemoryGame />
    </div>
  );
}

export { TopBar, Hero, Education, Projects, Experience, Skills, Community, Gallery, Blog, Contact, Game };
