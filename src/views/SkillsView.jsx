import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SkillsView({ filters, onFilterChange }) {
  const { members } = PORTFOLIO_DATA;
  const memberOpts = [['all', 'Semua'], ...members.map((m) => [m.id, m.name.split(' ')[0]])];
  const catOpts = [
    ['all', 'Semua'],
    ['technical', 'Teknis'],
    ['soft', 'Non-teknis']
  ];

  const filteredMembers = members.filter(
    (m) => filters.sm === 'all' || m.id === filters.sm
  );

  return (
    <>
      <p className="kick">Keahlian</p>
      <h2 tabIndex="-1">
        Apa yang <em>kami kuasai</em>.
      </h2>

      {/* Member filter chips */}
      <div className="row" role="group" aria-label="Filter anggota">
        {memberOpts.map(([v, label]) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={filters.sm === v}
            onClick={() => onFilterChange('sm', v)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category filter chips */}
      <div className="row" role="group" aria-label="Filter kategori">
        {catOpts.map(([v, label]) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={filters.sc === v}
            onClick={() => onFilterChange('sc', v)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredMembers.map((m) => (
        <div key={m.id}>
          <h3>{m.name}</h3>

          {filters.sc !== 'soft' && m.skills.technical.length > 0 && (
            <>
              <p className="kick">Kemampuan Teknis</p>
              {m.skills.technical.map((s) => (
                <div key={s.name} style={{ marginBottom: '8px' }}>
                  {s.name}: {s.level}%
                  <div
                    className="bar"
                    role="img"
                    aria-label={`${s.name} ${s.level} persen`}
                  >
                    <i style={{ width: `${s.level}%` }}></i>
                  </div>
                </div>
              ))}
            </>
          )}

          {filters.sc !== 'technical' && m.skills.soft.length > 0 && (
            <>
              <p className="kick" style={{ marginTop: '8px' }}>
                Kemampuan Non-teknis
              </p>
              <div className="row">
                {m.skills.soft.map((s) => (
                  <span className="chip" key={s.name}>
                    {s.name} {s.level}%
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
