import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function ContactView() {
  const { team, members } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
  const [errors, setErrors] = useState({ nama: '', email: '', pesan: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { nama: '', email: '', pesan: '' };

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi.';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi.';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Format email belum benar.';
      hasError = true;
    }

    if (formData.pesan.trim().length < 10) {
      newErrors.pesan = 'Pesan minimal 10 karakter.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      <p className="kick">Kontak</p>
      <h2 tabIndex="-1">
        Ayo <em>ngobrol</em>.
      </h2>
      <p>
        Email: <a href={`mailto:${team.email}`}>{team.email}</a>
      </p>

      <form id="cf" noValidate onSubmit={handleSubmit}>
        <label htmlFor="c-nama">Nama</label>
        <input
          id="c-nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          aria-describedby="e-nama"
          aria-invalid={!!errors.nama}
          autoComplete="name"
        />
        <p className="er" id="e-nama" aria-live="polite">
          {errors.nama}
        </p>

        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby="e-email"
          aria-invalid={!!errors.email}
          autoComplete="email"
        />
        <p className="er" id="e-email" aria-live="polite">
          {errors.email}
        </p>

        <label htmlFor="c-pesan">Pesan</label>
        <textarea
          id="c-pesan"
          name="pesan"
          rows="3"
          value={formData.pesan}
          onChange={handleChange}
          aria-describedby="e-pesan"
          aria-invalid={!!errors.pesan}
        ></textarea>
        <p className="er" id="e-pesan" aria-live="polite">
          {errors.pesan}
        </p>

        <button className="btn" type="submit">
          Kirim pesan
        </button>

        {submitted && (
          <p id="st" role="status" aria-live="polite" style={{ marginTop: '8px' }}>
            Terima kasih, pesanmu tercatat (simulasi, belum terkirim ke server).{' '}
            <a
              href={`mailto:${team.email}?subject=${encodeURIComponent(
                'Pesan dari ' + formData.nama
              )}&body=${encodeURIComponent(formData.pesan)}`}
            >
              Kirim lewat aplikasi email
            </a>
          </p>
        )}
      </form>

      <h3>Anggota</h3>
      {members.map((m) => (
        <p key={m.id}>
          {m.name}:{' '}
          {Object.entries(m.links).map(([k, v], idx, arr) => (
            <React.Fragment key={k}>
              <a href={v} target="_blank" rel="noopener noreferrer">
                {k} ↗
              </a>
              {idx < arr.length - 1 ? ' · ' : ''}
            </React.Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
