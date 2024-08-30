import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="navigation">
      <Link to="/users" className="nav-link">{t('users')}</Link>
      <Link to="/products" className="nav-link">{t('products')}</Link>
      <Link to="/deliveries" className="nav-link">{t('deliveries')}</Link>
      <Link to="/invoices" className="nav-link">{t('invoices')}</Link>
    </nav>
  );
};

export default Navigation;
