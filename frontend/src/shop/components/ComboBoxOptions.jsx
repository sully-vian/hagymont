import React, { useState } from 'react';

function ComboBoxOption({label = 'Select an option', values, onChange, name = 'combo' }) {
  const options = values.split('/').filter(Boolean).map(v => v[0].toUpperCase() + v.slice(1));
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 w-64">
        <label htmlFor={name} className="text-gray-700 font-semibold w-20">
            {label}
        </label>
        <select
            id={name}
            value={selected}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">-- Select --</option>
            {options.map((opt) => (
            <option key={opt} value={opt}>
                {opt}
            </option>
            ))}
        </select>
        </div>
  );
}

export default ComboBoxOption;
