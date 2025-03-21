import { useState, useEffect } from 'react';
import { useGetProductsQuery, useCreateProductMutation } from '../features/products/productsApiSlice';


const ProductListPage = () => {
    const [productsList, setProductsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const {
        data: products = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useGetProductsQuery();

    const [getListProduct] = useCreateProductMutation();

    useEffect(() => {
        if (!isLoading && !isError && products.length > 0) {
            console.log("Products loaded successfully:", products);
        }
    }, [isLoading, isError, products]);


    // useEffect(() => {
    //     // Mock API Call ----> I cannot see any available API to fetch the profile data
    //     const fetchProducts = async () => {
    //         const response = await fetch('/api/products');
    //         const data = await response.json();
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // }, []);


    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleNextPage = () => setCurrentPage((prev) => prev + 1);
    const handlePrevPage = () => setCurrentPage((prev) => prev - 1);

    return (
        <div className="container">
            <h1>Product List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                                <button className="primary">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    className="secondary"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span>Page {currentPage}</span>

                <button
                    className="secondary"
                    onClick={handleNextPage}
                    disabled={indexOfLastProduct >= products.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductListPage;
