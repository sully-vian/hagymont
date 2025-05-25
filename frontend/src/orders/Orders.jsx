import { useEffect, useState } from "react";
import apiService from '../utils/APIService';
import { useNavigate } from "react-router-dom";
import OrderItem from "./components/OrderItem";
import EmptyOrders from "./components/EmptyOrders";

function Orders(){
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
      if (!username) {
        navigate('/login');
        return;
      }
      apiService.getRequest(`/baskets/all/${username}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
    }, []); 

  return (
    <div>
      {orders.length === 0 ? (
        <EmptyOrders/>
      ) : (
        orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))
      )}
    </div>
  );
};

export default Orders;