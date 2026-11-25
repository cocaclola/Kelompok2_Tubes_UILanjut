import React from 'react';
import { PORTFOLIO_DATA, getMember } from '../data/portfolioData';

const EXP_TYPES = ['organisasi', 'kerja', 'magang', 'kegiatan'];

export default function ExpView({ filters, onFilterChange }) {
  const { members, certificates } = PORTFOLIO_DATA;
  const memberOpts = [['all', 'Semua'], ...members.map((m) => [m.id, m.name.split(' ')[0]])];
  const typeOpts = [['all', 'Semua jenis'], ...EXP_TYPES.map((t) => [t, t])];

  const items = members
    .filter((m) => filters.em === 'all' || m.id === filters.em)
    .flatMap((m) =>
      m.experience
        .filter((e) => filters.et === 'all' || e.type === filters.et)
        .map((e) => ({ ...e, m }))
    );

  const certs = certificates.filter(
    (c) => filters.em === 'all' || c.memberId === filters.em
  );

  return (
    <>
      <p className="kick">Pengalaman</p>
      <h2 tabIndex="-1">
        Jejak <em>perjalanan</em>.
      </h2>

      {/* Member filter chips */}
      <div className="row" role="group" aria-label="Filter anggota">
        {memberOpts.map(([v, label]) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={filters.em === v}
            onClick={() => onFilterChange('em', v)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Type filter chips */}
      <div className="row" role="group" aria-label="Filter jenis pengalaman">
        {typeOpts.map(([v, label]) => (
          <button
            key={v}
            type="button"
            className="chip"
            aria-pressed={filters.et === v}
            onClick={() => onFilterChange('et', v)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="tl">
        {items.length > 0 ? (
          items.map((e, idx) => (
            <div key={idx}>
              <span className={`ty ${e.type}`}>{e.type}</span> {e.period}
              <br />
              <b>{e.role}</b>, {e.institution} ({e.m.name.split(' ')[0]})
              <br />
              {e.description}
            </div>
          ))
        ) : (
          <p>Tidak ada pengalaman yang cocok.</p>
        )}
      </div>

      <h3>Sertifikasi</h3>
      <div className="grid">
        {certs.map((c, idx) => {
          const owner = getMember(c.memberId);
          return (
            <div className="card" key={idx}>
              <b>{c.title}</b>
              {c.issuer}, {c.year}
              <br />
              {owner ? owner.name : ''}
              <br />
              <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                Verifikasi ↗
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
