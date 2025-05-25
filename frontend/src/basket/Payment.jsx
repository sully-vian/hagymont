import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext} from 'react-router-dom';
import apiService from '../utils/APIService';
import EmptyBasket from './components/EmptyBasket';

function Payment() {
  const [formData, setFormData] = useState('');
  const navigate = useNavigate();
  const { purchases, basket, _, setState } = useOutletContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);
  const [validate, setValidate] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!validateForm()) {return};
    apiService.patchRequest(`/baskets/update/${basket.id}`, { status: "confirmed" })
      .then(() => {
        console.log("Validé !!");
        setValidate(true);
        setState(4);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleOrders = () => {
        navigate('/orders');
    };

  const validateForm = () => {
    const newErrors = {};
    newErrors.name = (!formData.name) ? 'Owner of the card is required' : null;
    newErrors.card = (!formData.card) ? 'Card number is required' : null;
    newErrors.expiration = (!formData.expiration) ? 'Expiration date is required' : null;
    newErrors.cvc = (!formData.cvc) ? 'CVC is required' : null;
    
    const cardRegex = /[0-9]{16}/;
    newErrors.card = (formData.card && !cardRegex.test(formData.card)) ? 
      'Invalid card number'
      : newErrors.card;
    
      const expRegex = /(0[1-9]|1[0,1,2])\/(2[5-9]|[3-9][0-9])/;
    newErrors.expiration = (formData.expiration && !expRegex.test(formData.expiration)) ?
      'Invalid expiration date'
      : newErrors.expiration;
    
      const cvcRegex = /[0-9]{3}/;
    newErrors.cvc = (formData.cvc && !cvcRegex.test(formData.cvc)) ?
      'Invalid CVC'
      : newErrors.cvc;

    setErrors(newErrors);
    return Object.values(newErrors).every(v => v===null);
  };

  useEffect(() => {
    if (validate) {
      setState(4);
      return;
    }
    setState(3);
    actualiseInfos(purchases);
    }, []);

  return (
    !purchases || purchases.length === 0 ? (
      <EmptyBasket/>
    ) : (
      validate ? 
      (<div className="min-h-screen flex items-center justify-center p-4">
        <div className=" flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center">Confirmation</h2>
          <p className="text-2xl font-semibold mb-2 text-center">Payment accepted</p>
          <p className="text-2xl font-semibold mb-2 text-center">Your order has ben confirmed</p>
          <button
            onClick={handleOrders}
            className="bg-gray-600 text-white border-none px-3 py-1.5 text-sm rounded hover:bg-gray-800"
            >
            See previous orders
          </button>
        </div>
      </div>)
      : (<div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
            {errors.name &&
              <div className="invalid-feedback d-block">
                {errors.name}
              </div>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Card number</label>
            <input
              type="text"
              name="card"
              value={formData.card}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="1234 5678 9012 3456"
              required
            />
            {errors.card &&
              <div className="invalid-feedback d-block">
                {errors.card}
              </div>}
          </div>
          

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Expiration date</label>
              <input
                type="text"
                name="expiration"
                value={formData.expiration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="MM/AA"
                required
              />
                {errors.expiration &&
              <div className="invalid-feedback d-block">
                {errors.expiration}
              </div>}
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">CVC</label>
              <input
                type="text"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              {errors.cvc &&
                <div className="invalid-feedback d-block">
                  {errors.cvc}
                </div>}
              </div>
            </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Pay
          </button>
        </div>
      </div>)
    ));
}

export default Payment;
