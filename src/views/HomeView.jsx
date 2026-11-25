import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA, STATS } from '../data/portfolioData';

export default function HomeView({ onSelectBox, onSelectMember }) {
  const { team, members } = PORTFOLIO_DATA;
  const teamParts = team.name.split(' ');
  const nameFirst = teamParts.slice(0, -1).join(' ');
  const nameLast = teamParts.at(-1);

  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts(STATS.map(([n]) => n));
      return;
    }

    let start = null;
    let animId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 900, 1);
      setCounts(STATS.map(([n]) => Math.round(n * progress)));
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <p className="kick">Selamat datang</p>
      <h2 tabIndex="-1">
        Halo, kami {nameFirst} <em>{nameLast}</em>.
      </h2>
      <p>{team.tagline}</p>

      <div className="row">
        <button className="btn" type="button" onClick={() => onSelectBox(4)}>
          Lihat Portofolio
        </button>
        <button className="btn" type="button" onClick={() => onSelectBox(5)}>
          Hubungi Kami
        </button>
      </div>

      <div className="row">
        {members.map((m) => (
          <button
            key={m.id}
            type="button"
            className="chip"
            onClick={() => {
              onSelectMember?.(m.id);
              onSelectBox(1);
            }}
            style={{ cursor: 'pointer' }}
            title={`Lihat profil ${m.name}`}
          >
            {m.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="row">
        {STATS.map(([n, label], i) => (
          <div className="card" style={{ textAlign: 'center' }} key={label}>
            <b className="cu" style={{ font: '700 24px var(--f1)' }}>
              {counts[i]}
            </b>
            {label}
          </div>
        ))}
      </div>
    </>
  );
}
