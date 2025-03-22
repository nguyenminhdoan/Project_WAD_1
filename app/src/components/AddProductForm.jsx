import { useState, useEffect } from "react";
import styles from "./AddProductForm.module.css";

const AddProductForm = ({ onClose, onAddProduct, onEditProduct, productToEdit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check if we're in edit mode and have product details
    if (productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price ? productToEdit.price.toString() : "");
      setAmount(productToEdit.amount ? productToEdit.amount.toString() : "");
      setDescription(productToEdit.description || "");
      setIsEditing(true);
    } else {
      // Reset form when not editing
      setName("");
      setPrice("");
      setAmount("");
      setDescription("");
      setIsEditing(false);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price: parseFloat(price),
      amount: parseInt(amount),
      description,
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
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Price</label>
            <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <label>Amount</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <label>Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
                style={{ resize: "none" }}
            />

            <button type="submit">
              {isEditing ? "Update Product" : "Add Product"}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
  );
};

export default AddProductForm;
