/* Root app: routing, resizable sidebar, theme */

import React from 'react';
import { Sidebar, Icon, ThemeToggle, MessageModal, ResumeGateModal, NeuralBg } from './components/index';
import { Chat } from './components/Chat';
import { TopBar, Hero, Education, Projects, Gallery, Experience, Skills, Community, Blog, Contact, Game } from './pages/index';

const ROUTES = ["home", "chat", "education", "projects", "gallery", "experience", "skills", "community", "blog", "contact", "game"];

function App() {
  const getRoute = () => {
    const h = (location.hash || "#home").replace("#", "");
    return ROUTES.includes(h) ? h : "home";
  };
  const [route, setRoute] = React.useState(getRoute());
  const [theme, setTheme] = React.useState(() => localStorage.getItem("nf_theme") || "light");
  const [collapsed, setCollapsed] = React.useState(() => localStorage.getItem("nf_collapsed") === "1");
  const [width, setWidth] = React.useState(() => {
    const w = parseInt(localStorage.getItem("nf_sb_w") || "286", 10);
    return isNaN(w) ? 286 : Math.min(420, Math.max(232, w));
  });
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [seed, setSeed] = React.useState(null);
  const [msgOpen, setMsgOpen] = React.useState(false);
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const mainRef = React.useRef(null);

  /* routing */
  React.useEffect(() => {
    const onHash = () => { setRoute(getRoute()); setMobileOpen(false); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (id, payload) => {
    if (id === route) { if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: "smooth" }); }
    if (id === "chat" && payload) setSeed(payload);
    location.hash = id;
    setRoute(id);
    setMobileOpen(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  /* theme */
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nf_theme", theme);
  }, [theme]);

  React.useEffect(() => { localStorage.setItem("nf_collapsed", collapsed ? "1" : "0"); }, [collapsed]);
  React.useEffect(() => { localStorage.setItem("nf_sb_w", String(width)); }, [width]);

  /* scroll shadow on topbar */
  React.useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 6);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [route]);

  /* drag resize */
  const startResize = (e) => {
    e.preventDefault();
    const sb = document.querySelector(".sidebar");
    if (sb) sb.classList.add("dragging");
    const move = (ev) => {
      const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
      setWidth(Math.min(420, Math.max(232, x)));
    };
    const up = () => {
      if (sb) sb.classList.remove("dragging");
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", up);
  };

  const titleMap = { home: "Home", chat: "Chat", education: "Education", projects: "Projects", gallery: "Gallery", experience: "Experience", skills: "Skills", community: "Community", blog: "Blog", contact: "Contact", game: "Game" };

  let page;
  if (route === "home") page = <Hero go={go} theme={theme} />;
  else if (route === "chat") page = <Chat go={go} seed={seed} onSeedConsumed={() => setSeed(null)} theme={theme} />;
  else if (route === "education") page = <Education go={go} />;
  else if (route === "projects") page = <Projects go={go} />;
  else if (route === "gallery") page = <Gallery />;
  else if (route === "experience") page = <Experience go={go} />;
  else if (route === "skills") page = <Skills go={go} />;
  else if (route === "community") page = <Community go={go} />;
  else if (route === "blog") page = <Blog />;
  else if (route === "contact") page = <Contact go={go} onMessage={() => setMsgOpen(true)} />;
  else if (route === "game") page = <Game />;

  const isChat = route === "chat";

  return (
    <div className="app">
      {route === "home" && <NeuralBg theme={theme} />}
      {!mobileOpen && <ThemeToggle theme={theme} setTheme={setTheme} />}
      <MessageModal open={msgOpen} onClose={() => setMsgOpen(false)} />
      <ResumeGateModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <Sidebar
        route={route} go={go}
        collapsed={collapsed} setCollapsed={setCollapsed}
        width={width} startResize={startResize}
        mobileOpen={mobileOpen}
        onMessage={() => setMsgOpen(true)}
        onResume={() => setResumeOpen(true)}
        theme={theme}
      />
      <div className={"scrim" + (mobileOpen ? " show" : "")} onClick={() => setMobileOpen(false)}></div>

      <div className="main" ref={mainRef} style={isChat ? { overflow: "hidden" } : {}}>
        {!isChat && <TopBar title={titleMap[route]} onMenu={() => setMobileOpen(true)} scrolled={scrolled} />}
        {isChat && (
          <div className="topbar mobile-only" style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, background: "transparent", border: "none" }}>
            <button className="icon-btn" onClick={() => setMobileOpen(true)} title="Menu"><Icon name="menu" /></button>
          </div>
        )}
        {page}
      </div>
    </div>
  );
}

export default App;
