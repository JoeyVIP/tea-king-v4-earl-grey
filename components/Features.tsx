'use client'
import { useEffect, useRef } from 'react'

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 4C20 4 8 10 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 10 20 4 20 4Z"
          stroke="#CA8A04" strokeWidth="1.5" fill="none"/>
        <path d="M20 12C20 12 13 16 13 22C13 25.866 16.134 29 20 29C23.866 29 27 25.866 27 22C27 16 20 12 20 12Z"
          fill="rgba(202,138,4,0.15)" stroke="#CA8A04" strokeWidth="1"/>
        <circle cx="20" cy="22" r="3" fill="#CA8A04" opacity="0.7"/>
      </svg>
    ),
    title: '層次回甘',
    subtitle: 'Lingering Sweetness',
    desc: '入口即感受柑橘清香，飲後回甘在喉間緩緩蔓延——那是真正好茶才有的韻味，比現泡多一份穩定，少一分等待。',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="14" stroke="#CA8A04" strokeWidth="1.5"/>
        <path d="M14 20H26M20 14V26" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 16L24 24M24 16L16 24" stroke="rgba(202,138,4,0.3)" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="rgba(202,138,4,0.2)" stroke="#CA8A04" strokeWidth="1"/>
      </svg>
    ),
    title: '零糖健康',
    subtitle: 'Zero Sugar',
    desc: '無糖配方，讓你純粹感受茶本身的甘甜，搭配甜點、正餐或獨飲皆宜。享受美好，不必計算代價。',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 32 Q15 18 20 10 Q25 18 30 32" stroke="#CA8A04" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M13 26 Q20 16 27 26" stroke="rgba(202,138,4,0.5)" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M8 32H32" stroke="#CA8A04" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="20" cy="10" r="2" fill="#CA8A04" opacity="0.6"/>
      </svg>
    ),
    title: '不苦澀',
    subtitle: 'Smooth & Clean',
    desc: '精選茶葉，控制茶湯萃取比例，去除多餘苦澀，只留醇和順口的茶底。一瓶在手，隨時都是最好的狀態。',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.feature-card').forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1'
                ;(card as HTMLElement).style.transform = 'translateY(0)'
              }, i * 150)
            })
            entry.target.querySelector('.features-heading')?.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .features {
          background: var(--color-deep-brown);
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .features::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(202,138,4,0.3), transparent);
        }
        .features-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .features-heading {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .features-heading.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .features-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }
        .features-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          color: var(--color-cream);
        }
        .features-title em {
          font-style: italic;
          color: var(--color-gold);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .feature-card {
          padding: 3rem 2.5rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(202,138,4,0.08);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(202,138,4,0.04), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .feature-card:hover::before {
          opacity: 1;
        }
        .feature-card:hover {
          border-color: rgba(202,138,4,0.25);
          transform: translateY(-4px) !important;
        }
        .feature-icon {
          margin-bottom: 1.75rem;
        }
        .feature-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--color-cream);
          margin-bottom: 0.25rem;
        }
        .feature-subtitle {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }
        .feature-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.8;
        }
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1px;
          }
          .feature-card {
            padding: 2.5rem 1.75rem;
          }
        }
      `}</style>

      <section id="features" className="features" ref={sectionRef}>
        <div className="features-inner">
          <div className="features-heading">
            <p className="features-eyebrow">Three Qualities · 三大特色</p>
            <h2 className="features-title">每一口，都是<em>精心選擇</em></h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-subtitle">{f.subtitle}</p>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
