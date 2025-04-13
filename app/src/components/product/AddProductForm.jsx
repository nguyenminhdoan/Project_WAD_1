import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from "@mui/material";

const AddProductForm = ({ onClose, onAddProduct, onEditProduct, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    amount: "",
    description: ""
  });
  const isEditing = Boolean(productToEdit);

  useEffect(() => {
    // Check if we're in edit mode and have product details
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        price: productToEdit.price ? productToEdit.price.toString() : "",
        amount: productToEdit.amount ? productToEdit.amount.toString() : "",
        description: productToEdit.description || ""
      });
    } else {
      // Reset form when not editing
      setFormData({
        name: "",
        price: "",
        amount: "",
        description: ""
      });
    }
  }, [productToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      amount: parseInt(formData.amount),
      description: formData.description,
    };

    if (isEditing && productToEdit) {
      // When editing, include the ID and call the edit function
      onEditProduct({
        ...productData,
        _id: productToEdit._id,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // When adding new product
      onAddProduct({
        ...productData,
        createdAt: new Date().toISOString(),
      });
    }

    onClose();
  };

  return (
      <Dialog
          open={true}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
      >
        <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
            />
            <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                inputProps={{ step: "0.01" }}
                fullWidth
                required
            />
            <TextField
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                type="number"
                fullWidth
                required
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default AddProductForm;