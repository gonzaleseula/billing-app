import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setDeliveries, addDelivery } from '../redux/features/deliverySlice';
import { useTranslation } from 'react-i18next';
import './DeliveryPage.css';
import Navigation from './Navigation';

const DeliveryPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const deliveries = useSelector((state: RootState) => state.delivery.deliveries);
  const [newDelivery, setNewDelivery] = useState<{ userId: string; products: { productId: string; quantity: number }[] }>({ userId: '', products: [] });
  const [productId, setProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    // Replace with actual data fetching if needed
    dispatch(setDeliveries([{ id: '1', userId: '1', products: [{ productId: '1', quantity: 2 }] }]));
  }, [dispatch]);

  const handleAddProduct = () => {
    if (productId) {
      setNewDelivery({
        ...newDelivery,
        products: [...newDelivery.products, { productId, quantity }],
      });
      setProductId('');
      setQuantity(1);
    } else {
      alert('Please enter a valid Product ID.');
    }
  };

  const handleAddDelivery = () => {
    if (!newDelivery.userId) {
      alert('Please enter a valid User ID.');
      return;
    }
    dispatch(addDelivery({ ...newDelivery, id: Date.now().toString() }));
    setNewDelivery({ userId: '', products: [] });
  };

  return (
    <div className="delivery-page">
      <header className="page-header">
        <nav className="navigation">
          <Navigation />
        </nav>
      </header>
      <main className="delivery-content">
        <section className="delivery-list">
          <h3 className="section-title">{t('deliveryList')}</h3>
          <ul className="delivery-items">
            {deliveries.map(delivery => (
              <li key={delivery.id} className="delivery-item">
                {t('deliveryForUser')} {delivery.userId}
                <ul>
                  {delivery.products.map((product, index) => (
                    <li key={index}>Product ID {product.productId} - Quantity {product.quantity}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="delivery-form">
          <h3 className="section-title">{t('addDelivery')}</h3>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder={t('userId')}
              value={newDelivery.userId}
              onChange={e => setNewDelivery({ ...newDelivery, userId: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('productId')}
              value={productId}
              onChange={e => setProductId(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder={t('quantity')}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />
            <button className="button-primary" type="button" onClick={handleAddProduct}>{t('addProduct')}</button>
            <button className="button-primary" type="button" onClick={handleAddDelivery}>{t('addDelivery')}</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DeliveryPage;
