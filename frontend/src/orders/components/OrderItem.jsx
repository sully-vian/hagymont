function OrderItem({ order }) {
    const printDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR');
    };

    const colorEnum = (status) => {
        const colors = {
            "pending": "bg-blue-100 text-blue-800",
            "confirmed": "bg-green-100 text-green-800",
            "shipped": "bg-yellow-100 text-yellow-800",
            "completed": "bg-red-100 text-red-800"
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div key={order.id} className="p-4 border rounded-md shadow-sm mb-2">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold">Order n°{order.id}</p>
                    <p className="text-sm text-gray-600">{printDate(order.createdAt)}</p>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorEnum(order.status)}`}>
                    {order.status}
                </div>
            </div>
        </div>

    );
};

export default OrderItem;
