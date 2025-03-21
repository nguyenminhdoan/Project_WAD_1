import { useState } from "react";
import styles from "./AddProductForm.module.css";

const AddProductForm = ({ onClose, onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      amount: parseInt(amount),
      description,
      rating: 0,
      createdAt: new Date().toISOString(),
    };
    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>Add Product</h2>
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

          <button type="submit">Add Product</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;