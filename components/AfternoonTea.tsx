'use client'
import { useEffect, useRef } from 'react'

export default function AfternoonTea() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.afternoon-animate').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('visible'), i * 180)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scenes = [
    { time: '13:30', desc: '陽光斜落的窗台旁，把冰涼的茶瓶輕靠在臉頰上，涼意先到，香氣隨後。' },
    { time: '15:00', desc: '搭配一塊剛出爐的司康，抹上濃稠的德文郡奶油——伯爵紅茶天生為午茶而生。' },
    { time: '16:45', desc: '工作告一段落。沒時間泡茶不是藉口，茶裡王早就備好那一口回甘等著你。' },
  ]

  return (
    <>
      <style>{`
        .afternoon {
          background: linear-gradient(160deg, #2C1A0E 0%, #1C1917 50%, #0D0906 100%);
          padding: 7rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .afternoon::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(202,138,4,0.07), transparent),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(180,83,9,0.08), transparent);
        }
        .afternoon-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        .afternoon-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .afternoon-animate {
          opacity: 0;
          transform: translateY(24px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .afternoon-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .afternoon-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1.25rem;
        }
        .afternoon-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.5vw, 3.25rem);
          font-weight: 400;
          color: var(--color-cream);
          line-height: 1.25;
        }
        .afternoon-title em {
          font-style: italic;
          color: var(--color-gold);
        }
        .afternoon-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-top: 1rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .afternoon-scenes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .scene-card {
          padding: 2.5rem 2rem;
          border: 1px solid rgba(202,138,4,0.12);
          position: relative;
          transition: border-color 0.4s ease;
        }
        .scene-card:hover {
          border-color: rgba(202,138,4,0.3);
        }
        .scene-time {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 300;
          color: rgba(202,138,4,0.25);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .scene-desc {
          font-size: 0.875rem;
          color: var(--color-text-light);
          line-height: 1.85;
        }
        .scene-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: var(--color-gold);
          transition: width 0.5s ease;
        }
        .scene-card:hover .scene-line {
          width: 100%;
        }

        /* Banner quote */
        .afternoon-banner {
          text-align: center;
          padding: 3.5rem 2rem;
          border-top: 1px solid rgba(202,138,4,0.15);
          border-bottom: 1px solid rgba(202,138,4,0.15);
        }
        .afternoon-banner-quote {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3vw, 2.25rem);
          font-style: italic;
          font-weight: 300;
          color: var(--color-cream);
          line-height: 1.5;
          max-width: 700px;
          margin: 0 auto;
        }
        .afternoon-banner-quote span {
          color: var(--color-gold);
        }

        @media (max-width: 768px) {
          .afternoon-scenes {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>

      <section id="afternoon" className="afternoon" ref={sectionRef}>
        <div className="afternoon-inner">
          <div className="afternoon-header">
            <p className="afternoon-eyebrow afternoon-animate">Afternoon Tea · 午茶時光</p>
            <h2 className="afternoon-title afternoon-animate">
              陽光和煦的午後，<br />
              <em>最適合來一瓶</em>
            </h2>
            <p className="afternoon-subtitle afternoon-animate">
              無論是搭配甜點、工作空檔，還是窗邊獨坐——
              茶裡王V4 伯爵紅茶，讓每個當下都值得細品。
            </p>
          </div>

          <div className="afternoon-scenes">
            {scenes.map((s, i) => (
              <div className="scene-card afternoon-animate" key={i}>
                <div className="scene-time">{s.time}</div>
                <p className="scene-desc">{s.desc}</p>
                <div className="scene-line" />
              </div>
            ))}
          </div>

          <div className="afternoon-banner afternoon-animate">
            <p className="afternoon-banner-quote">
              「陽光和煦的午後，茶裡王無糖伯爵紅茶搭配甜點的午茶饗宴，
              <span>是一種剛剛好的享受</span>。」
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
