import { createPortal } from 'react-dom';

function FilterCard({ changes, handleChanges, onClose }) {
  const categories = ["all", "equipement", "accessory", "nutrition", "clothe"];

  const content = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Filter by price */}
        <div className="flex items-center gap-3 justify-center w-full mb-4">
          <p className="text-base text-gray-700 m-0">Filter by price</p>
          <input
            name="min"
            type="number"
            placeholder="min"
            min={0}
            value={changes.min}
            onChange={handleChanges}
            className="px-3 py-2 w-[80px] rounded border border-gray-300 text-base"
          />
          <p className="text-base text-gray-700">-</p>
          <input
            name="max"
            type="number"
            placeholder="max"
            min={0}
            value={changes.max}
            onChange={handleChanges}
            className="px-3 py-2 w-[80px] rounded border border-gray-300 text-base"
          />
          <p className="text-base text-gray-700">€</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                handleChanges({ target: { name: "category", value: category } })
              }
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                changes.category === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export default FilterCard;
