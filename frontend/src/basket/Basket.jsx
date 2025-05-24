import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import apiService from '../utils/APIService';
import Navbar from '../components/Navbar/Navbar';
import ProgressionBar from './components/ProgressionBar';

function Basket() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const username = sessionStorage.getItem("username");
  const [state, setState] = useState(1);

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const actualise = useCallback(() => {
      apiService.getRequest(`/baskets/current/${username}`)
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

  return (
    <div className="p-5 mx-auto font-sans">
        <Navbar />
        <div className="mt-10 mb-4">
          <div className="flex justify-center">
            <h1 className="text-2xl text-gray-800 text-center">Your basket</h1>
          </div>
          {basket && (
            <div className="flex justify-end">
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Created at: {printDate(basket.createdAt)}
              </p>
            </div>

          )}
        </div>
        {basket && <ProgressionBar current={state}/>}
        <hr className="border-none h-px bg-gray-300 my-3" />
        <Outlet context={{purchases, basket, actualise, setState}}/>
    </div>
  );
}

export default Basket;