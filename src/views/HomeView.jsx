import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA, UNIQUE_TECH } from '../data/portfolioData';

export default function HomeView({ onSelectBox, onSelectMember }) {
  const { team, members, projects } = PORTFOLIO_DATA;
  const projectCount = projects.length;
  const memberCount = members.length;
  const techCount = UNIQUE_TECH.length;

  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts([projectCount, memberCount, techCount]);
      return;
    }

    let start = null;
    let animId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 900, 1);
      setCounts([
        Math.round(projectCount * progress),
        Math.round(memberCount * progress),
        Math.round(techCount * progress)
      ]);
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [projectCount, memberCount, techCount]);

  return (
    <div className="home-container">
      <p className="home-breadcrumb">01 / HOME</p>
      <h2 className="home-title" tabIndex="-1">
        Halo, kami <em>{team.name}</em>.
      </h2>
      <p className="home-tagline">{team.tagline}</p>

      <div className="home-actions">
        <div className="home-buttons-row">
          <button
            type="button"
            className="home-btn-primary"
            onClick={() => onSelectBox(4)}
          >
            Lihat Portofolio
          </button>
          <button
            type="button"
            className="home-btn-secondary"
            onClick={() => onSelectBox(5)}
          >
            Hubungi Kami
          </button>
        </div>
      </div>

      <div className="home-section-title">Anggota</div>
      <div className="home-members-row">
        {members.map((m) => {
          const initials = m.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
          return (
            <button
              key={m.id}
              type="button"
              className="home-member-btn"
              onClick={() => {
                onSelectMember?.(m.id);
                onSelectBox(1);
              }}
              title={`Lihat profil ${m.name}`}
            >
              <div className="home-member-circle">{initials}</div>
              <div className="home-member-name">[{m.name.split(' ')[0]}]</div>
            </button>
          );
        })}
      </div>

      <div className="home-section-title">Statistik ringkas</div>
      <div className="home-stats-grid">
        <div className="home-stat-card">
          <div className="home-stat-number">
            {String(counts[0]).padStart(2, '0')}
          </div>
          <div className="home-stat-name">Proyek</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-number">
            {String(counts[1]).padStart(2, '0')}
          </div>
          <div className="home-stat-name">Anggota</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-number">
            {String(counts[2]).padStart(2, '0')}
          </div>
          <div className="home-stat-name">Teknologi</div>
        </div>
      </div>
      <div className="home-stats-hint">
        Animasi count-up; dimatikan bila prefers-reduced-motion.
      </div>
    </div>
  );
}
