import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from "../components/AddProductForm";

// Mock Product Data
const mockProducts = [
    {
        _id: "64f8a3c2e4b1f2d3c4b5a6b7",
        name: "Apple MacBook Pro 16-inch",
        description: "Apple M3 Pro chip, 16GB RAM, 512GB SSD, 16-inch Retina Display",
        price: 2499.99,
        rating: 4.8,
        image: "https://example.com/images/macbook-pro-16.jpg",
        createdAt: "2023-09-06T12:34:26.789Z",
    },
    {
        _id: "64f8a3c2e4b1f2d3c4b5a6b8",
        name: "Dell XPS 15",
        description: "Intel Core i9, 32GB RAM, 1TB SSD, 4K OLED Display",
        price: 2199.99,
        rating: 4.7,
        image: "https://example.com/images/dell-xps-15.jpg",
        createdAt: "2023-09-10T15:21:56.489Z",
    },
    {
        _id: "64f8a3c2e4b1f2d3c4b5a6b9",
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch FHD Display",
        price: 1799.99,
        rating: 4.6,
        image: "https://example.com/images/thinkpad-x1-carbon.jpg",
        createdAt: "2023-09-12T10:12:30.123Z",
    },
];

const ProductListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    //const [products, setProducts] = useState(mockProducts); // Store local product state
    const [products, setProducts] = useState([]); // start will empty list, be ready to take data from database
    const productsPerPage = 5;
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState(null);

    // Fetch Products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle Delete Action
    const handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const updatedProducts = products.filter((product) => product._id !== productId);
            setProducts(updatedProducts);
        }
    };

    //handle Add Product
    const handleAddProduct = async (newProduct) => {
        try {
          const response = await fetch('http://localhost:5001/api/products/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
          });
      
          if (response.ok) {
            const savedProduct = await response.json();
            setProducts((prevProducts) => [...prevProducts, savedProduct]);
            setNotification({ type: 'success', message: 'Product added successfully!' });
          } else {
            setNotification({ type: 'error', message: 'Failed to add product.' });
          }
        } catch (error) {
          setNotification({ type: 'error', message: 'An error occurred while adding the product.' });
        }
      
        // Hide notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="container">
            <div className="flex-between mb-2">

            {notification && (
                <div
                    style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: notification.type === 'success' ? '#155724' : '#721c24',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                    zIndex: 9999,
                    }}
                >
                    {notification.message}
                </div>
            )}

                <h1>Product List</h1>
                <button className="primary" onClick={() => setShowForm(true)}>
                    ➕ Add Product
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img src={product.image} alt={product.name} width="50" />
                                </td>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.amount}</td>
                                <td>
                                    <button className="primary">Edit</button>
                                    <button
                                        className="secondary"
                                        style={{ marginLeft: "8px", backgroundColor: "#ff4d4d", color: "white" }}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    className="secondary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span>Page {currentPage}</span>

                <button
                    className="secondary"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={indexOfLastProduct >= products.length}
                >
                    Next
                </button>
            </div>

            {showForm && (
                <AddProductForm
                    onClose={() => setShowForm(false)}
                    onAddProduct={handleAddProduct}
                />
            )}
        </div>
    );
};

export default ProductListPage;
