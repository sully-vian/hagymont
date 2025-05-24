import BasketItem from './components/BasketItem';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EmptyBasket from './components/EmptyBasket';

function BasketList() {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [nbItems, setNbItems] = useState(0);

    const { purchases, basket, actualise, setState } = useOutletContext();

    const handleValidate = () => {
        navigate('/basket/review');
    };

    useEffect(() => {
        setState(1);
        if (purchases && purchases.length > 0) {
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
    }, [purchases]);

    return (
        <div className='p-5 mx-auto max-w-4xl'>
            {!purchases || purchases.length === 0 ? (
                <EmptyBasket/>
            ) : (
                <div class="rounded-lg border p-4">
                {purchases.map(purchase =>
                <BasketItem 
                    key={purchase.id} 
                    purchase={purchase} 
                    actualise={actualise} 
                    basketId = {basket.id}/>
                )}
                </div>
            )}

            {purchases.length !== 0 && (
                <div className="text-right mt-3">
                <hr className="border-none h-px bg-gray-300 my-3" />
                <p className="mr-5">
                    Your total ({nbItems} item{nbItems > 1 ? 's' : ''}) : <strong>{totalPrice} €</strong>
                </p>
                <button
                    onClick={handleValidate}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-1/3 hover:bg-green-700"
                >
                    Validate basket
                </button>
                </div>
            )}
        </div>
    );
};

export default BasketList;