'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

const AdminDataContext = createContext(undefined);

export function AdminDataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toasts, setToasts] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');

  const addToast = (type, title, message) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch all backend data from Express API
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);

      const [prodRes, orderRes, custRes, modRes, catRes, subCatRes, analyticsRes] = await Promise.allSettled([
        api.getProducts(),
        api.getOrders(),
        api.getCustomers(),
        api.getModules(),
        api.getCategories(),
        api.getSubCategories(),
        api.getDashboardAnalytics(),
      ]);

      if (prodRes.status === 'fulfilled' && prodRes.value.success) {
        setProducts((prodRes.value.products || []).filter((p) => p.status !== 2 && p.status !== 'Deleted'));
      }

      if (orderRes.status === 'fulfilled' && orderRes.value.success) {
        setOrders(orderRes.value.orders || []);
      }

      if (custRes.status === 'fulfilled' && custRes.value.success) {
        setCustomers(custRes.value.customers || []);
      }

      if (modRes.status === 'fulfilled' && modRes.value.success) {
        setModules((modRes.value.modules || []).filter((m) => m.status !== 2 && m.status !== 'Deleted'));
      }

      if (catRes.status === 'fulfilled' && catRes.value.success) {
        setCategories((catRes.value.categories || []).filter((c) => c.status !== 2 && c.status !== 'Deleted'));
      }

      if (subCatRes.status === 'fulfilled' && subCatRes.value.success) {
        setSubCategories((subCatRes.value.subCategories || []).filter((sc) => sc.status !== 2 && sc.status !== 'Deleted'));
      }

      if (analyticsRes.status === 'fulfilled' && analyticsRes.value.success) {
        setAnalytics(analyticsRes.value);
      }
    } catch (err) {
      console.error('Failed to load store data:', err);
      addToast('error', 'Network Error', 'Failed to connect to express server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Product CRUD Action Handlers
  const addProduct = async (productData) => {
    try {
      const res = await api.createProduct(productData);
      if (res.success && res.product) {
        setProducts((prev) => [res.product, ...prev]);
        addToast('success', 'Product Created', `"${res.product.name}" created successfully.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to create product:', err);
      addToast('error', 'Error', err.message || 'Failed to create product.');
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const res = await api.updateProduct(id, productData);
      if (res.success && res.product) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...res.product } : p))
        );
        addToast('info', 'Product Updated', `"${productData.name}" updated successfully.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to update product:', err);
      addToast('error', 'Error', err.message || 'Failed to update product.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await api.deleteProduct(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        addToast('warning', 'Product Deleted', 'Product removed from catalog.');
        refreshData();
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
      addToast('error', 'Error', err.message || 'Failed to delete product.');
    }
  };

  const bulkImportProducts = async (productsArray) => {
    try {
      const res = await api.bulkImportProducts(productsArray);
      if (res.success) {
        addToast('success', 'Bulk Import Complete', res.message || 'Products imported successfully.');
        refreshData();
        return res;
      } else {
        addToast('error', 'Import Failed', res.message || 'Failed to import products.');
        return res;
      }
    } catch (err) {
      console.error('Failed to bulk import products:', err);
      addToast('error', 'Import Error', err.message || 'Failed to bulk import products.');
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await api.updateOrderStatus(orderId, status);
      if (res.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status, paymentStatus: res.order.paymentStatus } : order
          )
        );
        addToast('info', 'Order Status Updated', `Order ${orderId} status changed to ${status}.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
      addToast('error', 'Error', err.message || 'Failed to update order status.');
    }
  };

  // Module CRUD Action Handlers
  const createModule = async (moduleData) => {
    try {
      const res = await api.createModule(moduleData);
      if (res.success && res.module) {
        setModules((prev) => [...prev, res.module]);
        addToast('success', 'Module Created', `"${res.module.name}" created.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to create module:', err);
      addToast('error', 'Error', err.message || 'Failed to create module.');
    }
  };

  const bulkImportModules = async (modulesArray) => {
    try {
      const res = await api.bulkImportModules(modulesArray);
      if (res.success && Array.isArray(res.modules)) {
        addToast('success', 'CSV Import Complete', res.message || `Imported ${res.modules.length} modules.`);
        refreshData();
        return res;
      } else {
        addToast('error', 'Import Failed', res.message || 'Bulk import failed.');
        return res;
      }
    } catch (err) {
      console.error('Failed to bulk import modules:', err);
      addToast('error', 'Import Error', err.message || 'Failed to import modules.');
      return { success: false, message: err.message };
    }
  };

  const updateModule = async (id, moduleData) => {
    try {
      const res = await api.updateModule(id, moduleData);
      if (res.success && res.module) {
        setModules((prev) =>
          prev.map((m) => (m.id === id ? { ...m, ...res.module } : m))
        );
        addToast('info', 'Module Updated', `Module "${moduleData.name}" updated.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to update module:', err);
      addToast('error', 'Error', err.message || 'Failed to update module.');
    }
  };

  const deleteModule = async (id) => {
    try {
      const res = await api.deleteModule(id);
      if (res.success) {
        setModules((prev) => prev.filter((m) => m.id !== id));
        addToast('warning', 'Module Deleted', 'Module was removed.');
        refreshData();
      }
    } catch (err) {
      console.error('Failed to delete module:', err);
      addToast('error', 'Error', err.message || 'Failed to delete module.');
    }
  };

  // Category CRUD Action Handlers
  const createCategory = async (categoryData) => {
    try {
      const res = await api.createCategory(categoryData);
      if (res.success && res.category) {
        setCategories((prev) => [...prev, res.category]);
        addToast('success', 'Category Created', `"${res.category.name}" created.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to create category:', err);
      addToast('error', 'Error', err.message || 'Failed to create category.');
    }
  };

  const bulkImportCategories = async (categoriesArray) => {
    try {
      const res = await api.bulkImportCategories(categoriesArray);
      if (res.success && Array.isArray(res.categories)) {
        addToast('success', 'CSV Import Complete', res.message || `Imported ${res.categories.length} categories.`);
        refreshData();
        return res;
      } else {
        addToast('error', 'Import Failed', res.message || 'Bulk import failed.');
        return res;
      }
    } catch (err) {
      console.error('Failed to bulk import categories:', err);
      addToast('error', 'Import Error', err.message || 'Failed to import categories.');
      return { success: false, message: err.message };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const res = await api.updateCategory(id, categoryData);
      if (res.success && res.category) {
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...res.category } : c))
        );
        addToast('info', 'Category Updated', `Category "${categoryData.name}" updated.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to update category:', err);
      addToast('error', 'Error', err.message || 'Failed to update category.');
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await api.deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        addToast('warning', 'Category Deleted', 'Category was removed.');
        refreshData();
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
      addToast('error', 'Error', err.message || 'Failed to delete category.');
    }
  };

  const createSubCategory = async (subCategoryData) => {
    try {
      const res = await api.createSubCategory(subCategoryData);
      if (res.success && res.subCategory) {
        setSubCategories((prev) => [...prev, res.subCategory]);
        addToast('success', 'Sub-Category Created', `"${res.subCategory.name}" created.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to create subcategory:', err);
      addToast('error', 'Error', err.message || 'Failed to create subcategory.');
    }
  };

  const updateSubCategory = async (id, subCategoryData) => {
    try {
      const res = await api.updateSubCategory(id, subCategoryData);
      if (res.success && res.subCategory) {
        setSubCategories((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...res.subCategory } : s))
        );
        addToast('info', 'Sub-Category Updated', `Sub-category "${subCategoryData.name}" updated.`);
        refreshData();
      }
    } catch (err) {
      console.error('Failed to update subcategory:', err);
      addToast('error', 'Error', err.message || 'Failed to update subcategory.');
    }
  };

  const bulkImportSubCategories = async (subCategoriesArray) => {
    try {
      const res = await api.bulkImportSubCategories(subCategoriesArray);
      if (res.success && Array.isArray(res.subCategories)) {
        addToast('success', 'CSV Import Complete', res.message || `Imported ${res.subCategories.length} sub-categories.`);
        refreshData();
        return res;
      } else {
        addToast('error', 'Import Failed', res.message || 'Bulk import failed.');
        return res;
      }
    } catch (err) {
      console.error('Failed to bulk import sub-categories:', err);
      addToast('error', 'Import Error', err.message || 'Failed to import sub-categories.');
      return { success: false, message: err.message };
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      const res = await api.deleteSubCategory(id);
      if (res.success) {
        setSubCategories((prev) => prev.filter((s) => s.id !== id));
        addToast('warning', 'Sub-Category Deleted', 'Sub-category was removed.');
        refreshData();
      }
    } catch (err) {
      console.error('Failed to delete subcategory:', err);
      addToast('error', 'Error', err.message || 'Failed to delete subcategory.');
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        orders,
        customers,
        modules,
        categories,
        subCategories,
        analytics,
        loading,
        toasts,
        globalSearch,
        setGlobalSearch,
        refreshData,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkImportProducts,
        updateOrderStatus,
        createModule,
        bulkImportModules,
        updateModule,
        deleteModule,
        createCategory,
        bulkImportCategories,
        updateCategory,
        deleteCategory,
        createSubCategory,
        updateSubCategory,
        bulkImportSubCategories,
        deleteSubCategory,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
