import apiService from "../../utils/APIService";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProductEdit() {
    const location = useLocation();
    const product = location.state?.product;
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [productForm, setProductForm] = useState({
        name: product?.name || '',
        price: product?.price || '',
        stock: product?.stock || '',
        category: product?.category || '',
        description: product?.description || '',
        sizes: product?.sizes || null,
        colors: product?.colors || null,
        });
    const [errors, setErrors] = useState({});
    
    const handleValidate = () => {
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(productForm)], { type: "application/json" }));
        if (image) {
            formData.append("image", image);
        }

        if (!product){
            //Create product
            console.log(productForm);
            apiService.postRequest("/products", formData)
            .then(response => {
                setProductForm(response.data);
                navigate(`/products/${response.data.id}`);
            })
            .catch(error => {
                console.error('Erreur détectée :', error);
                navigate('/error', { state: error.status });
            });
        }else{
            //Update product
            apiService.patchMultipartRequest(`/products/${product.id}`, formData)
            .then(response => {
                setProductForm(response.data);
                navigate(`/products/${response.data.id}`);
            })
            .catch(error => {
                console.error('Erreur détectée :', error);
                navigate('/error', { state: error.status });
            });
        }
    };



    const handleChanges = (e) => {
        const value = e.target.value === '' ? null : e.target.value
        const newChanges = { ...productForm, [e.target.name]: value };
        setProductForm(newChanges);

        if (errors[e.target.name]) {
        setErrors({
            ...errors,
            [e.target.name]: null
        });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!productForm.name) newErrors.name = 'Name of the product is required';
        if (!productForm.price) newErrors.price = 'Price is required';
        if (!productForm.stock) newErrors.stock = 'Stock is required';
        if (!productForm.category || productForm.category==="") newErrors.category = 'Category is required';
        if (!productForm.description) newErrors.description = 'Description is required';
        if (!product && !image) newErrors.photo = 'Photo is required'; // Photo necessaire pour creation produit
        if (productForm.stock && !parseInt(productForm.stock)) newErrors.stock = 'Stock must be an integer';
        if (productForm.price && !parseFloat(productForm.price)) newErrors.price = 'Price must be a number';
        if (productForm.sizes && !productForm.sizes.includes('/')) newErrors.sizes = "Sizes must be in the format 'S/M/L' and include at least two sizes.";
        if (productForm.colors && !productForm.colors.includes('/')) newErrors.colors = "Colors must be in the format 'blue/red/black' and include at least two colors.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{product ? "Update" : "Create"} Product</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                <input
                name="name"
                type="text"
                value={productForm.name}
                onChange={handleChanges}
                required
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                <input
                name="price"
                type="text"
                value={productForm.price}
                onChange={handleChanges}
                required
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>

            {/* Stock */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                <input
                name="stock"
                type="text"
                value={productForm.stock}
                onChange={handleChanges}
                required
                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                />
                {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <select
                name="category"
                value={productForm.category}
                onChange={handleChanges}
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                >
                <option value="">-- Select --</option>
                <option value="equipement">equipement</option>
                <option value="clothe">clothe</option>
                <option value="accessory">accessory</option>
                <option value="nutrition">nutrition</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            {/* Sizes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (ex: S/M/L)</label>
                <input
                name="sizes"
                type="text"
                value={productForm.sizes}
                onChange={handleChanges}
                className={`form-control ${errors.sizes ? 'is-invalid' : ''}`}
                />
                {errors.sizes && <div className="invalid-feedback">{errors.sizes}</div>}
            </div>

            {/* Colors */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Colors (ex: black/red/blue)</label>
                <input
                name="colors"
                type="text"
                value={productForm.colors}
                onChange={handleChanges}
                className={`form-control ${errors.colors ? 'is-invalid' : ''}`}
                />
                {errors.colors && <div className="invalid-feedback">{errors.colors}</div>}
            </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                    name="description"
                    rows={4}
                    value={productForm.description}
                    onChange={handleChanges}
                    required
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            {/* Photo (placeholder) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo* (only .png files allowed)</label>
                <input
                    name="photo"
                    type="file"
                    accept="image/png"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0 file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 form-control ${errors.description ? 'is-invalid' : ''}`}
                />
                {errors.photo && <div className="invalid-feedback">{errors.photo}</div>}
            </div>
            <div>*required</div>

            <div className="pt-6 text-right">
                <button
                    onClick={handleValidate} 
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg transition"
                >
                    {product ? "Update" : "Create"}
                </button>
            </div>
        </div>
        );

}

export default ProductEdit