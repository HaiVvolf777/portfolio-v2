"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowDownLeft, ArrowRight, ArrowUpRight, Box, Braces, Check, ChevronDown, Code2, Copy, Download, ExternalLink, Globe2, Layers3, Mail, MapPin, Menu, Monitor, Moon, ScanLine, Sparkles, Sun, Workflow, X } from "lucide-react";
import { getDictionary, type Project, type ProjectCategory, type RoomId } from "@/lib/content";
import { languageNames, locales, type Locale } from "@/lib/i18n";
import { usePreferences } from "@/lib/preferences";
import OfficeFallback from "@/components/office/OfficeFallback";
import ProjectVisual, { CarOutline } from "@/components/ProjectVisual";
import type { OfficeSceneProps } from "@/components/office/OfficeScene";

const OfficeScene = dynamic<OfficeSceneProps>(() => import("@/components/office/OfficeScene"), { ssr: false });
type ThemePreference = "light" | "dark" | "system";
const roomIcons = [Box, Code2, Layers3, Workflow, Braces, Mail];

function Brand() {
  return <svg viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M7 7v20M7 17h11M18 7v20M22 27l7-20M24 22h7" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" /></svg>;
}

export default function Portfolio({ locale, simpleOnly = false }: { locale: Locale; simpleOnly?: boolean }) {
  const d = getDictionary(locale);
  const { theme, themePreference, reducedMotion, setThemePreference } = usePreferences();
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [activeRoom, setActiveRoom] = useState<RoomId>("lobby");
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (simpleOnly) return;
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowPower = (device.deviceMemory !== undefined && device.deviceMemory < 4) || device.connection?.saveData === true;
    let viewPreference: string | null = null;
    try { viewPreference = localStorage.getItem("haider-view"); } catch { /* Storage is optional. */ }
    const frame = requestAnimationFrame(() => setImmersive(viewPreference === "3d" || (viewPreference !== "static" && !matchMedia("(max-width: 767px)").matches && !reducedMotion && !lowPower)));
    return () => cancelAnimationFrame(frame);
  }, [simpleOnly, reducedMotion]);

  useEffect(() => {
    const sections = d.nav.map((room) => document.getElementById(room.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveRoom(entry.target.id as RoomId);
    }, { rootMargin: "-18% 0px -52% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [d]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject && dialog && !dialog.open) {
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previousOverflow; };
    }
    if (!selectedProject && dialog?.open) dialog.close();
  }, [selectedProject]);

  useEffect(() => {
    if (!themeOpen) return;
    const outside = (event: PointerEvent) => { if (!themeRef.current?.contains(event.target as Node)) setThemeOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setThemeOpen(false); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [themeOpen]);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const changeTheme = (preference: ThemePreference) => {
    setThemePreference(preference);
    setThemeOpen(false);
  };

  const toggleImmersive = () => {
    const next = !immersive;
    setImmersive(next);
    setSceneReady(false);
    try { localStorage.setItem("haider-view", next ? "3d" : "static"); } catch { /* Storage is optional. */ }
  };
  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4000);
  }, []);
  const sceneUnavailable = useCallback(() => { setImmersive(false); }, []);
  const markSceneReady = useCallback(() => setSceneReady(true), []);
  const goToRoom = useCallback((room: string) => {
    if (!document.getElementById(room)) return;
    setActiveRoom(room as RoomId);
    setMobileOpen(false);
    document.getElementById(room)?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    history.replaceState(null, "", `#${room}`);
  }, [reducedMotion]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(d.contact.email); showToast(d.common.emailCopied); }
    catch { showToast(d.common.emailCopyError); }
  };
  const featured = d.projects.items.find((project) => project.featured) ?? d.projects.items[0];
  const visibleProjects = d.projects.items.filter((project) => !project.featured && (filter === "all" || project.category === filter));
  const activeIndex = Math.max(0, d.nav.findIndex((room) => room.id === activeRoom));

  return (
    <div className="portfolio" data-motion={reducedMotion ? "reduced" : "full"}>
      <a className="skip-link" href="#main">{d.common.skipToContent}</a>
      <header className="site-header">
        <a className="brand" href="#lobby" aria-label={`${d.hero.greeting} · ${d.footer.backToLobby}`} onClick={() => setMobileOpen(false)}>
          <span className="brand-symbol"><Brand /></span><span>Haider Ali<span className="brand-dot">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label={d.common.navigation}>
          {d.nav.map((room) => <a key={room.id} className={activeRoom === room.id ? "active" : ""} href={`#${room.id}`} aria-current={activeRoom === room.id ? "location" : undefined}>{room.label}</a>)}
        </nav>
        <div className="header-controls">
          <div className="theme-control" ref={themeRef}>
            <button className="icon-button theme-trigger" aria-label={d.common.theme} title={d.common.theme} aria-expanded={themeOpen} onClick={() => setThemeOpen(!themeOpen)}>{theme === "light" ? <Sun size={17} /> : <Moon size={17} />}</button>
            {themeOpen && <div className="theme-menu" role="group" aria-label={d.common.theme}>{(["light", "dark", "system"] as const).map((item) => {
              const Icon = item === "light" ? Sun : item === "dark" ? Moon : Monitor;
              return <button key={item} onClick={() => changeTheme(item)} aria-pressed={themePreference === item}><Icon size={15} />{d.common[item]}{themePreference === item && <Check size={14} />}</button>;
            })}</div>}
          </div>
          <div className="language-control"><Globe2 size={15} /><select aria-label={d.common.language} value={locale} onChange={(event) => {
            const nextLocale = event.target.value;
            document.cookie = `haider-locale=${nextLocale};path=/;max-age=31536000;SameSite=Lax`;
            // Locale switches need a full document to update the server-rendered HTML language.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.assign(`/${nextLocale}${simpleOnly ? "/profile" : ""}${window.location.hash}`);
          }}>{locales.map((lang) => <option key={lang} value={lang}>{lang === locale ? lang.toUpperCase() : languageNames[lang]}</option>)}</select><ChevronDown size={12} /></div>
          <button className="icon-button mobile-menu-button" aria-label={mobileOpen ? d.common.closeMenu : d.common.openMenu} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>
      {mobileOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label={d.common.navigation}>{d.nav.map((room, i) => <a key={room.id} href={`#${room.id}`} onClick={() => setMobileOpen(false)}><span className="mono">0{i + 1}</span>{room.label}<ArrowUpRight size={17} /></a>)}</nav>}

      <main id="main">
        <section className="lobby-section" id="lobby" aria-labelledby="hero-title">
          <div className="hero-meta"><span className="mono"><span className="live-dot" />{d.hero.officeLabel}</span><span className="mono hero-edition">{d.hero.edition}</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-greeting"><span className="greeting-line" />{d.hero.greeting}</div>
              <h1 id="hero-title">{d.hero.title[0]}<br /><span>{d.hero.title[1]}</span></h1>
              <p className="hero-description">{d.hero.description}</p>
              <div className="hero-actions"><a className="button button-primary" href="#projects">{d.hero.primaryCta}<ArrowUpRight size={18} /></a><a className="button button-text" href="/Haider_Ali_Resume.pdf" download>{d.common.resume}<Download size={16} /></a></div>
              <div className="hero-profile"><span className="profile-monogram">HA</span><div><strong>{d.hero.status}</strong><span><MapPin size={12} />{d.hero.location}</span></div></div>
            </div>
            <div className="office-stage" aria-label={d.common.sceneLabel}>
              <div className="office-ambient" /><div className="office-grid" />
              <div className={`office-visual ${immersive && sceneReady ? "scene-is-ready" : ""}`}>
                {(!immersive || !sceneReady) && <div className="office-fallback"><OfficeFallback theme={theme} label={d.common.sceneLabel} /></div>}
                {immersive && <OfficeScene theme={theme} activeRoom={activeRoom} reducedMotion={reducedMotion} onSelectRoom={goToRoom} onReady={markSceneReady} onUnavailable={sceneUnavailable} />}
              </div>
              <div className="scene-coordinate coordinate-top mono">01 — 06</div>
              <span className="scene-coordinate coordinate-side mono">HA / STUDIO</span>
              <a className="hotspot hotspot-lab" href="#skills"><span className="hotspot-plus">+</span><span>{d.nav.find((room) => room.id === "skills")?.label}<ArrowUpRight size={12} /></span></a>
              <a className="hotspot hotspot-projects" href="#projects"><span className="hotspot-plus">+</span><span>{d.nav.find((room) => room.id === "projects")?.label}<ArrowUpRight size={12} /></span></a>
              <a className="hotspot hotspot-about" href="#about"><span className="hotspot-plus">+</span><span>{d.nav.find((room) => room.id === "about")?.label}<ArrowUpRight size={12} /></span></a>
              <div className="scene-bottom"><span><span className="small-dot" />{d.common.sceneHint}</span>{!simpleOnly && <button onClick={toggleImmersive} className="view-toggle" aria-pressed={immersive} aria-label={`${d.common.viewMode}: ${immersive ? d.common.immersiveView : d.common.staticView}`}><Box size={13} />{immersive ? d.common.immersiveView : d.common.staticView}<ChevronDown size={12} /></button>}</div>
            </div>
          </div>
          <div className="hero-bottom"><a className="scroll-cue" href="#about"><span><ArrowDown size={15} /></span>{d.hero.scroll}</a><div className="hero-roles">{d.hero.roles.map((role, i) => <span key={role}>{i > 0 && <i />}{role}</span>)}</div></div>
        </section>

        <div className="directory-wrap"><nav className="office-directory" aria-label={d.common.officeMap}>
          <div className="directory-heading"><span className="mono">{d.common.floor}</span><span>{d.common.officeMap}<ArrowDownLeft size={14} /></span></div>
          {d.nav.map((room, i) => {
            const Icon = roomIcons[i];
            return <a href={`#${room.id}`} key={room.id} className={activeRoom === room.id ? "active" : ""}><span className="room-number mono">0{i + 1}</span><Icon size={19} strokeWidth={1.4} /><span>{room.label}<small>{room.subtitle}</small></span><ArrowUpRight className="room-arrow" size={14} /></a>;
          })}
        </nav></div>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div className="section-heading"><div><p className="eyebrow"><span>04</span>{d.projects.eyebrow}</p><h2 id="projects-title">{d.projects.title}</h2></div><p className="section-intro">{d.projects.description}</p></div>
          <button className="featured-project" onClick={() => setSelectedProject(featured)} aria-label={`${d.common.readCaseStudy}: ${featured.title}`}>
            <div className="featured-copy"><span className="featured-eyebrow mono"><span className="live-dot" />{d.common.newWork}<span> / DubiCars</span></span><h3>{featured.title}</h3><p>{featured.description}</p><div className="tag-list">{featured.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><span className="featured-cta">{d.common.readCaseStudy}<span><ArrowUpRight size={18} /></span></span></div><ProjectVisual id={featured.id} featured />
          </button>
          <div className="projects-toolbar"><span className="mono">{d.common.selectedWork}<span className="project-count">{String(d.projects.items.length).padStart(2, "0")}</span></span><div className="project-filters" role="group" aria-label={d.common.filterProjects}>{(["all", "ai", "platform"] as const).map((category) => <button key={category} onClick={() => setFilter(category)} aria-pressed={filter === category} className={filter === category ? "active" : ""}>{d.projects.filters[category]}</button>)}</div></div>
          <div className="project-grid">{visibleProjects.map((project, index) => <button className="project-card" key={project.id} onClick={() => setSelectedProject(project)} aria-label={`${d.common.projectDetails}: ${project.title}`}><div className="project-image"><ProjectVisual id={project.id} /><span className="project-open"><ArrowUpRight size={18} /></span></div><div className="project-card-meta"><span className="mono">{project.eyebrow}</span><span className="mono">{project.year || `0${index + 1}`}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div></button>)}</div>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title">
          <div className="about-visual" aria-hidden="true"><div className="about-grid" /><span className="mono about-coordinate">HA — 01</span><div className="architecture-object"><div className="architecture-frame frame-back" /><div className="architecture-frame frame-front" /><div className="architecture-core"><Code2 size={63} strokeWidth={.8} /></div><span className="architecture-link link-a" /><span className="architecture-link link-b" /></div><div className="about-signature">Haider Ali<span>↗</span></div></div>
          <div className="about-copy"><p className="eyebrow"><span>02</span>{d.about.eyebrow}</p><h2 id="about-title">{d.about.title}</h2>{d.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="about-principles">{d.about.principles.map((principle) => <div key={principle.title}><ArrowUpRight size={17} /><h3>{principle.title}</h3><p>{principle.description}</p></div>)}</div><div className="education"><span className="education-icon"><Layers3 size={18} /></span><div><strong>{d.about.education.degree}</strong><span>{d.about.education.institution} · {d.about.education.period}</span></div></div></div>
        </section>

        <section id="skills" className="skills-section" aria-labelledby="skills-title"><div className="section">
          <div className="section-heading"><div><p className="eyebrow"><span>03</span>{d.skills.eyebrow}</p><h2 id="skills-title">{d.skills.title}</h2></div><p className="section-intro">{d.skills.description}</p></div>
          <div className="skills-grid">{d.skills.categories.map((category, i) => {
            const Icon = [Code2, Layers3, Sparkles, Workflow, Box, GitBranchIcon][i % 6];
            return <article className="skill-group" key={category.title}><div className="skill-heading"><Icon size={21} strokeWidth={1.3} /><span className="mono">0{i + 1}</span></div><h3>{category.title}</h3><div>{category.items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}</div></article>;
          })}</div>
          <div className="experiment"><span className="experiment-icon"><Sparkles size={23} /></span><div><span className="mono">{d.experiment.eyebrow}</span><h3>{d.experiment.title}</h3><p>{d.experiment.description}</p></div><div className="experiment-tags">{d.experiment.tags.map((tag) => <span key={tag}>{tag}<ArrowUpRight size={12} /></span>)}</div></div>
        </div></section>

        <section id="experience" className="section experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow"><span>05</span>{d.experience.eyebrow}</p><h2 id="experience-title">{d.experience.title}</h2></div><a className="button button-outline" href="/Haider_Ali_Resume.pdf" download>{d.common.resume}<Download size={16} /></a></div>
          <div className="experience-list">{d.experience.items.map((experience, i) => <details key={experience.company} className="experience-item" open={i === 0}><summary><span className="experience-number mono">0{i + 1}</span><span className="experience-company"><strong>{experience.company}</strong><span>{experience.role}</span></span><span className="experience-period"><span>{experience.period}</span><small>{experience.location}</small></span><span className="experience-toggle"><ArrowUpRight size={20} /></span></summary><div className="experience-detail"><p>{experience.description}</p><ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></details>)}</div>
          <div className="achievements"><div className="achievements-heading"><p className="eyebrow">{d.achievements.eyebrow}</p><h3>{d.achievements.title}</h3></div>{d.achievements.items.map((achievement) => <article key={achievement.label}><strong>{achievement.value}</strong><h4>{achievement.label}</h4><p>{achievement.description}</p></article>)}</div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="contact-grid" /><div className="contact-content"><p className="eyebrow"><span>06</span>{d.contact.eyebrow}</p><h2 id="contact-title">{d.contact.title}<span className="contact-asterisk" aria-hidden="true">✳</span></h2><p>{d.contact.description}</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${d.contact.email}`}>{d.common.openEmail}<ArrowUpRight size={18} /></a><button className="button button-outline" onClick={copyEmail}>{d.common.copyEmail}<Copy size={15} /></button></div><a className="email-link" href={`mailto:${d.contact.email}`}>{d.contact.email}<ArrowUpRight size={16} /></a></div><div className="contact-bottom"><span><MapPin size={14} />{d.contact.location}</span><div>{d.contact.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /><span className="sr-only"> ({d.common.externalLink})</span></a>)}</div></div></section>
      </main>
      <footer className="site-footer"><a href="#lobby" className="footer-brand"><Brand /><span>© {new Date().getFullYear()} Haider Ali</span></a><span>{d.footer.credit}</span><a href="#lobby">{d.footer.backToLobby}<ArrowUpRight size={14} /></a></footer>
      <div className="reading-progress" aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / d.nav.length) * 100}%` }} /></div>
      <div className={`toast ${toast ? "visible" : ""}`} role="status" aria-live="polite">{toast && <><Check size={16} />{toast}</>}</div>

      <dialog ref={dialogRef} className="project-dialog" aria-labelledby="dialog-title" onClose={() => setSelectedProject(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
        {selectedProject && <div className="dialog-content"><div className="dialog-top"><span className="mono">{selectedProject.featured ? d.common.readCaseStudy : d.common.projectOverview}</span><button className="icon-button" aria-label={d.common.close} onClick={() => setSelectedProject(null)} autoFocus><X size={21} /></button></div><div className="dialog-hero"><p className="eyebrow">{selectedProject.eyebrow}</p><h2 id="dialog-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="tag-list">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          {selectedProject.featured ? <><div className="case-visual"><div className="case-car"><CarOutline /></div><span className="case-icon"><ScanLine size={30} strokeWidth={1} /></span><div className="case-lines"><i /><i /><i /><i /></div></div><div className="case-body"><p className="eyebrow">{d.common.workflow}</p><h3>{d.aiCaseStudy.title}</h3><p>{d.aiCaseStudy.description}</p><div className="case-steps">{d.aiCaseStudy.steps.map((step) => <article key={step.number}><span className="mono">{step.number}</span><h4>{step.title}</h4><p>{step.description}</p></article>)}</div><h3 className="case-capabilities-title">{d.common.capabilities}</h3><ul className="case-capabilities">{d.aiCaseStudy.capabilities.map((capability) => <li key={capability}><Check size={16} /><span>{capability}</span></li>)}</ul><div className="case-outcome"><Sparkles size={23} /><p>{d.aiCaseStudy.outcome}</p></div></div></> : <div className="dialog-project-visual"><ProjectVisual id={selectedProject.id} /></div>}
          <div className="dialog-footer"><button className="button button-text" onClick={() => setSelectedProject(null)}>{d.common.backToProjects}<ArrowRight size={16} /></button>{selectedProject.url && <a className="button button-primary" href={selectedProject.url} target="_blank" rel="noopener noreferrer">{d.common.visitWebsite}<ExternalLink size={16} /><span className="sr-only"> ({d.common.externalLink})</span></a>}</div>
        </div>}
      </dialog>
    </div>
  );
}

function GitBranchIcon({ size = 21, strokeWidth = 1.3 }: { size?: number; strokeWidth?: number }) { return <Workflow size={size} strokeWidth={strokeWidth} />; }
