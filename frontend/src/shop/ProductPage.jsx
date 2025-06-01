import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../utils/APIService';
import ComboBoxOption from './components/ComboBoxOptions';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [message, setMessage] = useState('');
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);


  const [imageLoading, setImageLoading] = useState(true);
  const getImage = (id) => {
    try {
      const img = require(`../assets/images/product${id}.png`);
      return img;
    } catch (err) {
      return require(`../assets/images/default.png`);
    }
  };

  useEffect(() => {
    apiService.getRequest(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
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
        navigate('/error', { state: error.status });
      });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-gray-50">
        <p className="text-lg text-gray-600">Loading product details...</p>
        <button
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors"
          onClick={() => navigate(-1)}
        >
          Return to Previous Page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Main product content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Image area */}
          <div className="relative aspect-square col-span-1 lg:col-span-2 w-full">
            <img
              src={getImage(product.id)}
              alt={product.name || "Product image"}
              className="w-full h-full object-cover object-center transition-opacity"
              onLoad={() => setImageLoading(false)}
              style={{ opacity: imageLoading ? 0.5 : 1 }}
            />
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Product info area */}
          <div className="p-8 lg:p-8 col-span-1 lg:col-span-3">
            {/* Product name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Price and stock */}
            <div className="mb-8">
              <p className="text-4xl font-extrabold text-blue-600 mb-2">
                {product.price} €
              </p>
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <FaCheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">In Stock ({product.stock})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    <FaTimesCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Buy button */}
            <div className="mb-8">
              <button
                onClick={() => handlePurchase(product.id)}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50"
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "Add to Basket" : "Out of Stock"}
              </button>
              {message && (
                <p className="mt-2 text-sm text-center text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                  {message}
                </p>
              )}
            </div>

            {/* Product details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Details</h2>
              <div className="text-gray-600 leading-relaxed">
                {product.description.split("\n").map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
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