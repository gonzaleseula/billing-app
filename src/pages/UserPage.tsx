import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setUsers, addUser, updateUser, deleteUser } from '../redux/features/userSlice';
import Navigation from '../pages/Navigation';
import { useTranslation } from 'react-i18next';
import './UserPage.css';

const UserPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [newUser, setNewUser] = React.useState({ firstName: '', lastName: '', address: '', billingAddress: '' });
  const [editUserId, setEditUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(setUsers([{ id: '1', firstName: 'John', lastName: 'Doe', address: '123 Main St', billingAddress: '456 Elm St' }]));
  }, [dispatch]);

  const handleAddUser = () => {
    if (editUserId) {
      dispatch(updateUser({ ...newUser, id: editUserId }));
      setEditUserId(null);
    } else {
      dispatch(addUser({ ...newUser, id: Date.now().toString() }));
    }
    setNewUser({ firstName: '', lastName: '', address: '', billingAddress: '' });
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setNewUser({ firstName: user.firstName, lastName: user.lastName, address: user.address, billingAddress: user.billingAddress });
      setEditUserId(userId);
    }
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="user-page">
      <header className="page-header">
        <Navigation />
      </header>
      <main className="user-content">
        <section className="user-list">
          <h2 className="section-title">{t('users')}</h2>
          <ul className="user-items">
            {users.map(user => (
              <li key={user.id} className="user-item">
                {user.firstName} {user.lastName}
                <button onClick={() => handleEditUser(user.id)}>{t('edit')}</button>
                <button onClick={() => handleDeleteUser(user.id)}>{t('delete')}</button>
              </li>
            ))}
          </ul>
        </section>
        <section className="user-form">
          <h2 className="section-title">{t(editUserId ? 'edit' : 'add')} {t('user')}</h2>
          <form className="form">
            <input
              type="text"
              placeholder={t('firstName')}
              value={newUser.firstName}
              onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('lastName')}
              value={newUser.lastName}
              onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('address')}
              value={newUser.address}
              onChange={e => setNewUser({ ...newUser, address: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('billingAddress')}
              value={newUser.billingAddress}
              onChange={e => setNewUser({ ...newUser, billingAddress: e.target.value })}
              required
            />
            <button className="button-primary" type="button" onClick={handleAddUser}>{t(editUserId ? 'update' : 'add')} {t('user')}</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default UserPage;
