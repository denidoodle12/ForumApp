import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  async function onSubmit(event) {
    event.preventDefault();
    const success = await dispatch(asyncRegisterUser({ name, email, password }));
    if (success) {
      alert('Akun berhasil didaftarkan! Silakan masuk.');
      navigate('/login');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Buat Akun Baru</h2>
          <p>Bergabunglah dengan komunitas Dicoding Forum</p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password (minimal 6 karakter)
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Daftar
          </button>
        </form>

        <div className="auth-footer">
          Sudah memiliki akun? <Link to="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
