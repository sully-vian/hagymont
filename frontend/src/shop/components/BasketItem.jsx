import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../utils/UserService';


function BasketItem({purchase, actualise, basketId}) {
    const navigate = useNavigate();

    const getImage = (id) => {
        try {
        return require(`../../assets/images/product${id}.png`);
        } catch (err) {
        return require(`../../assets/images/default.png`);
        }
    };

    const handleDelete = (productId) => {
        UserService.deleteRequest(`/baskets/delete-product/${basketId}/${productId}`)
        .then(() => actualise())
        .catch(error => {
            console.error('Erreur détectée :', error);
            navigate('/error', { state: error.status });
        });
    };

    const handleQuantityChange = (productId, quantity) => {
        if (!quantity) return;
        UserService.patchRequest(`/baskets/change-quantity/${basketId}`, { productId, quantity: parseInt(quantity) })
        .then(() => actualise())
        .catch(error => {
            console.error('Erreur détectée :', error);
            navigate('/error', { state: error.status });
        });
    };

    return (
        <div className="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 hover:shadow transition-shadow" key={purchase.id}>
                <div
                className="flex items-center flex-grow cursor-pointer"
                onClick={() => navigate(`/products/${purchase?.product?.id}`)}
                >
                <div className="w-20 h-20 overflow-hidden mr-3">
                    <img 
                    src={getImage(purchase?.product?.id)} 
                    alt={purchase?.product?.name || "Product image"} 
                    className="w-full h-full object-cover"
                    />
                </div>
                <p className="text-base font-medium text-gray-800 m-0 truncate">{purchase?.product?.name}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                <div className="flex gap-3 items-center">
                    <p className="text-base font-medium text-gray-700 m-0">{purchase?.product?.price ?? 0}€</p>
                    <input
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                    type="number"
                    value={purchase?.quantity ?? 1}
                    min={1}
                    onChange={e => handleQuantityChange(purchase?.product?.id, e.target.value)}
                    />
                </div>
                <button
                    className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
                    onClick={() => handleDelete(purchase?.product?.id)}
                >
                    Delete item
                </button>
                </div>
            </div>
    )
};

export default BasketItem;
