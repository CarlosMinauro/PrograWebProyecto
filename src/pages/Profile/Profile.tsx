import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockGames } from '../../data/mockData';
import styles from './Profile.module.css';

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'purchases' | 'wishlist'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Mock data for purchases and wishlist
  const purchases = [
    {
      id: '1',
      date: '2024-03-15',
      total: 59.99,
      status: 'Delivered',
      items: [mockGames[0]],
    },
    {
      id: '2',
      date: '2024-03-10',
      total: 39.99,
      status: 'Processing',
      items: [mockGames[1]],
    },
  ];

  const wishlist = [mockGames[0], mockGames[1]];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's data in the backend
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Data
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'purchases' ? styles.active : ''}`}
          onClick={() => setActiveTab('purchases')}
        >
          Purchase History
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'wishlist' ? styles.active : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'personal' && (
          <div className={styles.personalData}>
            <div className={styles.header}>
              <h2>Personal Information</h2>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <button type="submit" className={styles.saveButton}>
                  Save Changes
                </button>
              )}
            </form>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className={styles.purchases}>
            <h2>Purchase History</h2>
            {purchases.map(purchase => (
              <div key={purchase.id} className={styles.purchaseCard}>
                <div className={styles.purchaseHeader}>
                  <div>
                    <span className={styles.orderId}>Order #{purchase.id}</span>
                    <span className={styles.date}>{purchase.date}</span>
                  </div>
                  <span className={`${styles.status} ${styles[purchase.status.toLowerCase()]}`}>
                    {purchase.status}
                  </span>
                </div>
                <div className={styles.purchaseItems}>
                  {purchase.items.map(game => (
                    <div key={game.id} className={styles.purchaseItem}>
                      <img src={game.imageUrl} alt={game.title} />
                      <div className={styles.itemDetails}>
                        <h3>{game.title}</h3>
                        <span className={styles.platform}>{game.platform}</span>
                      </div>
                      <div className={styles.price}>
                        ${game.discountPrice || game.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.purchaseTotal}>
                  <span>Total:</span>
                  <span>${purchase.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className={styles.wishlist}>
            <h2>My Wishlist</h2>
            <div className={styles.wishlistGrid}>
              {wishlist.map(game => (
                <div key={game.id} className={styles.wishlistItem}>
                  <img src={game.imageUrl} alt={game.title} />
                  <div className={styles.itemDetails}>
                    <h3>{game.title}</h3>
                    <span className={styles.platform}>{game.platform}</span>
                    <div className={styles.price}>
                      {game.discountPrice ? (
                        <>
                          <span className={styles.originalPrice}>
                            ${game.price}
                          </span>
                          <span className={styles.discountPrice}>
                            ${game.discountPrice}
                          </span>
                        </>
                      ) : (
                        <span>${game.price}</span>
                      )}
                    </div>
                  </div>
                  <button className={styles.addToCartButton}>
                    Add to Cart
                  </button>
                  <button className={styles.removeButton}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 