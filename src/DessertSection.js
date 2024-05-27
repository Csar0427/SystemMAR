import React, { useState } from "react";
import desserts from "./database/dessertDb";
import "./App.css";

const DessertSection = ({ addToBasket }) => {
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false); // State for order added notification

  const handleItemClick = (dessert) => {
    setSelectedDessert(dessert);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedDessert(null);
    setDescriptionVisible(false);
    setQuantity(1);
  };

  const handleOrder = () => {
    if (selectedDessert && quantity > 0) {
      addToBasket({ ...selectedDessert, quantity });
      setOrderAdded(true); // Set order added notification to true
      handleCloseDescription();
      setTimeout(() => {
        setOrderAdded(false); // Reset order added notification after 2 seconds
      }, 2000);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    if (value === "" || parsedValue >= 1) {
      setQuantity(value === "" ? "" : parsedValue);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="section dessert-section">
      <h2>Desserts</h2>
      <p>Indulge in our delightful desserts.</p>
      <div className="menu dessert-menu">
        {desserts.map((dessert, index) => (
          <div
            key={index}
            className={`item dessert-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            onClick={() => handleItemClick(dessert)}
          >
            <img
              src={dessert.image}
              alt={dessert.name}
              className="dessert-image"
            />
            <div className="dessert-info">
              <h3>{dessert.name}</h3>
              <p className="price">{dessert.price}</p>
              <button onClick={() => handleItemClick(dessert)}>Order</button>
            </div>
          </div>
        ))}
      </div>
      {selectedDessert && descriptionVisible && (
        <div className="description dessert-description">
          <div className="description-content">
            <h3>{selectedDessert.name}</h3>
            <p>{selectedDessert.description}</p>
            <div className="quantity-counter">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
              />
            </div>
            <div className="button-group">
              <button className="close-button" onClick={handleCloseDescription}>
                Close
              </button>
              <button className="order-button" onClick={handleOrder}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
      {orderAdded && (
        <div className="order-notification">
          <p>Order added to basket!</p>
        </div>
      )}
    </div>
  );
};

export default DessertSection;
