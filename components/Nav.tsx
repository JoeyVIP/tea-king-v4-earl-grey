'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: '產品特色', href: '#features' },
    { label: '好茶典故', href: '#legend' },
    { label: '午茶時光', href: '#afternoon' },
    { label: '立即購買', href: '#purchase' },
  ]

  return (
    <>
      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav.scrolled {
          background: rgba(13, 9, 6, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.875rem 2rem;
          border-bottom: 1px solid rgba(202, 138, 4, 0.15);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--color-cream);
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-logo span {
          color: var(--color-gold);
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-light);
          text-decoration: none;
          transition: color 0.3s ease;
          white-space: nowrap;
        }
        .nav-links a:hover {
          color: var(--color-gold);
        }
        .nav-cta {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-obsidian) !important;
          background: var(--color-gold);
          padding: 0.5rem 1.25rem;
          border-radius: 1px;
          transition: background 0.3s ease !important;
        }
        .nav-cta:hover {
          background: var(--color-gold-light) !important;
          color: var(--color-obsidian) !important;
        }
        .nav-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .nav-burger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--color-cream);
          transition: all 0.3s ease;
        }
        .nav-burger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .nav-burger.open span:nth-child(2) {
          opacity: 0;
        }
        .nav-burger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }
        .nav-mobile {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 9, 6, 0.97);
          z-index: 99;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }
        .nav-mobile.open {
          display: flex;
        }
        .nav-mobile a {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 400;
          color: var(--color-cream);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }
        .nav-mobile a:hover {
          color: var(--color-gold);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">茶裡王<span>V4</span></a>
        <ul className="nav-links">
          {links.slice(0, 3).map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
          <li><a href="#purchase" className="nav-cta">立即購買</a></li>
        </ul>
        <button
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="開啟選單"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
