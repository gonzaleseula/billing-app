import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setProducts, addProduct, updateProduct, deleteProduct } from '../redux/features/productSlice';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: 0 });
  const [editProductId, setEditProductId] = useState<string | null>(null);

  useEffect(() => {
    // Replace with actual data fetching if needed
    dispatch(setProducts([{ id: '1', name: 'Product A', price: 10 }]));
  }, [dispatch]);

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      alert(t('pleaseEnterValidProduct'));
      return;
    }
    if (editProductId) {
      dispatch(updateProduct({ ...newProduct, id: editProductId }));
      setEditProductId(null);
    } else {
      dispatch(addProduct({ ...newProduct, id: Date.now().toString() }));
    }
    setNewProduct({ id: '', name: '', price: 0 });
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(product => product.id === productId);
    if (product) {
      setNewProduct(product);
      setEditProductId(productId);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="product-page">
      <header className="page-header">
        <nav className="navigation">
          <Navigation />
        </nav>
      </header>
      <main className="product-content">
        <section className="product-list">
          <h3 className="section-title">{t('products')}</h3>
          <ul className="product-items">
            {products.map(product => (
              <li key={product.id} className="product-item">
                {product.name} - €{product.price}
                <div>
                  <button className="button-edit" onClick={() => handleEditProduct(product.id)}>
                    {t('edit')}
                  </button>
                  <button className="button-delete" onClick={() => handleDeleteProduct(product.id)}>
                    {t('delete')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="product-form">
          <h3 className="section-title">{t(editProductId ? 'editProduct' : 'addProduct')}</h3>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder={t('name')}
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder={t('price')}
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
            <button className="button-primary" type="button" onClick={handleAddProduct}>
              {t(editProductId ? 'editProduct' : 'addProduct')}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;
