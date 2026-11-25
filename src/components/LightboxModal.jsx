import React, { useEffect, useRef } from 'react';

export default function LightboxModal({ isOpen, src, alt, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      id="lb"
      ref={dialogRef}
      onClick={onClose}
      aria-label="Tampilan perbesaran gambar"
    >
      <img src={src} alt={alt || ''} id="lbi" />
    </dialog>
  );
}
