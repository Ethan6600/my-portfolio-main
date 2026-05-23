import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Github, Linkedin, Mail, Instagram, Twitter, Download,
  Code, X, Loader2, ExternalLink, Menu, CheckCircle,
  Globe, Palette, Rocket, ArrowRight, ArrowUpRight, Sun, Moon
} from 'lucide-react';

// ─── DARK MODE CONTEXT ────────────────────────────────────────────────────────

const DarkModeContext = createContext(false);
const useDark = () => useContext(DarkModeContext);

// ─── DATA ────────────────────────────────────────────────────────────────────

const socialLinks = [
  { icon: Github,    url: 'https://github.com',                     name: 'GitHub',    ariaLabel: 'Visit my GitHub profile' },
  { icon: Linkedin,  url: 'https://linkedin.com',                   name: 'LinkedIn',  ariaLabel: 'Connect on LinkedIn' },
  { icon: Instagram, url: 'https://www.instagram.com/st0wneyy024/', name: 'Instagram', ariaLabel: 'Follow on Instagram' },
  { icon: Twitter,   url: 'https://twitter.com',                    name: 'Twitter',   ariaLabel: 'Follow on Twitter' },
];

const webProjects = [
  { id: 1, image: 'images/m.png', title: 'E-Commerce Platform',  tech: 'React + MySQL',    description: 'Full-featured online shopping platform with cart, auth, and admin panel.',   liveUrl: '#', githubUrl: '#' },
  { id: 2, image: 'images/m.png', title: 'Dashboard System',     tech: 'PHP + Tailwind',   description: 'Analytics and management dashboard with real-time data visualization.',      liveUrl: '#', githubUrl: '#' },
  { id: 3, image: 'images/m.png', title: 'Portfolio Website',    tech: 'React + Tailwind', description: 'Modern portfolio showcase with smooth animations and responsive layout.',    liveUrl: '#', githubUrl: '#' },
  { id: 4, image: 'images/m.png', title: 'Booking System',       tech: 'Full-Stack',       description: 'Appointment scheduling application with calendar integration.',              liveUrl: '#', githubUrl: '#' },
  { id: 5, image: 'images/m.png', title: 'CMS Platform',         tech: 'PHP + MySQL',      description: 'Content management system with role-based access control.',                 liveUrl: '#', githubUrl: '#' },
  { id: 6, image: 'images/m.png', title: 'Social App',           tech: 'React + PHP',      description: 'Social networking application with real-time messaging and profiles.',      liveUrl: '#', githubUrl: '#' },
];

const expertiseTags = ['Web Dev', 'UI/UX', 'Full-Stack'];
const expertiseContent = {
  'Web Dev':     { title: 'Modern Web Development',       description: 'Building responsive, high-performance web applications using cutting-edge technologies — with a focus on clean code and optimal user experience.', skills: ['React.js', 'JavaScript', 'TypeScript', 'Next.js'],          emoji: '💻' },
  'UI/UX':       { title: 'UI/UX Design & Development',   description: 'Creating intuitive user interfaces and seamless experiences — from wireframes to production-ready, pixel-perfect components.',                    skills: ['Figma', 'Tailwind CSS', 'Motion Design', 'Prototyping'],    emoji: '🎨' },
  'Full-Stack':  { title: 'Full-Stack Solutions',          description: 'End-to-end development from database design to frontend implementation — building scalable architectures and robust backend systems.',             skills: ['Node.js', 'PHP', 'MySQL', 'REST APIs'],                      emoji: '⚡' },
};
const tools    = ['Figma', 'VS Code', 'Photoshop', 'Illustrator', 'After Effects'];
const techStack = ['React', 'TypeScript', 'Node.js', 'PHP', 'MySQL', 'Tailwind'];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

const useScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setP((window.scrollY / t) * 100); };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
};

const useTypewriter = (text, speed = 45) => {
  const [display, setDisplay] = useState('');
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => { setDisplay(p => p + text[i]); setI(i + 1); }, speed);
      return () => clearTimeout(t);
    }
  }, [i, text, speed]);
  return display;
};

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// ─── DARK MODE TOGGLE BUTTON ──────────────────────────────────────────────────

const DarkToggle = ({ dark, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${dark ? 'bg-indigo-600' : 'bg-gray-200'}`}
  >
    <span className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${dark ? 'translate-x-7 bg-white' : 'translate-x-0 bg-white'}`}>
      {dark
        ? <Moon className="w-3 h-3 text-indigo-600" />
        : <Sun  className="w-3 h-3 text-amber-500"  />
      }
    </span>
  </button>
);

// ─── IMAGE WITH LOADING ───────────────────────────────────────────────────────

const ImageWithLoading = ({ src, alt, className }) => {
  const dark = useDark();
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && !error && <div className={`absolute inset-0 animate-pulse rounded-xl ${dark ? 'bg-gray-700' : 'bg-indigo-50'}`} />}
      {error && (
        <div className={`absolute inset-0 flex items-center justify-center rounded-xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <Code className={`w-8 h-8 ${dark ? 'text-gray-600' : 'text-gray-300'}`} />
        </div>
      )}
      <img src={src} alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setLoaded(true); setError(true); }}
      />
    </div>
  );
};

// ─── TOAST ───────────────────────────────────────────────────────────────────

const Toast = ({ message, onClose }) => {
  const dark = useDark();
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 border shadow-lg rounded-2xl px-5 py-4 text-sm font-medium ${dark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-800'}`} role="alert" aria-live="polite">
      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className={`ml-1 transition-colors ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} aria-label="Close">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

const ProjectCard = ({ project }) => {
  const dark = useDark();
  return (
    <div className={`group border rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className={`aspect-video overflow-hidden ${dark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <ImageWithLoading src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className={`font-semibold mb-1 group-hover:text-indigo-500 transition-colors ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{project.title}</h3>
            <span className={`text-xs font-medium text-indigo-500 px-2.5 py-1 rounded-full ${dark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>{project.tech}</span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a href={project.liveUrl} className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors" aria-label={`Live demo of ${project.title}`}>
              <Globe className="w-3.5 h-3.5 text-white" />
            </a>
            <a href={project.githubUrl} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`} aria-label={`GitHub source of ${project.title}`}>
              <Github className={`w-3.5 h-3.5 ${dark ? 'text-gray-200' : 'text-gray-700'}`} />
            </a>
          </div>
        </div>
        <p className={`text-sm leading-relaxed mt-3 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{project.description}</p>
      </div>
    </div>
  );
};

// ─── HEADER ──────────────────────────────────────────────────────────────────

const Header = ({ dark, onToggleDark }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState('home');
  const progress                = useScrollProgress();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      for (const id of ['home', 'services', 'project', 'contact']) {
        const el = document.getElementById(id);
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; } }
      }
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); setActive(id); };
  const navItems = [{ id: 'home', label: 'Home' }, { id: 'services', label: 'Services' }, { id: 'project', label: 'Projects' }, { id: 'contact', label: 'Contact' }];

  const scrolledBg  = dark ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-white/95 backdrop-blur-md shadow-sm shadow-black/5';
  const transparentBg = dark ? 'bg-transparent' : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? `${scrolledBg} py-3` : `${transparentBg} py-5`}`} role="banner">
      <div className="absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-75" style={{ width: `${progress}%` }} />

      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }} className="flex items-center gap-2.5 group focus:outline-none" aria-label="ST0WNEYY — back to top">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
            <Code className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>ST<span className="text-indigo-500">0</span>WNEYY</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} aria-current={active === id ? 'page' : undefined}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                active === id
                  ? 'bg-indigo-500/10 text-indigo-500'
                  : dark ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >{label}</button>
          ))}
        </div>

        {/* Right side: toggle + hire me */}
        <div className="hidden md:flex items-center gap-3">
          <DarkToggle dark={dark} onToggle={onToggleDark} />
          <button onClick={() => scrollTo('contact')}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            Hire me
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <DarkToggle dark={dark} onToggle={onToggleDark} />
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors focus:outline-none ${dark ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`md:hidden border-t transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'} ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`} id="mobile-menu" role="menu" aria-hidden={!menuOpen}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} role="menuitem"
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active === id
                  ? 'bg-indigo-500/10 text-indigo-500'
                  : dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >{label}</button>
          ))}
          <button onClick={() => scrollTo('contact')} className="mt-2 px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
            Hire me
          </button>
        </div>
      </div>
    </header>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const dark = useDark();
  const [visible, setVisible] = useState(false);
  const [toast,   setToast]   = useState(null);
  const typed = useTypewriter('Building Digital Experiences', 35);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleDownload = () => {
    setToast('Resume downloaded!');
    const a = document.createElement('a'); a.href = '/resume.pdf'; a.download = 'Ethan_Craig_Resume.pdf';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <section id="home" className={`relative pt-20 overflow-hidden transition-colors duration-300 ${dark ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true"
        style={{ backgroundImage: `radial-gradient(circle, ${dark ? '#4f46e5' : '#e0e7ff'} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
      {/* Glow */}
      <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl ${dark ? 'bg-indigo-900' : 'bg-indigo-100'}`} aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-14 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className={`space-y-5 order-2 lg:order-1 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full ${dark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-500 tracking-wide">Available for work</span>
            </div>

            <div className="space-y-2">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] ${dark ? 'text-white' : 'text-gray-900'}`}>
                Ethan <span className="text-indigo-500">Craig</span>
              </h1>
              <div className="flex items-center gap-2 h-8">
                <span className={`text-lg md:text-xl font-light ${dark ? 'text-gray-400' : 'text-gray-400'}`}>{typed}</span>
                <span className="w-0.5 h-5 bg-indigo-500 animate-pulse rounded-full" />
              </div>
            </div>

            <p className={`text-base leading-relaxed max-w-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              I craft <span className={`font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>high-performance web applications</span> and{' '}
              <span className={`font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>immersive digital experiences</span> using modern technologies.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <button onClick={handleDownload}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <Download className="w-4 h-4" /> Download Resume
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`inline-flex items-center gap-2.5 px-6 py-3 border text-sm font-semibold rounded-xl active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${dark ? 'border-gray-700 text-gray-300 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10' : 'border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'}`}>
                Get In Touch <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className={`text-xs font-semibold tracking-widest uppercase ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map(t => (
                  <span key={t} className={`px-2.5 py-1 border rounded-lg text-xs font-medium transition-colors cursor-default ${dark ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400' : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50'}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${dark ? 'border-gray-700 text-gray-500 hover:text-indigo-400 hover:border-indigo-500 hover:bg-indigo-500/10' : 'border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50'}`}>
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — profile card */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative max-w-sm mx-auto">
              <div className={`border rounded-3xl shadow-xl p-6 ${dark ? 'bg-gray-900 border-gray-800 shadow-black/40' : 'bg-white border-gray-100 shadow-indigo-500/5'}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0 ${dark ? 'border-indigo-500/40' : 'border-indigo-100'}`}>
                    <ImageWithLoading src="images/profile.jpg" alt="Ethan Craig" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Ethan Craig</h2>
                    <p className="text-sm text-indigo-500 font-medium">Full-Stack Developer</p>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs leading-5 mb-5">
                  <p><span className="text-indigo-400">const</span> <span className="text-white">developer</span> <span className="text-indigo-400">=</span> {'{'}</p>
                  <p className="ml-4"><span className="text-purple-400">expertise</span><span className="text-gray-500">:</span> <span className="text-emerald-400">["React", "Node", "UI/UX"]</span><span className="text-gray-500">,</span></p>
                  <p className="ml-4"><span className="text-purple-400">experience</span><span className="text-gray-500">:</span> <span className="text-yellow-400">"3+ years"</span><span className="text-gray-500">,</span></p>
                  <p className="ml-4"><span className="text-purple-400">available</span><span className="text-gray-500">:</span> <span className="text-emerald-400 animate-pulse">true</span></p>
                  <p>{'}'}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[{ v: '6+', l: 'Projects' }, { v: '100%', l: 'Satisfaction' }, { v: '3+', l: 'Years' }].map(s => (
                    <div key={s.l} className={`text-center rounded-xl py-3 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{s.v}</div>
                      <div className={`text-xs mt-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Open to work ✦
              </div>
              <div className={`absolute -bottom-4 -left-4 border shadow-lg text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 ${dark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-white border-gray-100 text-gray-700'}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> React · PHP · MySQL
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
};

// ─── WORK EXPERTISE ───────────────────────────────────────────────────────────

const WorkExpertise = () => {
  const dark = useDark();
  const [activeTag, setActiveTag] = useState('Web Dev');
  const [ref, inView] = useInView();

  return (
    <section id="services" ref={ref} className={`py-14 md:py-20 transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6">

        <div className={`max-w-2xl mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs font-bold text-indigo-500 tracking-widest uppercase mb-2">Services</p>
          <h2 className={`text-3xl md:text-4xl font-bold leading-tight mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>My Expertise</h2>
          <p className={`text-base leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Specialized solutions tailored to bring your digital vision to life.</p>
        </div>

        <div className={`flex gap-2 flex-wrap mb-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} role="tablist">
          {expertiseTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} role="tab" aria-selected={activeTag === tag}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTag === tag
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                  : dark ? 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >{expertiseContent[tag].emoji} {tag}</button>
          ))}
        </div>

        <div className={`border rounded-2xl p-6 md:p-8 mb-8 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-4xl mb-3" aria-hidden="true">{expertiseContent[activeTag].emoji}</div>
              <h3 className={`text-xl md:text-2xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>{expertiseContent[activeTag].title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{expertiseContent[activeTag].description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {expertiseContent[activeTag].skills.map(skill => (
                <div key={skill} className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-default ${dark ? 'bg-gray-700 border-gray-600 hover:border-indigo-500 hover:bg-indigo-500/10' : 'bg-gray-50 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50'}`}>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-600 transition-colors shrink-0" />
                  <span className={`font-semibold text-sm transition-colors ${dark ? 'text-gray-300 group-hover:text-indigo-400' : 'text-gray-700 group-hover:text-indigo-700'}`}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-indigo-400" />
            <h3 className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Design & Development Tools</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {tools.map(tool => (
              <div key={tool} className={`border rounded-xl px-4 py-3 text-center text-sm font-medium transition-all duration-200 cursor-default ${dark ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400' : 'bg-white border-gray-100 text-gray-600 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50'}`}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

const WebDevelopment = () => {
  const dark = useDark();
  const [ref, inView] = useInView();

  return (
    <section id="project" ref={ref} className={`py-14 md:py-20 transition-colors duration-300 ${dark ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6">

        <div className={`max-w-2xl mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs font-bold text-indigo-500 tracking-widest uppercase mb-2">Portfolio</p>
          <h2 className={`text-3xl md:text-4xl font-bold leading-tight mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h2>
          <p className={`text-base leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>A showcase of my recent work in web development and full-stack solutions.</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {webProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>

        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button className={`inline-flex items-center gap-2 px-6 py-3 border text-sm font-semibold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${dark ? 'border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10' : 'border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'}`}>
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER / CONTACT ─────────────────────────────────────────────────────────

const Footer = () => {
  const dark = useDark();
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null);
  const [ref, inView] = useInView();

  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setToast("Message sent! I'll get back to you soon."); setEmail(''); setSubject(''); setMessage(''); setLoading(false); }, 1500);
  };

  const inputCls = `w-full px-4 py-2.5 border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all ${dark ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-600 focus:ring-indigo-500/20' : 'bg-gray-50 border-gray-200 text-gray-900'}`;
  const labelCls = `block text-xs font-semibold uppercase tracking-wide mb-1.5 ${dark ? 'text-gray-500' : 'text-gray-500'}`;

  return (
    <footer id="contact" ref={ref} className={`border-t pt-14 md:pt-20 pb-10 transition-colors duration-300 ${dark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
      <div className="container mx-auto px-4 sm:px-6">

        <div className={`max-w-2xl mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs font-bold text-indigo-500 tracking-widest uppercase mb-2">Contact</p>
          <h2 className={`text-3xl md:text-4xl font-bold leading-tight mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Let's Build Together</h2>
          <p className={`text-base leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Have a project in mind? Let's collaborate and create something amazing.</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 mb-10 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <form onSubmit={handleSubmit} className={`space-y-3 border rounded-2xl p-6 ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={labelCls}>Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className={inputCls} />
              </div>
              <div>
                <label htmlFor="subject" className={labelCls}>Subject</label>
                <input id="subject" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Project inquiry" required className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelCls}>Message</label>
              <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about your project..." rows={5} required className={`${inputCls} resize-none`} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Rocket className="w-4 h-4" /> Send Message</>}
            </button>
          </form>

          <div className="space-y-4">
            <h3 className={`text-base font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>Get in touch</h3>
            <div className="space-y-2">
              {[
                { icon: Mail,      label: 'Email',     value: 'ethancraig005@gmail.com',    href: 'mailto:ethancraig005@gmail.com' },
                { icon: Github,    label: 'GitHub',    value: 'github.com/st0wneyy',        href: 'https://github.com' },
                { icon: Linkedin,  label: 'LinkedIn',  value: 'linkedin.com/in/ethancraig', href: 'https://linkedin.com' },
                { icon: Instagram, label: 'Instagram', value: '@st0wneyy024',               href: 'https://instagram.com' },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 border rounded-xl transition-all group ${dark ? 'bg-gray-800 border-gray-700 hover:border-indigo-500 hover:bg-indigo-500/10' : 'bg-white border-gray-100 hover:border-indigo-200 hover:bg-indigo-50'}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${dark ? 'bg-gray-700 group-hover:bg-indigo-500/20' : 'bg-indigo-50 group-hover:bg-indigo-100'}`}>
                    <item.icon className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wide ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
                    <p className={`text-sm font-medium transition-colors group-hover:text-indigo-500 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{item.value}</p>
                  </div>
                  <ExternalLink className={`w-3.5 h-3.5 ml-auto transition-colors group-hover:text-indigo-400 ${dark ? 'text-gray-600' : 'text-gray-300'}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
          <a href="#home" onClick={e => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-2 group focus:outline-none">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
              <Code className="w-3.5 h-3.5 text-white" />
            </div>
            <span className={`font-bold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>ST<span className="text-indigo-500">0</span>WNEYY</span>
          </a>
          <div className="flex gap-2">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${dark ? 'border-gray-700 text-gray-500 hover:text-indigo-400 hover:border-indigo-500' : 'border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-200'}`}>
                <link.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
          <p className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>© {new Date().getFullYear()} ST0WNEYY. All rights reserved.</p>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </footer>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [ready, setReady] = useState(false);
  const [dark,  setDark]  = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; } catch { return false; }
  });

  useEffect(() => { setTimeout(() => setReady(true), 500); }, []);

  const toggleDark = () => {
    setDark(d => {
      const next = !d;
      try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
      return next;
    });
  };

  if (!ready) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className={`text-xs font-semibold tracking-widest uppercase ${dark ? 'text-gray-600' : 'text-gray-400'}`}>Loading</p>
        </div>
      </div>
    );
  }

  return (
    <DarkModeContext.Provider value={dark}>
      <div className={`min-h-screen antialiased transition-colors duration-300 ${dark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`} lang="en">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium z-50">
          Skip to main content
        </a>
        <Header dark={dark} onToggleDark={toggleDark} />
        <main id="main">
          <Hero />
          <WorkExpertise />
          <WebDevelopment />
          <Footer />
        </main>
      </div>
    </DarkModeContext.Provider>
  );
}