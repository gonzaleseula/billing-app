import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      login();
      navigate('/users');
    } else {
      setError(t('invalidCredentials'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{t('login')}</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-primary" onClick={handleLogin}>
          {t('login')}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
