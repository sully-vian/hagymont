import { useNavigate } from "react-router-dom";
import apiService from "../../utils/APIService";
import { useState } from "react";
import SessionService from "../../utils/SessionService";
import ConfirmCard from "../../components/ConfirmCard";

function ShopItem({product, removeProduct}){
    const navigate = useNavigate();
    const isAdmin = SessionService.getRole() === 'admin';
    const [showConfirm, setShowConfirm] = useState(false);

    const getImage = (id) => {
        try {
        return require(`../../assets/images/product${id}.png`);
        } catch (err) {
        return require(`../../assets/images/default.png`); // Image de secours si elle n'existe pas
        }
    };

    const handleDelete = (productId) => {
        apiService.deleteRequest(`/products/${productId}`)
        .then(_ => {
            console.log("Product delete !");
            setShowConfirm(false);
            removeProduct?.();
        })
        .catch(error => {
            console.error('Erreur détectée :', error);
            navigate('/error', { state: error.status });
        });
    };

    return (
        <div>
            <div
                className="border border-gray-300 rounded-md p-2 bg-white cursor-pointer flex flex-col items-center text-center transition-shadow hover:shadow-md"
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
            >
                <div className="w-full relative pt-[100%] overflow-hidden rounded-sm mb-2">
                    <img
                        src={getImage(product.id)}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </div>
                <div>
                    <p className="text-base font-semibold text-gray-800 my-1">{product.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 my-0.5">{product.price}€</p>
                    <p className="text-sm text-gray-600 my-0.5">Stock: {product.stock}</p>
                </div>
            </div>
            {isAdmin && 
            (<div  className="flex justify-center">
                <button
                onClick={() => setShowConfirm(true)}
                className="mt-2 px-4 py-2 bg-red-100 rounded hover:bg-red-200 transition"
                >
                🛠️ Delete
                </button>
                {showConfirm && (
                    <ConfirmCard
                    message="Delete product ?"
                    onConfirm={() => handleDelete(product.id)}
                    onCancel={() => setShowConfirm(false)}
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    />
                )}
            </div>)}
        </div>
    );
};

export default ShopItem;