import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signin from './auth/Signin';
import ErrorBoundary from './ErrorBoundary';
import ErrorPage from './errors/ErrorPage';
import Club from './pages/Club';
import Home from './pages/Home';
import Basket from './basket/Basket';
import ProductList from './shop/ProductList';
import ProductPage from './shop/ProductPage';
import Shop from './shop/Shop';
import Payment from './basket/Payment';
import Profile from './pages/Profile';
import BasketList from './basket/BasketList';
import OrderReview from './basket/OrderReview';



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
        <Route path="/profile" element={<Profile />} />

        {/* Club-related routes */}

        <Route path="/club" element={<Club />} />

        {/* About page */}
        
        {/* Nested routes for products */}
        <Route path="/products" element={<Shop />}>
          <Route index element={<ProductList />} />
          <Route path="name" element={<ProductList />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>

        {/* Nested routes for basket */}
        <Route path="/basket" element={<Basket />}>
          <Route index element={<BasketList />} />
          <Route path="payment" element={<Payment />} />
          <Route path="review" element={<OrderReview />} />
        </Route>

        {/* Default redirection and 404 handling */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
