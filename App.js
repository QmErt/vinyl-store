// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

const Header = () => (
  <header style={{ background: '#2c3e50', padding: '10px', textAlign: 'center', color: '#fff' }}>
    <h1>Vinyl World</h1>
  </header>
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Header />
            <nav style={{ background: '#34495e', padding: '10px', textAlign: 'center', color: '#fff' }}>
              <Link to="/" style={navLinkStyle}>Ana Sayfa</Link> | <Link to="/shop" style={navLinkStyle}>Dükkan</Link> | <Link to="/cart" style={navLinkStyle}>Sepet</Link> | <AuthButtons />
            </nav>
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

const AuthButtons = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout} style={authButtonStyle}>Çıkış Yap</button>
      ) : (
        <button onClick={login} style={authButtonStyle}>Giriş Yap</button>
      )}
    </div>
  );
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px',
};

const authButtonStyle = {
  background: '#3498db',
  color: '#fff',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

export default App;
