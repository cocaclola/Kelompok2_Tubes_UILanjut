import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Stage from './components/Stage';
import LightboxModal from './components/LightboxModal';
import { BOX_CONFIGS, PORTFOLIO_DATA } from './data/portfolioData';

export default function App() {
  const stageRef = useRef(null);

  const [currentBoxIndex, setCurrentBoxIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [filters, setFilters] = useState({
    sm: 'all',
    sc: 'all',
    em: 'all',
    et: 'all',
    pc: 'all',
    pt: 'all',
    pm: 'all',
    ab: null,
    pd: null
  });

  const [lightbox, setLightbox] = useState({
    open: false,
    src: '',
    alt: ''
  });

  const handleFilterChange = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleSelectBox = (idx) => {
    // Reset view sub-selection when navigating
    setFilters((prev) => ({ ...prev, ab: null, pd: null }));
    stageRef.current?.select(idx);
  };

  const handleScrollTop = () => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.in').forEach((el) => {
      el.scrollTo({ top: 0, behavior: isReduced ? 'auto' : 'smooth' });
    });
    window.scrollTo({ top: 0, behavior: isReduced ? 'auto' : 'smooth' });
    const st = document.getElementById('stage');
    if (st) st.focus({ preventScroll: true });
  };

  const handleOpenLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
  };

  useEffect(() => {
    const onScroll = () => {
      const isScrolled =
        window.scrollY > 300 ||
        [...document.querySelectorAll('.in')].some((e) => e.scrollTop > 150);
      setShowScrollTop(isScrolled);
    };
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightbox.open) {
          setLightbox({ open: false, src: '', alt: '' });
          return;
        }
        if (menuOpen) {
          setMenuOpen(false);
          return;
        }
        stageRef.current?.select(currentBoxIndex === 0 ? null : 0);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox.open, menuOpen, currentBoxIndex]);

  return (
    <>
      <Navbar
        currentBoxIndex={currentBoxIndex}
        onSelectBox={handleSelectBox}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <Stage
        ref={stageRef}
        currentBoxIndex={currentBoxIndex}
        setCurrentBoxIndex={setCurrentBoxIndex}
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenLightbox={handleOpenLightbox}
        onScrollTop={handleScrollTop}
      />

      <footer id="ft">
        <span>
          {BOX_CONFIGS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => handleSelectBox(i)}
            >
              {b.title}
            </button>
          ))}
        </span>
        <span>
          {Object.entries(PORTFOLIO_DATA.team.socials).map(([k, v], idx, arr) => (
            <React.Fragment key={k}>
              <a href={v} target="_blank" rel="noopener noreferrer">
                {k}
              </a>
              {idx < arr.length - 1 ? ' · ' : ''}
            </React.Fragment>
          ))}
        </span>
        <span>© 2026 {PORTFOLIO_DATA.team.name}. Hak cipta dilindungi.</span>
      </footer>

      <button
        className={`btn ${showScrollTop ? 'show' : ''}`}
        id="top"
        type="button"
        onClick={handleScrollTop}
      >
        ↑ Ke atas
      </button>

      <LightboxModal
        isOpen={lightbox.open}
        src={lightbox.src}
        alt={lightbox.alt}
        onClose={() => setLightbox({ open: false, src: '', alt: '' })}
      />
    </>
  );
}
