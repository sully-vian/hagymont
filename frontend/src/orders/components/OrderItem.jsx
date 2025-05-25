function OrderItem({order}){
     const printDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR');
    };

    return (
        <div className="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 hover:shadow transition-shadow" key={order.id}>
            <p>{order.id} {"("}{printDate(order.createdAt)}{")"} {"->"} {order.status} </p>
        </div>
    )
};

export default OrderItem;