import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signin from './auth/Signin';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './errors/NotFound';
import Club from './pages/Club';
import Home from './pages/Home';
import Basket from './shop/Basket';
import ProductList from './shop/ProductList';
import ProductPage from './shop/ProductPage';
import Shop from './shop/Shop';



function App() {
  return (
    <ErrorBoundary>
    <Router>
      

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        {/* Authentication-related routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />

        {/* Club-related routes */}

        <Route path="/club" element={<Club />} />

        {/* About page */}
        
        {/* Nested routes for products */}
        <Route path="/products" element={<Shop />}>
          <Route index element={<ProductList />} />
          <Route path="name" element={<ProductList />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>

        {/* Other feature routes */}
        <Route path="/basket" element={<Basket />} />

        
        
        {/* Default redirection and 404 handling */}
        <Route path="/error" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
