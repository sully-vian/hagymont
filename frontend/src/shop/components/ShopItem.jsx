import { useNavigate } from "react-router-dom";

function ShopItem({product}){
    const navigate = useNavigate();

    const getImage = (id) => {
        try {
        return require(`../../assets/images/product${id}.png`);
        } catch (err) {
        return require(`../../assets/images/default.png`); // Image de secours si elle n'existe pas
        }
    };

    return (
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
    );
};

export default ShopItem;