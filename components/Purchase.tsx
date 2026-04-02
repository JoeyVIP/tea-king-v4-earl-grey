'use client'
import { useState, useEffect, useRef } from 'react'

export default function Purchase() {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const pricePerBottle = 29
  const total = (pricePerBottle * qty).toFixed(0)

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.purchase-animate').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('visible'), i * 150)
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
        .purchase {
          background: var(--color-ivory);
          padding: 7rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .purchase::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,83,9,0.3), transparent);
        }
        .purchase-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .purchase-header {
          text-align: center;
          margin-bottom: 4.5rem;
        }
        .purchase-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .purchase-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .purchase-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-amber);
          margin-bottom: 1rem;
        }
        .purchase-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          color: var(--color-warm-brown);
          margin-bottom: 0.5rem;
        }
        .purchase-title em {
          font-style: italic;
          color: var(--color-amber);
        }

        .purchase-card {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 0;
          background: var(--color-deep-brown);
          overflow: hidden;
        }
        .purchase-visual {
          background: linear-gradient(160deg, #2C1A0E, #1C1917);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3.5rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .purchase-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(202,138,4,0.12), transparent 60%);
        }
        .purchase-bottle-wrap {
          position: relative;
          z-index: 1;
          animation: floatBottle 4s ease-in-out infinite;
        }
        @keyframes floatBottle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .purchase-form {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;
        }
        .product-name {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--color-cream);
        }
        .product-sub {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-top: 0.2rem;
        }
        .product-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.75;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1.25rem 0;
        }
        .product-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .price-currency {
          font-size: 1rem;
          color: var(--color-gold);
          font-weight: 300;
        }
        .price-amount {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--color-cream);
          line-height: 1;
        }
        .price-unit {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }
        .qty-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
        }
        .qty-row {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .qty-btn {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(202,138,4,0.2);
          color: var(--color-cream);
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .qty-btn:hover {
          background: rgba(202,138,4,0.15);
          border-color: rgba(202,138,4,0.5);
        }
        .qty-val {
          width: 60px;
          height: 44px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(202,138,4,0.2);
          border-left: none;
          border-right: none;
          color: var(--color-cream);
          font-family: var(--font-display);
          font-size: 1.1rem;
          text-align: center;
        }
        .total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .total-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .total-amount {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--color-gold);
        }
        .cart-btn {
          width: 100%;
          padding: 1rem 2rem;
          background: var(--color-gold);
          border: none;
          color: var(--color-obsidian);
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .cart-btn:hover {
          background: #D97706;
          transform: translateY(-1px);
        }
        .cart-btn.added {
          background: #15803D;
          color: white;
        }
        .specs {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }
        .spec-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-gold);
          opacity: 0.6;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .purchase-card {
            grid-template-columns: 1fr;
          }
          .purchase-visual {
            padding: 3rem 2rem;
            min-height: 280px;
          }
          .purchase-form {
            padding: 2.5rem 1.75rem;
          }
        }
      `}</style>

      <section id="purchase" className="purchase" ref={sectionRef}>
        <div className="purchase-inner">
          <div className="purchase-header">
            <p className="purchase-eyebrow purchase-animate">Order Now · 立即選購</p>
            <h2 className="purchase-title purchase-animate">
              把<em>回甘</em>帶回家
            </h2>
          </div>

          <div className="purchase-card purchase-animate">
            <div className="purchase-visual">
              <div className="purchase-bottle-wrap">
                <svg width="140" height="340" viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="茶裡王V4 伯爵紅茶瓶身">
                  <rect x="35" y="8" width="30" height="16" rx="2" fill="#CA8A04" opacity="0.95"/>
                  <rect x="38" y="4" width="24" height="8" rx="1" fill="#D97706"/>
                  <path d="M38 24 Q32 36 30 52 L70 52 Q68 36 62 24 Z" fill="rgba(180,83,9,0.7)"/>
                  <path d="M30 52 Q18 68 16 100 L16 220 Q16 240 28 248 L72 248 Q84 240 84 220 L84 100 Q82 68 70 52 Z"
                    fill="rgba(120, 53, 15, 0.4)" stroke="rgba(202,138,4,0.5)" strokeWidth="1.5"/>
                  <path d="M18 120 Q18 68 30 58 L70 58 Q82 68 82 120 L82 220 Q82 238 70 246 L30 246 Q18 238 18 220 Z"
                    fill="rgba(180, 83, 9, 0.8)"/>
                  <path d="M24 80 Q26 140 24 200" stroke="rgba(253,248,240,0.2)" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="22" y="120" width="56" height="80" rx="3" fill="rgba(13,9,6,0.6)"/>
                  <text x="50" y="145" textAnchor="middle" fill="#CA8A04" fontSize="7" fontFamily="serif" fontWeight="500" letterSpacing="1">茶裡王</text>
                  <text x="50" y="160" textAnchor="middle" fill="#FDF8F0" fontSize="12" fontFamily="serif" fontWeight="300" letterSpacing="1">V4</text>
                  <text x="50" y="174" textAnchor="middle" fill="rgba(253,248,240,0.7)" fontSize="5.5" fontFamily="sans-serif" letterSpacing="2">EARL GREY</text>
                  <rect x="28" y="181" width="44" height="0.8" fill="rgba(202,138,4,0.6)"/>
                  <text x="50" y="193" textAnchor="middle" fill="rgba(202,138,4,0.9)" fontSize="5" fontFamily="sans-serif">伯爵紅茶・無糖</text>
                  <text x="50" y="206" textAnchor="middle" fill="rgba(253,248,240,0.4)" fontSize="4" fontFamily="sans-serif">580mL</text>
                </svg>
              </div>
            </div>

            <div className="purchase-form">
              <div>
                <h3 className="product-name">茶裡王V4 伯爵紅茶</h3>
                <p className="product-sub">Earl Grey Tea · 580mL · 無糖</p>
              </div>

              <p className="product-desc">
                精選錫蘭紅茶基底，加入天然佛手柑香料。無添加砂糖，
                茶湯清澈琥珀色，入口回甘，尾韻帶柑橘淡雅清香。
              </p>

              <div>
                <div className="product-price-row">
                  <span className="price-currency">NT$</span>
                  <span className="price-amount">{pricePerBottle}</span>
                  <span className="price-unit">/ 瓶</span>
                </div>
              </div>

              <div>
                <p className="qty-label">數量</p>
                <div className="qty-row">
                  <button
                    className="qty-btn"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    aria-label="減少數量"
                  >−</button>
                  <input
                    className="qty-val"
                    type="number"
                    value={qty}
                    min={1}
                    max={99}
                    readOnly
                    aria-label="購買數量"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => setQty(q => Math.min(99, q + 1))}
                    aria-label="增加數量"
                  >+</button>
                </div>
              </div>

              <div className="total-row">
                <span className="total-label">合計</span>
                <span className="total-amount">NT$ {total}</span>
              </div>

              <button
                className={`cart-btn${added ? ' added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ 已加入購物車' : '加入購物車'}
              </button>

              <div className="specs">
                {['580mL', '無糖', '無防腐劑', '冷藏更佳'].map(s => (
                  <div className="spec-item" key={s}>
                    <div className="spec-dot" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
