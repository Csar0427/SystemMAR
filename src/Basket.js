// Basket.js
import React, { useState, useEffect } from 'react';
import './Basket.css';
import { writeOrderToDatabase } from './firebase'; // Import the writeOrderToDatabase function

const BasketSection = ({ basketItems, onRemoveItem, onReduceQuantity, addQuantity }) => {
  const [requestInput, setRequestInput] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null); // State to store the ticket number
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if the order has been placed
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price

  // Calculate total price
  useEffect(() => {
    let totalPrice = 0;
    const filteredBasketItems = basketItems.filter(item => item.quantity > 0);
    filteredBasketItems.forEach((item) => {
      if (item.price && item.quantity) {
        if (item.size && item.price[item.size]) {
          const price = parseFloat(item.price[item.size].replace(' pesos', ''));
          totalPrice += price * item.quantity;
        } else {
          totalPrice += parseFloat(item.price.replace(' pesos', '')) * item.quantity;
        }
      }
    });
    setTotalPrice(totalPrice);
  }, [basketItems]);

  // Handle request change
  const handleRequestChange = (e) => {
    // Allow changes only if the order hasn't been placed
    if (!orderPlaced) {
      setRequestInput(e.target.value);
    }
  };

  // Handle place order
  const handlePlaceOrder = () => {
    const generatedTicketNumber = Math.floor(Math.random() * 1000000);
    setTicketNumber(generatedTicketNumber);
    setOrderPlaced(true);
  
    // Filter out items with quantity > 0 and ensure 'size' property is defined
    const validItems = basketItems.filter(item => item.quantity > 0 && item.size);
  
    // Extract relevant item data for the order
    const itemsForOrder = validItems.map(({ name, size, price, quantity }) => ({
      name,
      size,
      price,
      quantity
    }));
  
    // Write the order to the Firebase database
    writeOrderToDatabase({
      items: itemsForOrder,
      request: requestInput,
      ticketNumber: generatedTicketNumber,
      totalPrice: totalPrice
    });
  };
  

  // Handle remove item
  const handleRemoveItem = (index) => {
    if (!orderPlaced) {
      onRemoveItem(index);
    }
  };

  // Handle add quantity
  const handleAddQuantity = (index, amount) => {
    if (!orderPlaced) {
      addQuantity(index, amount);
    }
  };

  const handleReduceQuantity = (index) => {
    if (!orderPlaced) {
      const updatedBasketItems = [...basketItems];
      const updatedItem = { ...updatedBasketItems[index] };
      updatedItem.quantity -= 1;
      if (updatedItem.quantity === 0) {
        // Remove the item if quantity becomes 0
        updatedBasketItems.splice(index, 1);
      } else {
        // Ensure that the 'size' property is defined
        if (!updatedItem.size) {
          // If 'size' is not defined, set it to a default value or handle it appropriately
          updatedItem.size = 'defaultSize';
        }
        updatedBasketItems[index] = updatedItem;
      }
      // Update the state with the updated basket items array
      onReduceQuantity(updatedBasketItems);
    }
  };
  

  return (
    <div className="basket-section">
      <h2>Basket</h2>
      <div className="basket-items-container">
        {basketItems.map((item, index) => (
          <div key={index} className="basket-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name} - <span className="item-price">Price: ${item.price && item.size && item.price[item.size]}</span><br/>Quantity: {item.quantity}</p>
            <button className="remove-button" onClick={() => handleReduceQuantity(index)}>-</button>
            <button className="add-quantity-button" onClick={() => handleAddQuantity(index, 1)}>+</button>
          </div>
        ))}
      </div>
      {basketItems.length > 0 && (
        <div className="request-input">
          <textarea
            value={requestInput}
            onChange={handleRequestChange}
            placeholder="Any special requests? (e.g., No onions, extra sauce)"
            disabled={orderPlaced} // Disable textarea if order has been placed
          />
        </div>
      )}
      <div className="total-price">
        Total Price: ₱{totalPrice.toFixed(2)}
      </div>
      {orderPlaced && (
        <p>Ticket Number: {ticketNumber}</p>
      )}
      {!orderPlaced && (
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default BasketSection;
