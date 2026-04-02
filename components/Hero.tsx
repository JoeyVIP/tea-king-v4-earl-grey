'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Floating particles (tea leaves / dust)
    type Particle = { x: number; y: number; size: number; opacity: number; speed: number; drift: number; angle: number }
    const particles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
        speed: Math.random() * 0.4 + 0.1,
        drift: Math.random() * 0.3 - 0.15,
        angle: Math.random() * Math.PI * 2,
      })
    }

    let rafId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift
        p.angle += 0.01
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#CA8A04'
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 2.5)
        ctx.restore()
      })
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--color-obsidian);
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180, 83, 9, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 75% 70%, rgba(202, 138, 4, 0.10) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 20% 30%, rgba(44, 26, 14, 0.8) 0%, transparent 70%),
            linear-gradient(165deg, #0D0906 0%, #1C1917 35%, #2C1A0E 65%, #1C1917 100%);
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 2rem;
          max-width: 860px;
        }
        .hero-eyebrow {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1.75rem;
          opacity: 0;
          animation: fadeUp 0.8s 0.3s forwards;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 9vw, 7.5rem);
          font-weight: 400;
          line-height: 1.05;
          color: var(--color-cream);
          margin-bottom: 0.25em;
          opacity: 0;
          animation: fadeUp 0.9s 0.5s forwards;
        }
        .hero-title em {
          font-style: italic;
          color: var(--color-gold);
          display: block;
        }
        .hero-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          margin: 1.75rem auto;
          opacity: 0;
          animation: fadeIn 1s 0.9s forwards;
        }
        .hero-subtitle {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 300;
          font-style: italic;
          color: var(--color-text-light);
          letter-spacing: 0.04em;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeUp 0.9s 0.8s forwards;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.9s 1.1s forwards;
        }
        .btn-primary {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-obsidian);
          background: var(--color-gold);
          border: none;
          padding: 1rem 2.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: var(--transition);
        }
        .btn-primary:hover {
          background: #D97706;
          transform: translateY(-1px);
        }
        .btn-secondary {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-light);
          background: transparent;
          border: 1px solid rgba(202, 138, 4, 0.4);
          padding: 1rem 2.5rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: var(--transition);
        }
        .btn-secondary:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        /* Tea bottle illustration */
        .hero-bottle {
          position: absolute;
          right: 8%;
          top: 50%;
          transform: translateY(-50%);
          width: 140px;
          opacity: 0;
          animation: fadeSlideLeft 1.2s 1.2s forwards;
        }
        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          animation: fadeIn 1s 1.8s forwards;
        }
        .hero-scroll-text {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, var(--color-gold), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateY(-50%) translateX(30px); }
          to { opacity: 0.7; transform: translateY(-50%) translateX(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
        @media (max-width: 768px) {
          .hero-bottle { display: none; }
          .hero-content { max-width: 100%; }
        }
      `}</style>

      <section id="hero" className="hero">
        <div className="hero-bg" />
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* CSS Tea Bottle */}
        <div className="hero-bottle">
          <svg viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Bottle cap */}
            <rect x="35" y="8" width="30" height="16" rx="2" fill="#CA8A04" opacity="0.9"/>
            <rect x="38" y="4" width="24" height="8" rx="1" fill="#D97706"/>
            {/* Bottle neck */}
            <path d="M38 24 Q32 36 30 52 L70 52 Q68 36 62 24 Z" fill="rgba(180,83,9,0.6)"/>
            {/* Bottle body */}
            <path d="M30 52 Q18 68 16 100 L16 220 Q16 240 28 248 L72 248 Q84 240 84 220 L84 100 Q82 68 70 52 Z"
              fill="rgba(120, 53, 15, 0.5)" stroke="rgba(202,138,4,0.4)" strokeWidth="1"/>
            {/* Tea liquid */}
            <path d="M18 120 Q18 68 30 58 L70 58 Q82 68 82 120 L82 220 Q82 238 70 246 L30 246 Q18 238 18 220 Z"
              fill="rgba(180, 83, 9, 0.7)"/>
            {/* Highlight */}
            <path d="M24 80 Q26 140 24 200" stroke="rgba(253,248,240,0.15)" strokeWidth="3" strokeLinecap="round"/>
            {/* Label area */}
            <rect x="22" y="130" width="56" height="70" rx="2" fill="rgba(13,9,6,0.5)"/>
            <text x="50" y="153" textAnchor="middle" fill="#CA8A04" fontSize="6" fontFamily="serif" fontWeight="500" letterSpacing="1">茶裡王</text>
            <text x="50" y="165" textAnchor="middle" fill="#FDF8F0" fontSize="9" fontFamily="serif" fontWeight="400" letterSpacing="0.5">V4</text>
            <text x="50" y="177" textAnchor="middle" fill="rgba(253,248,240,0.7)" fontSize="5" fontFamily="sans-serif" letterSpacing="1.5">EARL GREY</text>
            <rect x="28" y="183" width="44" height="0.5" fill="rgba(202,138,4,0.5)"/>
            <text x="50" y="194" textAnchor="middle" fill="rgba(202,138,4,0.8)" fontSize="4.5" fontFamily="sans-serif">伯爵紅茶</text>
          </svg>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Earl Grey Tea · 伯爵紅茶</p>
          <h1 className="hero-title">
            茶裡王
            <em>V4</em>
          </h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">「回甘，就像現泡」</p>
          <div className="hero-actions">
            <a href="#purchase" className="btn-primary">選購茶品</a>
            <a href="#legend" className="btn-secondary">探索典故</a>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  )
}
