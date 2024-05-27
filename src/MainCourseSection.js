import React, { useState } from "react";
import mainCourses from "./database/mainCourseDb";
import "./App.css";

const MainCourse = ({ addToBasket }) => {
  const [selectedMainCourse, setSelectedMainCourse] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false); // State for order added notification

  const handleItemClick = (mainCourse) => {
    setSelectedMainCourse(mainCourse);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedMainCourse(null);
    setDescriptionVisible(false);
    setQuantity(1);
  };

  const handleOrder = () => {
    if (selectedMainCourse && quantity > 0) {
      addToBasket({ ...selectedMainCourse, quantity });
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
      <h2>Main Courses</h2>
      <p>Indulge in our delightful main courses.</p>
      <div className="menu dessert-menu">
        {mainCourses.map((mainCourse, index) => (
          <div
            key={index}
            className={`item dessert-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
            onClick={() => handleItemClick(mainCourse)}
          >
            <img
              src={mainCourse.image}
              alt={mainCourse.name}
              className="dessert-image"
            />
            <div className="dessert-info">
              <h3>{mainCourse.name}</h3>
              <p className="price">{mainCourse.price}</p>
              <button onClick={() => handleItemClick(mainCourse)}>Order</button>
            </div>
          </div>
        ))}
      </div>
      {selectedMainCourse && descriptionVisible && (
        <div className="description dessert-description">
          <div className="description-content">
            <h3>{selectedMainCourse.name}</h3>
            <p>{selectedMainCourse.description}</p>
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

export default MainCourse;
