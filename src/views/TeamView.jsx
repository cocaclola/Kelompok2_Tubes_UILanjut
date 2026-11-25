import React from 'react';
import { BOX_CONFIGS, STATS } from '../data/portfolioData';

export default function TeamView({ onSelectBox, onScrollTop }) {
  return (
    <>
      <p className="kick">Penutup</p>
      <h2 tabIndex="-1">
        Terima kasih <em>sudah mampir</em>.
      </h2>

      <div className="row">
        {BOX_CONFIGS.slice(0, 6).map((b, i) => (
          <button
            key={b.id}
            type="button"
            className="chip"
            onClick={() => onSelectBox(i)}
          >
            {b.title}
          </button>
        ))}
      </div>

      <div className="row">
        {STATS.map(([n, label]) => (
          <span className="bdg" key={label}>
            {n} {label}
          </span>
        ))}
      </div>

      <p>Semoga ada yang cocok untuk kolaborasi berikutnya.</p>

      <button className="btn" type="button" onClick={onScrollTop}>
        Kembali ke atas
      </button>
    </>
  );
}
