import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './shop/Shop';
import ProductPage from './shop/ProductPage';
import ProductList from './shop/ProductList';
import Login from './authentification/Login';
import Basket from './shop/Basket';
import NotFound from './errors/NotFound';


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/basket" restricted={true} element={<Basket/>}/>
        <Route path="/products" element={<Shop />}>
          <Route index element={<ProductList />} />
          <Route path="name" element={<ProductList/>} />
          <Route path=":id" element={<ProductPage/>} />
        </Route>
        <Route path="/error" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
