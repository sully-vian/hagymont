import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../utils/UserService';

function Payment() {
  const [nom, setNom] = useState('');
  const [carte, setCarte] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [totalPrice, setTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);
  const [basketId, setBasketId] = useState(null);
  const [validate, setValidate] = useState(false);

  const actualiseInfos = (purchases) => {
    if (purchases.length > 0) {
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
  };

  const handleSubmit = (e) => {
    UserService.patchRequest(`/baskets/update/${basketId}`, { status: "confirmed" })
      .then(() => {
        console.log("Validé !!");
        setValidate(true);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  };

  useEffect(() => {
    if (!validate){
      UserService.getRequest(`/baskets/current/${username}`)
      .then(response => {
        setBasketId(response.data.id);
        actualiseInfos(response.data.products || []);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
    }
    }, []);

  return (
    validate ? 
    (<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Confirmation</h2>
      <p>Payment accepted</p>
      <p>Your order has ben confirmed</p>
    </div>)
    : (<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2 text-center">Recap</h3>
          <label className="p-2 mb-1 w-full font-medium flex justify-end">{nbItems} article(s)</label>
          <label className="p-2 mb-1 w-full font-medium flex justify-end">Total price : {totalPrice} €</label>
        </div>
        <hr></hr>

        <h2 className="text-2xl font-semibold mb-6 text-center">Payment informations</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Card number</label>
          <input
            type="text"
            value={carte}
            onChange={(e) => setCarte(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Expiration</label>
            <input
              type="text"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="MM/AA"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-medium">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Pay
        </button>
      </form>
    </div>)
  );
}

export default Payment;
