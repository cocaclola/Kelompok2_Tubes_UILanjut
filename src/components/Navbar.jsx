import React, { useEffect, useRef } from 'react';
import { BOX_CONFIGS } from '../data/portfolioData';

export default function Navbar({ currentBoxIndex, onSelectBox, menuOpen, setMenuOpen }) {
  const navRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [menuOpen, setMenuOpen]);

  const handleNavClick = (idx) => {
    setMenuOpen(false);
    onSelectBox(idx);
  };

  return (
    <div ref={navRef}>
      <nav aria-label="Navigasi utama">
        <div className="logo" aria-label="Kelompok 2">
          Kelompok
          <br />
          2
        </div>

        <div className="nl" id="nl">
          {BOX_CONFIGS.slice(0, 6).map((b, i) => {
            const isActive = currentBoxIndex === i;
            return (
              <button
                key={b.id}
                type="button"
                className={isActive ? 'on' : ''}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handleNavClick(i)}
              >
                {b.title}
              </button>
            );
          })}
        </div>

        <button
          className="cta nav-cta"
          type="button"
          onClick={() => handleNavClick(5)}
        >
          Hubungi Kami ↗
        </button>

        <button
          className="ham"
          id="ham"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mp"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </nav>

      <div className={`mp ${menuOpen ? 'show' : ''}`} id="mp">
        {BOX_CONFIGS.slice(0, 6).map((b, i) => {
          const isActive = currentBoxIndex === i;
          return (
            <button
              key={b.id}
              type="button"
              className={isActive ? 'on' : ''}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => handleNavClick(i)}
            >
              {b.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
