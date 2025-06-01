import { useEffect, useState } from "react";
import apiService from '../utils/APIService';
import { useNavigate } from "react-router-dom";
import OrderItem from "./components/OrderItem";
import EmptyOrders from "./components/EmptyOrders";
import Navbar from "../components/Navbar/Navbar";
import SessionService from "../utils/SessionService";

function Orders(){
    const navigate = useNavigate();
    const username = SessionService.getUsername();
    const [orders, setOrders] = useState([]);
    
    const compareOrders = (order1, order2) => {
      const statusSorted = ["confirmed", "shipped", "completed"];
      const statusCompare = statusSorted.indexOf(order1.status) - statusSorted.indexOf(order2.status);
      if (statusCompare !== 0) {
        return statusCompare;
      }
      return new Date(order1.createdAt) - new Date(order2.createdAt);
    };
    
    useEffect(() => {
      if (!username) {
        navigate('/login');
        return;
      }
      apiService.getRequest(`/baskets/all/${username}`)
      .then(response => {
        const allOrders = response.data;
        const ordersNoBasket = allOrders.filter((order) => order.status != "pending");
        setOrders(ordersNoBasket.sort(compareOrders));
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
    }, []); 

 return (
  <div className="p-5 mx-auto font-sans">
    <Navbar />
    <div className="mt-10 mb-4 flex justify-center">
      <h1 className="text-2xl text-gray-800 text-center">Your orders</h1>
    </div>
    <hr className="border-none h-px bg-gray-300 my-3" />
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {orders.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <EmptyOrders />
        </div>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  </div>
 );

};

export default Orders;