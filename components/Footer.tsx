export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: var(--color-obsidian);
          padding: 4rem 2rem 2rem;
          border-top: 1px solid rgba(202,138,4,0.12);
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 2rem;
        }
        .footer-brand-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-cream);
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
        }
        .footer-brand-name span {
          color: var(--color-gold);
        }
        .footer-tagline {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }
        .footer-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 320px;
        }
        .footer-col-title {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1.25rem;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-links a {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
          letter-spacing: 0.02em;
        }
        .footer-links a:hover {
          color: var(--color-gold);
        }
        .footer-contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          margin-bottom: 0.75rem;
        }
        .footer-contact-label {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(202,138,4,0.6);
        }
        .footer-contact-val {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-copy {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.05em;
        }
        .footer-note {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.03em;
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <p className="footer-brand-name">茶裡王<span>V4</span></p>
              <p className="footer-tagline">「回甘，就像現泡」</p>
              <p className="footer-desc">
                茶裡王V4 伯爵紅茶，以百年英式茶文化為根，
                用現代工藝封存那一口柑橘與紅茶交融的美好。
                無糖、不苦澀，每一瓶都是對好茶的承諾。
              </p>
            </div>

            <div>
              <p className="footer-col-title">產品</p>
              <ul className="footer-links">
                {[
                  ['#features', '產品特色'],
                  ['#legend', '好茶典故'],
                  ['#afternoon', '午茶情境'],
                  ['#purchase', '立即購買'],
                ].map(([href, label]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer-col-title">聯絡</p>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Email</span>
                <span className="footer-contact-val">hello@teakingv4.com</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">客服時間</span>
                <span className="footer-contact-val">週一至週五 09:00–18:00</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">LINE</span>
                <span className="footer-contact-val">@teakingv4</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © <span id="footer-year" suppressHydrationWarning></span> 茶裡王V4 · 版權所有
            </p>
            <p className="footer-note">Photos · Unsplash · Earl Grey Tea</p>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `document.getElementById('footer-year').textContent = new Date().getFullYear();`
          }}
        />
      </footer>
    </>
  )
}
