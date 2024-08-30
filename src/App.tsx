import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserPage from './pages/UserPage';
import ProductPage from './pages/ProductPage';
import DeliveryPage from './pages/DeliveryPage';
import InvoicePage from './pages/InvoicePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './i18n';
import './App.css';
import Navigation from './pages/Navigation';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher">
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('es')}>Español</button>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/users" /> : <LoginPage />} />
      <Route path="/users" element={isLoggedIn ? <UserPage /> : <Navigate to="/" />} />
      <Route path="/products" element={isLoggedIn ? <ProductPage /> : <Navigate to="/" />} />
      <Route path="/deliveries" element={isLoggedIn ? <DeliveryPage /> : <Navigate to="/" />} />
      <Route path="/invoices" element={isLoggedIn ? <InvoicePage /> : <Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <div className="app-container">
          <LanguageSwitcher />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
