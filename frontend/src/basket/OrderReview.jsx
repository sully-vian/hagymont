import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../utils/APIService";
function OrderReview(){
    const {basket, setState } = useOutletContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setState(2);
    }, []);

    const validateForm = () => {
        const newErrors = {};
        newErrors.address = (!formData.address) ? 'Address is required' : null;
        newErrors.zip = (!formData.zip) ? 'ZIP code is required' : null;
        newErrors.city = (!formData.city) ? 'City date is required' : null;
        newErrors.country = (!formData.country) ? 'Country is required' : null;
        
        const zipRegex = /[0-9]{5,}/;
        newErrors.zip = (formData.zip && !zipRegex.test(formData.zip)) ? 
        'Invalid ZIP code'
        : newErrors.zip ;

        setErrors(newErrors);
        return Object.values(newErrors).every(v => v===null);
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
    }

    const handleConfirm = () => {
        if (!validateForm()) return;
        const newAddress = Object.values(formData).join('\n');
        console.log(newAddress);
        apiService.patchRequest(`/baskets/update/${basket.id}`, {address: newAddress})
        .then(_ => {
          navigate('/basket/payment');
        })
        .catch(error => {
            console.error('Erreur détectée :', error);
            navigate('/error', { state: error.status });
        });
    };

    return (
        <div className="flex justify-center items-start p-6 bg-gray-50 min-h-screen">
            <div className="w-full max-w-xl bg-white p-6 rounded shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Address Information</h2>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-600">Address</label>
                <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
                placeholder="123 Main Street"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                <div className="text-red-600 text-sm mt-1">
                    {errors.address}
                </div>
                )}
            </div>

            {/* ZIP + City */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                <label className="mb-1 font-medium text-gray-600">ZIP Code</label>
                <input
                    type="text"
                    name="zip"
                    onChange={handleChange}
                    value={formData.zip}
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.zip && (
                    <div className="text-red-600 text-sm mt-1">
                    {errors.zip}
                    </div>
                )}
                </div>

                <div className="flex flex-col w-full">
                <label className="mb-1 font-medium text-gray-600">City</label>
                <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.city && (
                    <div className="text-red-600 text-sm mt-1">
                    {errors.city}
                    </div>
                )}
                </div>
            </div>

            {/* Country */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-600">Country</label>
                <input
                type="text"
                name="country"
                onChange={handleChange}
                value={formData.country}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.country && (
                <div className="text-red-600 text-sm mt-1">
                    {errors.country}
                </div>
                )}
            </div>

            {/* Confirm Button */}
            <div className="flex justify-end">
                <button
                onClick={handleConfirm}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                Confirm review
                </button>
            </div>
            </div>
        </div>
        );
}

export default OrderReview;