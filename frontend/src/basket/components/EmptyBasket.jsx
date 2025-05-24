import { useNavigate } from "react-router-dom";

function EmptyBasket (){
    const navigate = useNavigate();

    const handleShop = () => {
        navigate('/products');
    };

    const handleOrders = () => {
        navigate('/profile');
        //TODO 
    };

    return (
        <div className="text-center text-gray-500 border rounded-lg p-4">
            <p>No product in your basket yet!</p>
            <div className="mt-4 flex justify-center gap-5 flex-wrap">
                <button
                onClick={handleShop}
                className="bg-blue-600 text-white border-none px-3 py-1.5 text-sm rounded hover:bg-blue-800"
                >
                Buy something
                </button>

                <button
                onClick={handleOrders}
                className="bg-gray-600 text-white border-none px-3 py-1.5 text-sm rounded hover:bg-gray-800"
                >
                See previous orders
                </button>
            </div>
        </div>
    );
};

export default EmptyBasket;