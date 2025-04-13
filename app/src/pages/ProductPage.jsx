import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductList from "../components/product/ProductList.jsx";
import AddProductForm from "../components/product/AddProductForm.jsx";
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from "../features/products/productsApiSlice.js";

const ProductPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    // RTK Query hooks
    const { data: products = [], isLoading, error: fetchError, refetch } = useGetProductsQuery();
    const [addProduct, { isLoading: isAdding }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    // Determine if any operation is loading
    const loading = isLoading || isAdding || isUpdating || isDeleting;

    const handleAddProduct = async (newProduct) => {
        try {
            await addProduct(newProduct).unwrap();
            setShowModal(false);
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Failed to add product: " + err.data?.message || err.error);
        }
    };

    const handleEditProduct = async (updatedProduct) => {
        try {

           const response =  await updateProduct({...updatedProduct,  _id: updatedProduct._id}).unwrap();
            refetch();
            setShowModal(false);
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Failed to update product: " + err.data?.message || err.error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            await deleteProduct(productId).unwrap();
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product: " + err.data?.message || err.error);
        }
    };

    const handleOpenAddModal = () => {
        setProductToEdit(null);
        setShowModal(true);
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setProductToEdit(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Products Management
            </Typography>

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenAddModal}
                sx={{ mb: 3 }}
                disabled={loading}
            >
                Add Product
            </Button>

            {fetchError && (
                <Typography color="error" sx={{ mb: 2 }}>
                    Failed to load products. Please try again.
                </Typography>
            )}

            {isLoading && !showModal ? (
                <Typography>Loading products...</Typography>
            ) : (
                <ProductList
                    products={products}
                    onEditProduct={handleEditClick}
                    onDeleteProduct={handleDeleteProduct}
                    isLoading={loading}
                />
            )}

            {showModal && (
                <AddProductForm
                    onClose={handleCloseModal}
                    onAddProduct={handleAddProduct}
                    onEditProduct={handleEditProduct}
                    productToEdit={productToEdit}
                    isLoading={loading}
                />
            )}
        </Container>
    );
};

export default ProductPage;