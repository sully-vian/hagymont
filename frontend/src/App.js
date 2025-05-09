import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signin from './auth/Signin';
import NotFound from './errors/NotFound';
import Basket from './shop/Basket';
import ProductList from './shop/ProductList';
import ProductPage from './shop/ProductPage';
import Shop from './shop/Shop';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication-related routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/script" element={<script />} />
        
        {/* Nested routes for products */}
        <Route path="/products" element={<Shop />}>
          <Route index element={<ProductList />} />
          <Route path="filter/:type" element={<ProductList />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>

        {/* Other feature routes */}
        <Route path="/basket" element={<Basket />} />
        
        {/* Default redirection and 404 handling */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/error" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
}

export default App;