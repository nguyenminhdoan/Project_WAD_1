import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useGetProductsQuery, useDeleteProductMutation } from '../features/products/productsApiSlice.js'

// Mock Product Data
// const mockProducts = [
//     {
//         _id: "64f8a3c2e4b1f2d3c4b5a6b7",
//         name: "Apple MacBook Pro 16-inch",
//         description: "Apple M3 Pro chip, 16GB RAM, 512GB SSD, 16-inch Retina Display",
//         price: 2499.99,
//         rating: 4.8,
//         image: "https://example.com/images/macbook-pro-16.jpg",
//         createdAt: "2023-09-06T12:34:26.789Z",
//     },
//     {
//         _id: "64f8a3c2e4b1f2d3c4b5a6b8",
//         name: "Dell XPS 15",
//         description: "Intel Core i9, 32GB RAM, 1TB SSD, 4K OLED Display",
//         price: 2199.99,
//         rating: 4.7,
//         image: "https://example.com/images/dell-xps-15.jpg",
//         createdAt: "2023-09-10T15:21:56.489Z",
//     },
//     {
//         _id: "64f8a3c2e4b1f2d3c4b5a6b9",
//         name: "Lenovo ThinkPad X1 Carbon",
//         description: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch FHD Display",
//         price: 1799.99,
//         rating: 4.6,
//         image: "https://example.com/images/thinkpad-x1-carbon.jpg",
//         createdAt: "2023-09-12T10:12:30.123Z",
//     },
// ];

const API_BASE_URL = "http://localhost:5001"

const ProductListPage = () => {
    const { data: products = [], isLoading, isError, refetch} = useGetProductsQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    console.log(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsList, setProductsList] = useState(products); // Store local product state
    const productsPerPage = 5;
    const navigate = useNavigate();

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle Delete Action
    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(productId);
                refetch();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="flex-between mb-2">
                <h1>Product List</h1>
                <button className="primary" onClick={() => navigate('/product/add')}>
                    ➕ Add Product
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        {/*<th>Image</th>*/}
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
                                {/*<td>*/}
                                {/*    <img src={`${API_BASE_URL}${product.image}`} alt={product.name} width="50" />*/}
                                {/*</td>*/}
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{`${product.amount ? product.amount : 0}`}</td>
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
        </div>
    );
};

export default ProductListPage;
