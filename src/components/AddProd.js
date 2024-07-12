import { useState } from "react";
import PortailHeader from "./Layouts/PortailHeader";
import Footer from "./Layouts/Footer";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast, ToastContainer } from 'react-toastify';

const AddProduct = () => {
  const auth = useAuthUser()
  const [product, setProduct] = useState({
    tag: '',
    title: '',
    price: '',
    description: '',
    rating: '',
    gender: '',
    mainImage: null,
    productImages: [],
    colors: [],
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleMainImageChange = (e) => {
    setProduct({ ...product, mainImage: e.target.files[0] });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, productImages: files });
  };

  const handleColorChange = (e, index) => {
    const { name, value } = e.target;
    const updatedColors = [...product.colors];
    updatedColors[index] = { ...updatedColors[index], [name]: value };
    setProduct({ ...product, colors: updatedColors });
  };

  const handleSizeChange = (e, colorIndex, sizeIndex) => {
    const { value } = e.target;
    const updatedColors = [...product.colors];
    const updatedSizes = [...updatedColors[colorIndex].sizes];
    updatedSizes[sizeIndex] = value;
    updatedColors[colorIndex] = { ...updatedColors[colorIndex], sizes: updatedSizes };
    setProduct({ ...product, colors: updatedColors });
  };

  const addColor = () => {
    setProduct({
      ...product,
      colors: [...product.colors, { name: '', image: '', sizes: [''] }],
    });
  };

  const removeColor = (index) => {
    const updatedColors = product.colors.filter((_, i) => i !== index);
    setProduct({ ...product, colors: updatedColors });
  };

  const addSize = (colorIndex) => {
    const updatedColors = [...product.colors];
    updatedColors[colorIndex].sizes.push('');
    setProduct({ ...product, colors: updatedColors });
  };

  const removeSize = (colorIndex, sizeIndex) => {
    const updatedColors = [...product.colors];
    updatedColors[colorIndex].sizes = updatedColors[colorIndex].sizes.filter((_, i) => i !== sizeIndex);
    setProduct({ ...product, colors: updatedColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tag', product.tag);
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('rating', product.rating);
    formData.append('gender', product.gender);
    formData.append('sellerID', auth.id);

    if (product.mainImage) {
      formData.append('mainImage', product.mainImage);
    }

    product.productImages.forEach((image) => {
      formData.append('productImages', image);
    });

    product.colors.forEach((color) => {
      formData.append('colors', JSON.stringify(color));
    });

    try {
      const response = await fetch('https://backend-mern-store.zelobrix.com/addProduct', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Product added to Store', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error uploading product');
      console.error(error);
    }
  };

  return (
    <>
    <PortailHeader></PortailHeader>
    <ToastContainer />

    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                name="tag"
                value={product.tag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="text"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={product.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-1">
                Main Image
              </label>
              <input
                type="file"
                name="mainImage"
                onChange={handleMainImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
                Product Images
              </label>
              <input
                type="file"
                name="productImage"
                onChange={handleFileChange}
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Product Variants</h3>
          <div className="space-y-4">
            {product.colors.map((color, index) => (
              <div key={index} className="space-y-2 border-b pb-4 mb-4">
                <label htmlFor={`color-${index}`} className="block text-sm font-medium text-gray-700">
                  Color {index + 1}
                </label>
                <input
                  type="text"
                  name="name"
                  value={color.name || ''}
                  onChange={(e) => handleColorChange(e, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <label htmlFor={`colorImage-${index}`} className="block text-sm font-medium text-gray-700">
                  Color Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleColorChange(e, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <div className="grid grid-cols-2 gap-2">
                  {color.sizes.map((size, sizeIndex) => (
                    <input
                      key={sizeIndex}
                      type="text"
                      name={`size-${index}-${sizeIndex}`}
                      value={size || ''}
                      onChange={(e) => handleSizeChange(e, index, sizeIndex)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Size ${sizeIndex + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addSize(index)}
                  className="mt-2 text-indigo-600 hover:text-indigo-900"
                >
                  Add Size
                </button>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="mt-2 ml-4 text-red-600 hover:text-red-900"
                >
                  Remove Color
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColor}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Add Color
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Product
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
    <Footer></Footer>
    </>
  );
};

export default AddProduct;