import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../utils/APIService';
import ComboBoxOption from './components/ComboBoxOptions';

function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const username =  sessionStorage.getItem("username")
  const [message, setMessage] = useState('');
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  const getImage = (id) => {
    try {
      return require(`../assets/images/product${id}.png`);
    } catch (err) {
      return require(`../assets/images/default.png`); // Image de secours si elle n'existe pas
    }
  };

  useEffect(() => {
    apiService.getRequest(`/products/${id}`)
    .then(response => {
      setProduct(response.data);
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  }, [id, navigate]); 

  const handlePurchase = (productId) => {
    if (!username) {
      navigate('/login');
      return;
    }
    apiService.postRequest(`/baskets/add-product/${username}`, {
      productId,
      quantity: 1
    })
    .then(response => {
      setMessage("Product added to your shopping basket !");
      setTimeout(() => setMessage(''), 2000);
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-600">
        <p className="text-lg">Loading product page...</p>
        <button
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded font-semibold"
          onClick={() => navigate(-1)}
        >
          Return to Previous Page
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-[60px] py-[40px] bg-[#f9f9f9] text-[#333] font-sans box-border">
      <div className="flex gap-10 items-start bg-white p-[30px] rounded-lg border border-gray-300 shadow-md mb-[40px] w-full">
        {/* Image */}
        <div className="w-[400px] h-[400px] rounded-md overflow-hidden bg-[#fafafa] border border-gray-300 shrink-0">
          <img
            src={getImage(product.id)}
            alt={product.name || "Product image"}
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Infos */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Nom */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#222]">{product.name}</h1>
          </div>

          {/* Prix et stock + bouton */}
          <div className="flex justify-between items-end gap-5">
            {/* Stock */}
            <div className="flex flex-col">
              <p className="text-[22px] font-semibold text-blue-600 m-0">{product.price} €</p>
              {product.stock > 0 ? (
                <p className="text-sm text-center text-[#1ba820] mt-1 rounded border-[1.5px] border-[#1ba820] bg-[#1ba82027] px-2 py-1">
                  In Stock
                </p>
              ) : (
                <p className="text-sm text-center text-[#ad0f0f] mt-1 rounded border-[1.5px] border-[#ad0f0f] bg-[#ad0f0f25] px-2 py-1">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Panier */}
            <div className="relative flex flex-col items-end gap-2 h-[70px]">
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold text-base rounded hover:bg-blue-800 whitespace-nowrap"
                onClick={() => handlePurchase(product.id)}
              >
                Add to basket
              </button>
              {message && (
                <p className="absolute top-full mt-2 text-sm text-[#2a9d8f] bg-[#e0f7f1] px-3 py-1 rounded text-center w-full">
                  {message}
                </p>
              )}
            </div>
          </div>

          <hr className="my-6" />

          {/* Détails */}
          <div className="bg-white p-[30px] rounded-lg border border-gray-300 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="space-y-2">
              {product.description.split("\n").map((line, index) => (
                <p key={index} className="text-[15px] text-[#444] leading-relaxed whitespace-pre-line">
                  {line}
                </p>
              ))}
            </div>
            <div className="my-4">
              {product.sizes !==null ? (<ComboBoxOption label='Size' values={product.sizes} onChange={setSize} name='size'/>) : (<></>)}
            </div>
            <div className="my-4">
              {product.colors !==null ? (<ComboBoxOption label='Color' values={product.colors} onChange={setColor} name='color'/>) : (<></>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
