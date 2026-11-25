import React from 'react';
import { PORTFOLIO_DATA, getMember } from '../data/portfolioData';

export default function AboutView({
  selectedMemberId,
  onSelectMember,
  onSelectProject,
  onSelectBox
}) {
  const { members, projects } = PORTFOLIO_DATA;

  if (selectedMemberId) {
    const m = getMember(selectedMemberId);
    const memberProjects = projects.filter((p) =>
      p.members.some((x) => x.id === m.id)
    );

    return (
      <div className="member-detail-container">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb" role="navigation" aria-label="Breadcrumb">
          <button
            type="button"
            className="breadcrumb-btn"
            onClick={() => onSelectMember(null)}
          >
            02 / ABOUT
          </button>
          <span className="breadcrumb-sep">·</span>
          <span className="breadcrumb-current">DETAIL ANGGOTA</span>
        </div>

        {/* Title */}
        <h2 className="detail-title" tabIndex="-1">
          Detail <em>anggota</em>.
        </h2>

        {/* Tombol Kembali */}
        <button
          className="btn-back-pill"
          type="button"
          onClick={() => onSelectMember(null)}
        >
          ← Kembali
        </button>

        {/* 2-Column Layout */}
        <div className="detail-layout">
          {/* Kolom Kiri */}
          <div className="detail-left-col">
            <div className="detail-photo-box">
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="lazy" />
              ) : (
                <span>foto</span>
              )}
            </div>

            <div className="detail-section">
              <div className="detail-section-title">Ringkasan skill</div>
              <div className="chips-group">
                {m.skills.technical.length > 0 ? (
                  m.skills.technical.map((s) => (
                    <span className="pill-chip" key={s.name}>
                      [{s.name}]
                    </span>
                  ))
                ) : (
                  <span className="pill-chip muted">[Belum ada skill]</span>
                )}
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-section-title">Ringkasan proyek</div>
              <div className="chips-group">
                {memberProjects.length > 0 ? (
                  memberProjects.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="pill-chip btn-chip"
                      onClick={() => {
                        onSelectProject?.(p.id);
                        onSelectBox?.(4);
                      }}
                      title={`Buka proyek ${p.title}`}
                    >
                      [{p.title}]
                    </button>
                  ))
                ) : (
                  <span className="pill-chip muted">[Belum ada proyek]</span>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="detail-right-col">
            <h3 className="member-detail-name">[{m.name}]</h3>
            <div className="member-detail-role">[{m.role}]</div>

            <div className="detail-section">
              <div className="detail-section-title">Bio lengkap</div>
              <p className="member-detail-bio">{m.bio}</p>
            </div>

            <div className="detail-section">
              <div className="detail-section-title">Pendidikan</div>
              <div className="member-detail-edu">[{m.education}]</div>
            </div>

            <div className="detail-section">
              <div className="detail-section-title">Tautan</div>
              <div className="links-group">
                {m.links?.linkedin && (
                  <a
                    href={m.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pill-btn"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {m.links?.github && (
                  <a
                    href={m.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pill-btn"
                  >
                    GitHub ↗
                  </a>
                )}
                {(m.links?.instagram || m.links?.website) && (
                  <a
                    href={m.links.instagram || m.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pill-btn"
                  >
                    Instagram ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 tabIndex="-1" style={{ marginBottom: '4px' }}>
        Kenali <em>timnya</em>.
      </h2>
      <p style={{ color: 'var(--gr)', margin: '0 0 16px', fontSize: '14px' }}>
        Klik kartu anggota → panel detail anggota.
      </p>

      <div className="team-grid">
        {members.map((m) => (
          <button
            key={m.id}
            className="member-card"
            type="button"
            onClick={() => onSelectMember(m.id)}
          >
            <div className="member-photo-box">
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="lazy" />
              ) : (
                <span>foto</span>
              )}
            </div>

            <div className="member-name">{m.name}</div>
            <div className="member-role">{m.role}</div>

            <div className="member-edu">{m.education}</div>

            <div className="member-social-circles">
              <span
                className="social-circle"
                title="LinkedIn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (m.links?.linkedin) window.open(m.links.linkedin, '_blank', 'noopener,noreferrer');
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2" />
                </svg>
              </span>
              <span
                className="social-circle"
                title="GitHub"
                onClick={(e) => {
                  e.stopPropagation();
                  if (m.links?.github) window.open(m.links.github, '_blank', 'noopener,noreferrer');
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                </svg>
              </span>
              <span
                className="social-circle"
                title="Instagram / Web"
                onClick={(e) => {
                  e.stopPropagation();
                  const target = m.links?.instagram || m.links?.website;
                  if (target) window.open(target, '_blank', 'noopener,noreferrer');
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
