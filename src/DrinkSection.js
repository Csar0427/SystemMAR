import React, { useState } from 'react';
import drinks from "./database/drinksDb";
import './App.css';

const DrinkSection = ({ addToBasket }) => {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false); // State for order added notification

  const handleItemClick = (drink) => {
    setSelectedDrink(drink);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedDrink(null);
    setDescriptionVisible(false);
    setSelectedSize(null);
    setQuantity(1);
  };

  const handleOrder = () => {
    if (selectedDrink && selectedSize && quantity > 0) {
      const price = selectedDrink.price[selectedSize]; // Extract the correct price for the selected size
      addToBasket({ ...selectedDrink, size: selectedSize, price, quantity });
      setOrderAdded(true); // Set order added notification to true
      handleCloseDescription();
      setTimeout(() => {
        setOrderAdded(false); // Reset order added notification after 2 seconds
      }, 2000);
    }
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    if (value === '' || (parsedValue >= 1)) {
      setQuantity(value === '' ? '' : parsedValue);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="section dessert-section">
      <h2>Drinks</h2>
      <p>Quench your thirst with our refreshing drinks.</p>
      <div className="menu dessert-menu">
        {drinks.map((drink, index) => (
          <div key={index} className="item dessert-item" onClick={() => handleItemClick(drink)}>
            <img src={drink.image} alt={drink.name} />
            <div className="dessert-info">
              <h3>{drink.name}</h3>
              <button onClick={() => handleItemClick(drink)}>Order</button>
            </div>
          </div>
        ))}
      </div>
      {selectedDrink && descriptionVisible && (
        <div className="description dessert-description">
          <div className="description-content">
            <h3>{selectedDrink.name}</h3>
            <p>{selectedDrink.description}</p>
            <div className="size-options">
              {selectedDrink.sizes.map((size, index) => (
                <button
                  key={index}
                  className={selectedSize === size ? 'selected' : ''}
                  onClick={() => handleSelectSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="quantity-counter">
              <label>Quantity:</label>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                style={{ width: '50px', fontSize: '14px' }} 
              />
            </div>
            <div className="button-group">
              <button className="close-button" onClick={handleCloseDescription}>Close</button>
              <button className="order-button" onClick={handleOrder}>Order Now</button>
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
}

export default DrinkSection;
