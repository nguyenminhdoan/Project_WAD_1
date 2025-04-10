import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from "../components/AddProductForm";
import {useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation, useGetProductByIdQuery } from '../features/products/productsApiSlice.js'
import { API_BASE_URL } from '../utils/constant.js'

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

// const API_BASE_URL = "http://localhost:5001"

const ProductListPage = () => {
    const { data: products = [], isLoading, isError, refetch} = useGetProductsQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [productToEdit, setProductToEdit] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);


    //const [products, setProducts] = useState(mockProducts); // Store local product state

    const productsPerPage = 5;
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [notification, setNotification] = useState(null);

    // Fetch Products from API
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await fetch(`${API_BASE_URL}/products`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setProducts(data);
    //             } else {
    //                 console.error("Failed to fetch products");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         }
    //     };
    //
    //     fetchProducts();
    // }, []);
    const {
        data: productDetails,
        isLoading: isLoadingDetails,
        isError: isErrorDetails
    } = useGetProductByIdQuery(editingProductId, {
        skip: !editingProductId,
    });

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddProduct = async (newProduct) => {
        try {
            const response = await createProduct(newProduct).unwrap();
            setNotification({ type: 'success', message: 'Product added successfully!' });
            setShowForm(false);
        } catch (error) {
            console.error('Failed to add product:', error);
            setNotification({ type: 'error', message: `Failed to add product: ${error.message || 'Unknown error'}` });
        }
    };

    // Handle Edit Product
    const handleEditProduct = async (updatedProduct) => {
        try {
            const response = await updateProduct({
                ...updatedProduct,
                _id: updatedProduct._id
            }).unwrap();

            setNotification({ type: 'success', message: 'Product updated successfully!' });
            setShowForm(false);
            setProductToEdit(null);
            refetch();
        } catch (error) {
            console.error('Failed to update product:', error);
            setNotification({ type: 'error', message: `Failed to update product: ${error.message || 'Unknown error'}` });
        }
    };

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

    //handle Add Product
    // const handleAddProduct = async (newProduct) => {
    //     try {
    //       const response = await fetch('http://localhost:5001/api/products/create', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newProduct),
    //       });
    //
    //       if (response.ok) {
    //         const savedProduct = await response.json();
    //         setProducts((prevProducts) => [...prevProducts, savedProduct]);
    //         setNotification({ type: 'success', message: 'Product added successfully!' });
    //       } else {
    //         setNotification({ type: 'error', message: 'Failed to add product.' });
    //       }
    //     } catch (error) {
    //       setNotification({ type: 'error', message: 'An error occurred while adding the product.' });
    //     }
    //
    //     // Hide notification after 3 seconds
    //     setTimeout(() => setNotification(null), 3000);
    // };
    // Open form for editing
    const handleOpenEditForm = (productId) => {
        setEditingProductId(productId);
    };

    // Handle form close
    const handleCloseForm = () => {
        setShowForm(false);
        setProductToEdit(null);
    };

    // Effect to show form after product details are fetched
    useEffect(() => {
        // When product details are loaded and we're in edit mode
        if (productDetails && editingProductId) {
            setShowForm(true);
        }
    }, [productDetails, editingProductId]);

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
                <button
                    className="primary"
                    onClick={() => { setEditingProductId(null); setShowForm(true); }}
                >
                    ➕ Add Product
                </button>
            </div>

            {/* Product Table */}
            <table>
                <thead>
                <tr>
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
                                    <span
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        style={{ cursor: 'pointer', color: 'inherit' }}
                                    >
                                        {product.name}
                                    </span>
                            </td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{`${product.amount ? product.amount : 0}`}</td>
                            <td>
                                <button
                                    className="primary"
                                    onClick={() => handleOpenEditForm(product._id)}
                                    disabled={isLoadingDetails && editingProductId === product._id}
                                >
                                    {isLoadingDetails && editingProductId === product._id ? "Loading..." : "Edit"}
                                </button>
                                <button
                                    className="secondary"
                                    style={{ marginLeft: "8px", backgroundColor: "#ff4d4d", color: "white" }}
                                    onClick={() => handleDelete(product._id)}
                                    disabled={isDeleting}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No products available</td>
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

            {/* Form Modal - Only show when needed */}
            {showForm && (
                <AddProductForm
                    onClose={handleCloseForm}
                    onAddProduct={handleAddProduct}
                    onEditProduct={handleEditProduct}
                    productToEdit={editingProductId ? productDetails : null}
                    isLoading={isLoadingDetails}
                />
            )}
        </div>
    );


};

export default ProductListPage;
