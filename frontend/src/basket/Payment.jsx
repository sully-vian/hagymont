import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import apiService from '../utils/APIService';
import EmptyBasket from './components/EmptyBasket';
import FormField from './components/FormField';

// Bouton stylé Tailwind
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);


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
    e.preventDefault();
    if (!validateForm()) { return; }
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

    const cardRegex = /^[0-9]{16}$/;
    if (formData.card && !cardRegex.test(formData.card.replace(/\s+/g, ''))) {
      newErrors.card = 'Invalid card number';
    }

    const expRegex = /^(0[1-9]|1[0-2])\/(2[5-9]|[3-9][0-9])$/;
    if (formData.expiration && !expRegex.test(formData.expiration)) {
      newErrors.expiration = 'Invalid expiration date';
    }

    const cvcRegex = /^[0-9]{3}$/;
    if (formData.cvc && !cvcRegex.test(formData.cvc)) {
      newErrors.cvc = 'Invalid CVC';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(v => v === null);
  };

  useEffect(() => {
    if (validate) {
      setState(4);
      return;
    }
    setState(3);
    actualiseInfos(purchases);
  }, []);

  if (!purchases || purchases.length === 0) {
    return <EmptyBasket />;
  }

  if (validate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center">Confirmation</h2>
          <p className="text-2xl font-semibold mb-2 text-center">Payment accepted</p>
          <p className="text-2xl font-semibold mb-2 text-center">Your order has been confirmed</p>
          <Button
            onClick={handleOrders}
            className="bg-gray-600 hover:bg-gray-800 px-3 py-1.5 text-sm rounded"
          >
            See previous orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-2 text-center">Recap</h3>
          <label className="p-2 mb-1 w-full font-medium flex justify-end">{nbItems} article(s)</label>
          <label className="p-2 mb-1 w-full font-medium flex justify-end">Total price : {totalPrice} €</label>
        </div>
        <hr />

        <h2 className="text-2xl font-semibold mb-6 text-center">Payment informations</h2>

        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormField
          label="Card number"
          name="card"
          value={formData.card}
          onChange={handleChange}
          error={errors.card}
          placeholder="1234 5678 9012 3456"
          required
        />

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <FormField
              label="Expiration date"
              name="expiration"
              value={formData.expiration}
              onChange={handleChange}
              error={errors.expiration}
              placeholder="MM/AA"
              required
            />
          </div>
          <div className="w-1/2">
            <FormField
              label="CVC"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              error={errors.cvc}
              required
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Pay
        </Button>
      </form>
    </div>
  );
}

export default Payment;
