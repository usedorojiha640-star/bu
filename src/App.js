import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const TG_URL = "https://t.me/cashers_manager_1";

/* ===== ВАЛЮТЫ ===== */
const CURRENCIES = [
  { code: 'USD', name: 'Доллар США', symbol: '$' },
  { code: 'EUR', name: 'Евро', symbol: '€' },
  { code: 'RUB', name: 'Российский рубль', symbol: '₽' },
  { code: 'CNY', name: 'Китайский юань', symbol: '¥' },
  { code: 'KZT', name: 'Казахстанский тенге', symbol: '₸' },
  { code: 'USDT', name: 'Tether USDT', symbol: '₮' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ' },
];

const RATES = {
  USD: 1,
  EUR: 0.92,
  RUB: 92.5,
  CNY: 7.25,
  KZT: 470,
  USDT: 1,
  BTC: 0.0000122,
  ETH: 0.00032,
};

const CRYPTO = ['USDT', 'BTC', 'ETH'];

function getSpread(give, get) {
  const giveIsCrypto = CRYPTO.includes(give);
  const getIsCrypto = CRYPTO.includes(get);

  // Крипта → валюта: +2.5%
  if (giveIsCrypto && !getIsCrypto) return 1.025;

  // Валюта → крипта: −3%
  if (!giveIsCrypto && getIsCrypto) return 0.97;

  return 1;
}

function getCurrencyMeta(code) {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

/* ===== ИКОНКИ ===== */
function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BoltIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function PercentIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </svg>
  );
}

function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.5 3.5L2.5 11l5.5 2 2 6 3-3.5 5 4 3.5-16zM10 14l8-7-10 6.5z" />
    </svg>
  );
}

function ArrowsDownUpIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M7 3v18M3 7l4-4 4 4M17 21V3M13 17l4 4 4-4" />
    </svg>
  );
}

function CaretDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

/* ===== CURRENCY SELECT ===== */
function CurrencySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const meta = getCurrencyMeta(value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`currency-select ${open ? 'open' : ''}`} ref={ref}>
      <button type="button" className="currency-select-trigger" onClick={() => setOpen((v) => !v)}>
        <span className="currency-select-symbol">{meta.symbol}</span>
        <span className="currency-select-code">{meta.code}</span>
        <CaretDownIcon className="currency-select-caret" />
      </button>

      {open && (
        <div className="currency-select-menu">
          {CURRENCIES.map((c) => {
            const isActive = c.code === value;
            return (
              <button
                key={c.code}
                type="button"
                className={`currency-option ${isActive ? 'active' : ''}`}
                onClick={() => { onChange(c.code); setOpen(false); }}
              >
                <span className="currency-option-symbol">{c.symbol}</span>
                <div className="currency-option-info">
                  <span className="currency-option-code">{c.code}</span>
                  <span className="currency-option-name">{c.name}</span>
                </div>
                {isActive && <CheckIcon className="currency-option-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function App() {
  const [giveCurrency, setGiveCurrency] = useState('USD');
  const [getCurrency, setGetCurrency] = useState('USDT');
  const [giveAmount, setGiveAmount] = useState(1000);
  const [getAmount, setGetAmount] = useState('0.00');
  const [rates, setRates] = useState(RATES);

  useEffect(() => {
    const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!data || !data.usd) return;
        const usd = data.usd;
        setRates((prev) => ({
          ...prev,
          RUB: usd.rub || prev.RUB,
          CNY: usd.cny || prev.CNY,
          KZT: usd.kzt || prev.KZT,
          EUR: usd.eur || prev.EUR,
        }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const give = parseFloat(giveAmount) || 0;
    if (give <= 0) {
      setGetAmount('0.00');
      return;
    }
    const spread = getSpread(giveCurrency, getCurrency);
    const inUsd = give / rates[giveCurrency];
    const result = inUsd * rates[getCurrency] * spread;
    setGetAmount(result.toFixed(2));
  }, [giveAmount, giveCurrency, getCurrency, rates]);

  const handleSwap = () => {
    setGiveCurrency(getCurrency);
    setGetCurrency(giveCurrency);
  };

  const spread = getSpread(giveCurrency, getCurrency);
  const effectiveRate = (rates[getCurrency] / rates[giveCurrency]) * spread;

  const message = `Здравствуйте! Хочу обменять ${giveAmount} ${giveCurrency} на ${getCurrency}.`;
  const tgLink = `${TG_URL}?text=${encodeURIComponent(message)}`;

  return (
    <div className="page">
      <div className="bg-glow" />
      <div className="bg-nebula" />
      <div className="bg-vignette" />

      <div className="container">
        <header className="header">
          <div className="header-left">
            <div className="logo-box">
              <span className="logo-letter">B</span>
            </div>

            <div className="header-text">
              <div className="header-title">BURO PAY</div>
              <div className="header-sub">
                Обмен криптовалют
              </div>
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

        <section className="hero">
          <h1 className="hero-title">
            Обмен криптовалют
          </h1>

          <h2 className="hero-subtitle">
            по лучшему курсу
          </h2>

          <div className="hero-coins">
            USDT <span className="dot">•</span>
            BTC <span className="dot">•</span>
            ETH
          </div>

          {/* КАРТИНКА — вернул на место */}
          <div className="hero-image">
            <img
              src="/ChatGPT Image 11 июн. 2026 г., 11_12_19.png"
              alt="Coins"
              className="shark-img"
              draggable={false}
            />
          </div>

          {/* КАЛЬКУЛЯТОР — после картинки */}
          <div className="calculator">
            <div className="calc-head">
              <span className="calc-rate-label">
                Курс: 1 {giveCurrency} ≈ {effectiveRate.toFixed(4)} {getCurrency}
              </span>
            </div>

            <div className="calc-body">
              <div className="calc-field">
                <label className="calc-label">Отдаю</label>
                <div className="calc-row">
                  <input
                    type="number"
                    className="calc-input"
                    value={giveAmount}
                    onChange={(e) => setGiveAmount(e.target.value)}
                    min="0"
                  />
                  <CurrencySelect value={giveCurrency} onChange={setGiveCurrency} />
                </div>
              </div>

              <div className="calc-swap-row">
                <button type="button" className="calc-swap" onClick={handleSwap} title="Поменять местами">
                  <ArrowsDownUpIcon className="calc-swap-icon" />
                </button>
              </div>

              <div className="calc-field">
                <label className="calc-label">Получаю</label>
                <div className="calc-row">
                  <input type="text" className="calc-input" value={getAmount} readOnly />
                  <CurrencySelect value={getCurrency} onChange={setGetCurrency} />
                </div>
              </div>
            </div>

            <a
              href={tgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button pulse"
            >
              <TelegramIcon className="icon-teal-lg" />
              <span>Получить курс в Telegram</span>
            </a>
          </div>

          <div className="hero-tags">
            Быстро <span className="dot">•</span>
            Безопасно <span className="dot">•</span>
            Без комиссий
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <BoltIcon className="icon-feature" />
            <div className="feature-title">Быстро</div>
            <div className="feature-desc">
              Обмен за 10 минут
            </div>
          </div>

          <div className="feature">
            <ShieldCheckIcon className="icon-feature" />
            <div className="feature-title">
              Безопасно
            </div>
            <div className="feature-desc">
              Только личная встреча
            </div>
          </div>

          <div className="feature">
            <PercentIcon className="icon-feature" />
            <div className="feature-title">
              Выгодно
            </div>
            <div className="feature-desc">
              Лучшие курсы в городе
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-divider" />

          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-col-title">
                <ClockIcon className="footer-mini-icon" />
                Режим работы
              </div>
              <div className="footer-hours">
                <strong>24/7</strong>
                <span>Ежедневно, без выходных</span>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">
                <ShieldCheckIcon className="footer-mini-icon" />
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
                Telegram <span>↗</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © 2024 BURO PAY. Все права защищены.
            </div>
            <div className="footer-disclaimer">
              Информация на сайте не является публичной офертой. Курс уточняйте у менеджера.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;