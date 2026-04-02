'use client'
import { useEffect, useRef } from 'react'

export default function TeaLegend() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.legend-animate').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add('visible')
              }, i * 200)
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

  return (
    <>
      <style>{`
        .legend {
          background: var(--color-ivory);
          padding: 7rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .legend::before {
          content: 'EARL GREY';
          position: absolute;
          top: -0.2em;
          right: -0.05em;
          font-family: var(--font-display);
          font-size: clamp(6rem, 14vw, 14rem);
          font-weight: 700;
          color: rgba(44, 26, 14, 0.04);
          line-height: 1;
          pointer-events: none;
          white-space: nowrap;
        }
        .legend-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .legend-visual {
          position: relative;
        }
        .legend-circle-outer {
          width: 100%;
          aspect-ratio: 1;
          max-width: 420px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2C1A0E 0%, #44403C 50%, #1C1917 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .legend-circle-outer::before {
          content: '';
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 1px solid rgba(202,138,4,0.2);
        }
        .legend-circle-outer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 35% 35%, rgba(202,138,4,0.12), transparent 60%);
        }
        .legend-circle-text {
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 2rem;
        }
        .legend-year {
          font-family: var(--font-display);
          font-size: clamp(4rem, 8vw, 7rem);
          font-weight: 300;
          color: rgba(202,138,4,0.5);
          line-height: 1;
          display: block;
        }
        .legend-year-label {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(202,138,4,0.6);
          display: block;
          margin-top: 0.25rem;
        }
        .legend-circle-name {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.5vw, 1.75rem);
          color: var(--color-cream);
          margin-top: 1rem;
          font-weight: 400;
        }
        .legend-circle-en {
          font-family: var(--font-body);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: rgba(250, 250, 249, 0.5);
          text-transform: uppercase;
          margin-top: 0.25rem;
          display: block;
        }
        .legend-content {
          color: #2C1A0E;
        }
        .legend-animate {
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .legend-animate.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .legend-visual.legend-animate {
          transform: translateX(-20px);
        }
        .legend-visual.legend-animate.visible {
          transform: translateX(0);
        }
        .legend-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-amber);
          margin-bottom: 1.25rem;
        }
        .legend-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 400;
          color: var(--color-warm-brown);
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        .legend-title em {
          font-style: italic;
          color: var(--color-amber);
        }
        .legend-divider {
          width: 48px;
          height: 2px;
          background: var(--color-amber);
          margin-bottom: 1.75rem;
          opacity: 0.5;
        }
        .legend-text {
          color: #44403C;
          font-size: 0.9rem;
          line-height: 1.9;
          margin-bottom: 1.25rem;
        }
        .legend-quote {
          margin-top: 2rem;
          padding: 1.5rem 2rem;
          border-left: 2px solid var(--color-amber);
          background: rgba(180,83,9,0.05);
        }
        .legend-quote-text {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-style: italic;
          color: var(--color-warm-brown);
          line-height: 1.6;
        }
        .legend-quote-author {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-amber);
          margin-top: 0.75rem;
        }
        @media (max-width: 768px) {
          .legend-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .legend-circle-outer {
            max-width: 280px;
            margin: 0 auto;
          }
          .legend-animate {
            transform: translateY(20px);
          }
          .legend-visual.legend-animate {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <section id="legend" className="legend" ref={sectionRef}>
        <div className="legend-inner">
          <div className="legend-visual legend-animate">
            <div className="legend-circle-outer">
              <div className="legend-circle-text">
                <span className="legend-year">19c</span>
                <span className="legend-year-label">19th Century</span>
                <p className="legend-circle-name">格雷伯爵</p>
                <span className="legend-circle-en">Earl Grey</span>
              </div>
            </div>
          </div>

          <div className="legend-content">
            <p className="legend-eyebrow legend-animate">Tea Legend · 好茶典故</p>
            <h2 className="legend-title legend-animate">
              一位伯爵的<em>偏愛</em>，<br />成就一款經典
            </h2>
            <div className="legend-divider legend-animate" />
            <p className="legend-text legend-animate">
              19 世紀英國首相查爾斯·格雷伯爵，因收到一批以佛手柑調香的特製茶葉而傾心不已。
              這種柑橘清香與紅茶茶底的融合，打破了當時茶飲的單調框架。
            </p>
            <p className="legend-text legend-animate">
              格雷伯爵將此配方廣為分享，佛手柑的清新花香從此成了優雅午茶的代名詞。
              時至今日，伯爵紅茶仍是全球最受喜愛的調味紅茶之一。
            </p>
            <div className="legend-quote legend-animate">
              <p className="legend-quote-text">
                「茶裡王V4 以當代工藝，重新詮釋這份百年偏愛——
                讓每一瓶都留住那柑橘與紅茶相遇的瞬間。」
              </p>
              <p className="legend-quote-author">茶裡王 · 品牌理念</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
