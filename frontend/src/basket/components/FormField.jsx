const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

function FormField ({ label, name, value, error, onChange, type = "text", placeholder = "", required = false })  {
    return (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
    {error && <div className="invalid-feedback d-block">{error}</div>}
  </div>
);
}

export default FormField;