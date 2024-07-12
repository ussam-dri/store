import { useState, useEffect } from "react";

export default function Example({ brand, id, gender }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend-mern-store.zelobrix.com/api/products/getByBrand/${brand}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching the product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brand, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
    
        <div className="grid grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            product._id !== id && product.gender === gender && (
              <a key={product._id} href={`/product/${product._id}`} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  {product.mainImage && product.mainImage.filename && (
                    <img
                      src={`https://backend-mern-store.zelobrix.com/download/${product.mainImage.filename}`}
                      alt={product.title}
                      className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-col justify-between">
                <h1 className="text-xs text-gray-700">{product.title}</h1>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    {Array.from({ length: product.rating }, (_, i) => (
                      <span key={i} className="star text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-900"><b>{product.price} MAD</b></p>
                </div>
              </div>
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
