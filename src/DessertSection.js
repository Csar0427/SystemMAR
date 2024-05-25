// ar menu -> qr code
// qr code -> order


import React, { useState } from 'react';
import desserts from "./database/dessertDb"
import './App.css';

const DessertSection = ({ addToBasket }) => {

  const [selectedDessert, setSelectedDessert] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleItemClick = (index) => {
    setSelectedDessert(desserts[index]);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedDessert(null);
    setDescriptionVisible(false);
  };

  const handleOrder = () => {
    // Handle order logic here, you can use selectedDessert and quantity state
    if (selectedDessert && quantity > 0) {
      addToBasket({ ...selectedDessert, quantity });
      setSelectedDessert(null);
      setQuantity(1);
    }
  };

  return (
    <div className="dessert-section">
      <h2>Desserts</h2>
      <p>Indulge in our delightful desserts.</p>
     
      <div className="dessert-menu">
        
        {desserts.map((dessert, index) => (
          <div key={index} className="dessert-item" onClick={() => handleItemClick(index)}>
            <div className="column-left">
              <h3>{dessert.name}</h3>
              <p>{dessert.price}</p>
              <button>View</button>
              <button onClick={() => { setSelectedDessert(dessert); setDescriptionVisible(true); }}>Order</button>
            </div>
            <div className="column-right">
              <img src={dessert.image} alt={dessert.name} />
            </div>
          </div>
        ))}
      </div>
      {selectedDessert && descriptionVisible && (
        <div className="dessert-description">
          <div className="description-content">
            <h3>{selectedDessert.name}</h3>
            <p>{selectedDessert.description}</p>
            <div className="quantity-counter">
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ width: '50px', fontSize: '14px' }} />
            </div>
            <div className="button-group">
              <button onClick={handleCloseDescription}>Close</button>
              <button onClick={handleOrder}>Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DessertSection;
