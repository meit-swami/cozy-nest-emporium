
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import OrderTrackingModal from '@/components/order/OrderTrackingModal';
import CartDrawer from '@/components/cart/CartDrawer';

const Navbar = () => {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-cozy-terracotta">CozyNest</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/shop" className="nav-link">Shop</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
            
            {/* Desktop Right Section: Search, Auth, Cart */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/search" className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Search size={20} className="text-cozy-dark" />
              </Link>
              
              <Button 
                variant="ghost" 
                className="flex gap-2 items-center"
                onClick={() => setIsTrackingModalOpen(true)}
              >
                <Package size={20} />
                <span className="text-sm">Track Order</span>
              </Button>
              
              {isAuthenticated ? (
                <div className="relative group">
                  <Button variant="ghost" className="flex gap-2 items-center">
                    <User size={20} />
                    <span className="text-sm">Hi, {user?.name}</span>
                  </Button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  className="flex gap-2 items-center"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <User size={20} />
                  <span className="text-sm">Login</span>
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cozy-terracotta text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <Button 
                variant="ghost" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cozy-terracotta text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/about" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              
              <hr className="my-2" />
              
              <Button 
                variant="ghost" 
                className="flex gap-2 items-center justify-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsTrackingModalOpen(true);
                }}
              >
                <Package size={20} />
                <span>Track Order</span>
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="flex items-center gap-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>My Account</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="flex gap-2 items-center justify-start"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  className="flex gap-2 items-center justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  <User size={20} />
                  <span>Login</span>
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
      
      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <OrderTrackingModal isOpen={isTrackingModalOpen} onClose={() => setIsTrackingModalOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
