import React from 'react';
import { PORTFOLIO_DATA, UNIQUE_TECH, getMember, placeholderImg } from '../data/portfolioData';

export default function PortView({
  selectedProjectId,
  onSelectProject,
  filters,
  onFilterChange,
  onOpenLightbox
}) {
  const { projects, members } = PORTFOLIO_DATA;

  if (selectedProjectId) {
    const p = projects.find((x) => x.id === selectedProjectId);
    if (!p) return null;

    return (
      <>
        <button
          className="btn"
          type="button"
          onClick={() => onSelectProject(null)}
        >
          ← Kembali ke daftar
        </button>
        <h2 tabIndex="-1" style={{ marginTop: '10px' }}>
          {p.title}
        </h2>
        <p>{p.description}</p>
        <p>
          {p.members.map((x, idx) => (
            <React.Fragment key={x.id}>
              <b>{getMember(x.id)?.name}</b>: {x.role}
              {idx < p.members.length - 1 ? <br /> : ''}
            </React.Fragment>
          ))}
        </p>
        <p>
          {p.techStack.map((t) => (
            <span className="bdg" key={t}>
              {t}
            </span>
          ))}
        </p>

        <div className="gal">
          {p.gallery.map((g, idx) => {
            const imgSrc = g.src || placeholderImg(g.alt);
            return (
              <img
                key={idx}
                src={imgSrc}
                alt={g.alt}
                loading="lazy"
                width="128"
                height="80"
                tabIndex="0"
                onClick={() => onOpenLightbox(imgSrc, g.alt)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onOpenLightbox(imgSrc, g.alt);
                }}
              />
            );
          })}
        </div>

        <div className="row">
          {p.id === 'p3' ? (
            <a
              className="btn"
              href="https://beltwayofficepark.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo Langsung ↗
            </a>
          ) : (
            <button
              className="btn"
              type="button"
              disabled
              style={{ opacity: 0.55, cursor: 'not-allowed' }}
              title="Demo tidak tersedia"
            >
              Demo Langsung ↗
            </button>
          )}
          <button
            className="btn"
            type="button"
            disabled
            style={{ opacity: 0.55, cursor: 'not-allowed' }}
            title="Repositori tidak tersedia"
          >
            Repositori ↗
          </button>
        </div>
      </>
    );
  }

  const categoryOptions = [
    ['all', 'Semua'],
    ...[...new Set(projects.map((p) => p.category))].map((c) => [c, c])
  ];
  const techOptions = [['all', 'Semua'], ...UNIQUE_TECH.map((t) => [t, t])];
  const memberOptions = [
    ['all', 'Semua'],
    ...members.map((m) => [m.id, m.name])
  ];

  const filteredList = projects.filter(
    (p) =>
      (filters.pc === 'all' || p.category === filters.pc) &&
      (filters.pt === 'all' || p.techStack.includes(filters.pt)) &&
      (filters.pm === 'all' || p.members.some((x) => x.id === filters.pm))
  );

  return (
    <>
      <p className="kick">Proyek</p>
      <h2 tabIndex="-1">
        Karya <em>kami</em>.
      </h2>

      <div className="row" style={{ alignItems: 'end' }}>
        <label>
          Kategori
          <select
            value={filters.pc}
            onChange={(e) => onFilterChange('pc', e.target.value)}
          >
            {categoryOptions.map(([v, t]) => (
              <option value={v} key={v}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          Teknologi
          <select
            value={filters.pt}
            onChange={(e) => onFilterChange('pt', e.target.value)}
          >
            {techOptions.map(([v, t]) => (
              <option value={v} key={v}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          Anggota
          <select
            value={filters.pm}
            onChange={(e) => onFilterChange('pm', e.target.value)}
          >
            {memberOptions.map(([v, t]) => (
              <option value={v} key={v}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid" aria-live="polite">
        {filteredList.length > 0 ? (
          filteredList.map((p) => (
            <button
              key={p.id}
              className="card"
              type="button"
              onClick={() => onSelectProject(p.id)}
            >
              <b>{p.title}</b>
              <small>{p.category}</small>
              <br />
              {p.techStack.map((t) => (
                <span className="bdg" key={t}>
                  {t}
                </span>
              ))}
            </button>
          ))
        ) : (
          <p>Tidak ada proyek yang cocok.</p>
        )}
      </div>
    </>
  );
}
