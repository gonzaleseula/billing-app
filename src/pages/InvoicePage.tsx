import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setInvoices, addInvoice, updateInvoiceStatus } from '../redux/features/invoiceSlice';
import './InvoicePage.css';
import Navigation from './Navigation';
import { useTranslation } from 'react-i18next';

const InvoicePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const [newInvoice, setNewInvoice] = useState<{ userId: string; deliveryIds: string[]; totalAmount: number }>({ userId: '', deliveryIds: [], totalAmount: 0 });

  useEffect(() => {
    // Replace with actual data fetching if needed
    dispatch(setInvoices([{ id: '1', userId: '1', deliveryIds: ['1'], status: 'pending', totalAmount: 100 }]));
  }, [dispatch]);

  const handleAddInvoice = () => {
    if (!newInvoice.userId) {
      alert('Please enter a valid User ID.');
      return;
    }
    dispatch(addInvoice({ ...newInvoice, id: Date.now().toString(), status: 'pending' }));
    setNewInvoice({ userId: '', deliveryIds: [], totalAmount: 0 });
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    dispatch(updateInvoiceStatus({ id: invoiceId, status: 'paid' }));
  };

  return (
    <div className="invoice-page">
      <header className="page-header">
        <nav className="navigation">
          <Navigation />
        </nav>
      </header>
      <main className="invoice-content">
        <section className="invoice-list">
          <h3 className="section-title">{t('invoiceList')}</h3>
          <ul className="invoice-items">
            {invoices.map(invoice => (
              <li key={invoice.id} className="invoice-item">
                {t('invoiceForUser')} {invoice.userId} - {t('totalAmount')}: €{invoice.totalAmount} - {t('status')}: {invoice.status}
                {invoice.status === 'pending' && (
                  <button className="button-secondary" onClick={() => handleMarkAsPaid(invoice.id)}>{t('markAsPaid')}</button>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="invoice-form">
          <h3 className="section-title">{t('addInvoice')}</h3>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder={t('userId')}
              value={newInvoice.userId}
              onChange={e => setNewInvoice({ ...newInvoice, userId: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('deliveryId')}
              value={newInvoice.deliveryIds.join(',')}
              onChange={e => setNewInvoice({ ...newInvoice, deliveryIds: e.target.value.split(',').map(id => id.trim()) })}
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={newInvoice.totalAmount}
              onChange={e => setNewInvoice({ ...newInvoice, totalAmount: Number(e.target.value) })}
            />
            <button className="button-primary" type="button" onClick={handleAddInvoice}>{t('addInvoice')}</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default InvoicePage;
