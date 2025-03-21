import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    setError("Product not found.");
                }
            } catch (err) {
                setError("Failed to load product.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="container">
            <h1>{product.name}</h1>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Amount:</strong> {product.amount ?? 0}</p>
            <p><strong>Description:</strong> {product.description}</p>
        </div>
    );
};

export default ProductPage;