'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_PRODUCTS, USER_CATEGORIES } from '@/lib/userPortalMockData';

const UserPortalContext = createContext(undefined);

export function UserPortalProvider({ children }) {
  const [products] = useState(USER_PRODUCTS);
  const [categories] = useState(USER_CATEGORIES);

  // Cart state stored in localStorage if available
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ecom_user_cart');
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) {}
      }
      const savedWishlist = localStorage.getItem('ecom_user_wishlist');
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) {}
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecom_user_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecom_user_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculated properties
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <UserPortalContext.Provider
      value={{
        products,
        categories,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </UserPortalContext.Provider>
  );
}

export function useUserPortal() {
  const context = useContext(UserPortalContext);
  if (!context) {
    throw new Error('useUserPortal must be used within a UserPortalProvider');
  }
  return context;
}
