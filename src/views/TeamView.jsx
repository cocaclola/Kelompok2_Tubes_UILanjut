import React from 'react';
import { PORTFOLIO_DATA, UNIQUE_TECH } from '../data/portfolioData';

export default function TeamView({ onSelectBox, onScrollTop }) {
  const { projects, members } = PORTFOLIO_DATA;
  const projectCount = String(projects.length).padStart(2, '0');
  const memberCount = String(members.length).padStart(2, '0');
  const techCount = String(UNIQUE_TECH.length).padStart(2, '0');

  const fastLinksRow1 = [
    { label: '01 HOME', index: 0 },
    { label: '02 ABOUT', index: 1 },
    { label: '03 SKILLS', index: 2 },
    { label: '04 EXPERIENCE', index: 3 }
  ];

  const fastLinksRow2 = [
    { label: '05 PORTFOLIO', index: 4 },
    { label: '06 CONTACT', index: 5 },
    { label: '07 THE TEAM', index: 6 }
  ];

  return (
    <div className="team-closure-container">
      <h2 className="team-title" tabIndex="-1">
        Terima kasih sudah <em>mampir</em>.
      </h2>

      <div className="team-section-label">Tautan cepat ke semua kardus</div>
      <div className="team-fast-links">
        <div className="team-pills-row">
          {fastLinksRow1.map((link) => (
            <button
              key={link.label}
              type="button"
              className="team-pill-btn"
              onClick={() => onSelectBox(link.index)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="team-pills-row">
          {fastLinksRow2.map((link) => (
            <button
              key={link.label}
              type="button"
              className="team-pill-btn"
              onClick={() => onSelectBox(link.index)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <div className="team-section-label" style={{ marginTop: '24px' }}>
        Ringkasan statistik
      </div>
      <div className="team-stats-grid">
        <div className="team-stat-card">
          <div className="team-stat-number">{projectCount}</div>
          <div className="team-stat-name">Proyek</div>
        </div>
        <div className="team-stat-card">
          <div className="team-stat-number">{memberCount}</div>
          <div className="team-stat-name">Anggota</div>
        </div>
        <div className="team-stat-card">
          <div className="team-stat-number">{techCount}</div>
          <div className="team-stat-name">Teknologi</div>
        </div>
      </div>
    </div>
  );
}
