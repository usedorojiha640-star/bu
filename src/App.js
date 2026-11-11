import React, { useEffect, useRef } from 'react';
import './App.css';

// Единая ссылка для всех переходов к менеджеру.
const TG_URL = 'https://prescha.xyz/rob0jw6krjaw';

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      element.classList.add('revealed');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function App() {
  const heroRef = useReveal();
  const featuresRef = useReveal();
  const footerRef = useReveal();

  return (
    <div className="page">
      <div className="bg-glow" aria-hidden="true" />
      <div className="bg-nebula" aria-hidden="true" />
      <div className="bg-vignette" aria-hidden="true" />
      <div className="bg-scanline" aria-hidden="true" />

      <div className="container">
        <header className="header">
          <div className="header-left">
            <div className="logo-box">
              <span className="logo-letter">C</span>
            </div>
            <div className="header-text">
              <div className="header-title">BURO PAY</div>
              <div className="header-sub">Обмен криптовалют</div>
            </div>
          </div>

          <div className="header-badge">
            <ShieldIcon className="icon-teal" />
            <div className="badge-text-red">
              ВАЖНО! ПЕРЕВОД СТРОГО<br />
              ПРИ ВСТРЕЧЕ В ОТДЕЛЕНИИ
            </div>
          </div>
        </header>

        <main>
          <section className="hero reveal" ref={heroRef}>
            <h1 className="hero-title">Обмен криптовалют</h1>
            <h2 className="hero-subtitle">по лучшему курсу</h2>

            <div className="hero-coins">
              USDT <span className="dot">•</span> BTC <span className="dot">•</span> ETH
            </div>

            <div className="hero-image">
              <img
                src="/ChatGPT Image 11 июн. 2026 г., 11_12_19.png"
                alt="Криптовалюты"
                className="shark-img"
                draggable={false}
              />
            </div>

            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button pulse"
            >
              <TelegramIcon className="icon-teal-lg" />
              <span>Получить курс в Telegram</span>
            </a>

            <div className="hero-tags">
              Быстро <span className="dot">•</span> Безопасно <span className="dot">•</span> Без комиссий
            </div>
          </section>

          <section className="features reveal" ref={featuresRef} aria-label="Преимущества обмена">
            <div className="feature">
              <BoltIcon className="icon-feature" />
              <div className="feature-title">Быстро</div>
              <div className="feature-desc">Обмен за 10 минут</div>
            </div>
            <div className="feature">
              <ShieldCheckIcon className="icon-feature" />
              <div className="feature-title">Безопасно</div>
              <div className="feature-desc">Только личная встреча</div>
            </div>
            <div className="feature">
              <PercentIcon className="icon-feature" />
              <div className="feature-title">Выгодно</div>
              <div className="feature-desc">Лучшие курсы в городе</div>
            </div>
          </section>
        </main>

        <footer className="footer reveal" ref={footerRef}>
          <div className="footer-divider" />

          <div className="footer-grid">
            <div className="footer-col footer-col--schedule">
              <div className="footer-col-title">
                <ScheduleIcon className="footer-mini-icon" />
                Режим работы
              </div>
              <div className="footer-hours">
                <strong>24/7</strong>
                <span>Ежедневно, без выходных</span>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">
                <ShieldMiniIcon className="footer-mini-icon" />
                Безопасность
              </div>
              <div className="footer-security-text">
                Переводы только<br />
                при личной встрече
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">
                <TelegramIcon className="footer-mini-icon" />
                Связь
              </div>
              <a
                href={TG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-tg"
              >
                Telegram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2024 BURO PAY. Все права защищены.</div>
            <div className="footer-disclaimer">
              Информация на сайте не является публичной офертой. Курс уточняйте у менеджера.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BoltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function PercentIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </svg>
  );
}

function ScheduleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18M8 15l2 2 5-5" />
    </svg>
  );
}

function ShieldMiniIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.5 3.5L2.5 11l5.5 2 2 6 3-3.5 5 4 3.5-16zM10 14l8-7-10 6.5z" />
    </svg>
  );
}

export default App;
