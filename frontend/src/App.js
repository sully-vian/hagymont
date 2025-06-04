import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Signin from './auth/Signin';
import Basket from './basket/Basket';
import BasketList from './basket/BasketList';
import OrderReview from './basket/OrderReview';
import Payment from './basket/Payment';
import ErrorBoundary from './ErrorBoundary';
import ErrorPage from './errors/ErrorPage';
import Orders from './orders/Orders';
import Club from './pages/Club';
import Course from './pages/Course';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Reserv from './reservation/Reserve/Reserve';
import Reservation from './reservations/Reservation';
import ProductEdit from './shop/components/ProductEdit';
import ProductList from './shop/ProductList';
import ProductPage from './shop/ProductPage';
import Shop from './shop/Shop';
import AdminRoute from './utils/AdminRoute';
import AuthRoute from './utils/AuthRoute';
import CoachRoute from './utils/CoachRoute';
import EditCourse from './reservation/EditCourse';
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
        <Route path="/profile" element={
          <AuthRoute>
            <Profile />
          </AuthRoute>} />

        <Route path="/reservation/:courseId" element={
        <AuthRoute>
          <Reserv /> 
        </AuthRoute>} />
        
        {/* Club */}
        <Route path="/club" element={<Club />} />

        {/* Course */}
        <Route path="/course" element={<Course />}/>
        <Route path="/course/edit" element={
            <CoachRoute>
              <EditCourse/>
            </CoachRoute>}
          />

        
        {/* Nested routes for products */}
        <Route path="/products" element={<Shop />}>
          <Route index element={<ProductList />} />
          <Route path="name" element={<ProductList />} />
          <Route path=":id" element={<ProductPage />} />
          <Route path="edit" element={
            <AdminRoute>
              <ProductEdit />
            </AdminRoute>
            }
          />
        </Route>

        {/* Nested routes for basket */}
        <Route path="/basket" element={
            <AuthRoute>
              <Basket />
            </AuthRoute>
            }>
          <Route index element={<BasketList />} />
          <Route path="payment" element={<Payment />} />
          <Route path="review" element={<OrderReview />} />
        </Route>

        <Route path="/orders" element={
          <AuthRoute>
            <Orders/>
          </AuthRoute>}/>

        <Route path="/calendar" element={
          <AuthRoute>
            <Reservation/>
          </AuthRoute>}/>

        {/* Default redirection and 404 handling */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
