import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;
