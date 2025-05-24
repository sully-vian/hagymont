import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function OrderReview(){
    const {basket, setState } = useOutletContext();
    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate('/basket/payment');
    };

    useEffect(() => {
        setState(2);
    }, []);

    return (
        <div className="flex justify-center">
            <button
                    onClick={handleConfirm}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-1/3 hover:bg-green-700"
                >
                    Confirm review
                </button>

        </div>
    );

}

export default OrderReview;