import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <Link to="/" className={styles.brand} aria-label="Game Store Home">
          Game Store
        </Link>

        <div className={styles.navLinks} role="menubar">
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className={`${styles.navLink} ${isActive('/catalog') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/catalog') ? 'page' : undefined}
          >
            Catalog
          </Link>
          <Link 
            to="/best-sellers" 
            className={`${styles.navLink} ${isActive('/best-sellers') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/best-sellers') ? 'page' : undefined}
          >
            Best Sellers
          </Link>
          <Link 
            to="/top-rated" 
            className={`${styles.navLink} ${isActive('/top-rated') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/top-rated') ? 'page' : undefined}
          >
            Top Rated
          </Link>
        </div>

        <div className={styles.authLinks}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/cart" 
                className={styles.navLink}
                role="menuitem"
                aria-label="Shopping Cart"
              >
                Cart
              </Link>
              <Link 
                to="/settings" 
                className={styles.navLink}
                role="menuitem"
                aria-label="User Settings"
              >
                Settings
              </Link>
              {user?.isAdmin && (
                <Link 
                  to="/admin/dashboard" 
                  className={styles.navLink}
                  role="menuitem"
                  aria-label="Admin Dashboard"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`${styles.navLink} ${styles.logoutButton}`}
                role="menuitem"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={styles.navLink}
                role="menuitem"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`${styles.navLink} ${styles.register}`}
                role="menuitem"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}; 