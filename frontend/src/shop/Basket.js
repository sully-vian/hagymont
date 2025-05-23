import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../utils/UserService';
import Navbar from '../components/Navbar/Navbar';
import BasketItem from './components/BasketItem';

function Basket() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);
  const username = sessionStorage.getItem("username");

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const actualise = useCallback(() => {
    UserService.getRequest(`/baskets/current/${username}`)
      .then(response => {
        setBasket(response.data);
        setPurchases(response.data.products || []);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  }, [username, navigate]);

  useEffect(() => {
    actualise();
  }, [actualise]);

  useEffect(() => {
    if (purchases && purchases.length > 0) {
      const total = purchases.reduce((acc, current) => {
        const price = current?.product?.price ?? 0;
        const quantity = current?.quantity ?? 0;
        return acc + price * quantity;
      }, 0);
      const count = purchases.reduce((acc, current) => acc + (current?.quantity ?? 0), 0);
      setTotalPrice(total);
      setNbItems(count);
    } else {
      setTotalPrice(0);
      setNbItems(0);
    }
  }, [purchases]);

  const handleShop = () => {
    navigate('/products');
  };

  const handleValidate = () => {
    navigate('/payment');
  };

  return (
    <div className="p-5 max-w-3xl mx-auto font-sans">
        <Navbar />
        <div className="mt-10 mb-5">
          <h1 className="text-2xl text-gray-800 mb-1">Your basket</h1>
          {basket && <p className="text-sm text-gray-500">Created at : {printDate(basket.createdAt)}</p>}
        </div>

        <hr className="border-none h-px bg-gray-300 my-5" />

      {!purchases || purchases.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 border rounded-lg p-4">
          <p>No product in your basket yet !</p>
          <button
            onClick={handleShop}
            className="mt-3 bg-blue-600 text-white border-none px-3 py-1.5 text-sm rounded hover:bg-blue-800"
          >
            Buy something
          </button>
        </div>
      ) : (
        <div class="rounded-lg border p-4">
        {purchases.map(purchase =>
          <BasketItem 
            key={purchase.id} 
            purchase={purchase} 
            actualise={actualise} 
            basketId = {basket.id}/>
        )}
        </div>
      )}

      {purchases.length !== 0 && (
        <div className="text-right mt-6">
          <hr className="border-none h-px bg-gray-300 my-5" />
          <p className="mr-5">
            Your total ({nbItems} item{nbItems > 1 ? 's' : ''}) : <strong>{totalPrice} €</strong>
          </p>
          <button
            onClick={handleValidate}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-1/3 hover:bg-green-700"
          >
            Validate basket
          </button>
        </div>
      )}

    </div>
  );
}

export default Basket;