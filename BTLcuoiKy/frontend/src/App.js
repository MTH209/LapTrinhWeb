import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import AdminLogin from './components/Admin/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import MenuList from './components/MenuList';
import Contact from './components/Contact';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentView, setCurrentView] = useState('menu');

  useEffect(() => {
    const handleLocation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocation);

    return () => {
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  // Render content based on current path
  const renderContent = () => {
    switch (currentPath) {
      case '/admin/login':
        return <AdminLogin />;
      case '/admin/dashboard':
        // Check if user is admin
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
          window.location.href = '/admin/login';
          return null;
        }
        return <Dashboard />;
      default:
        return (
          <>
            <Navbar
              cartItems={cartItemCount}
              onCartClick={() => setIsCartOpen(true)}
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            <main className="container">
              {currentView === 'menu' && <MenuList onCartUpdate={setCartItemCount} />}
              {currentView === 'contact' && <Contact />}
            </main>
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onCartCountChange={setCartItemCount}
            />
          </>
        );
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
