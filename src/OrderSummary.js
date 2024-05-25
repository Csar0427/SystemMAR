import React from 'react';
import './OrderSummary.css'; // Import specific CSS for OrderSummary

const OrderSummary = ({ basketItems, ticketNumber }) => {
  console.log("Ticket Number:", ticketNumber); // Debugging: Log ticketNumber to check if data is received correctly
  console.log("Basket Items:", basketItems); // Debugging: Log basketItems to check if data is received correctly

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <div className="order-details">
        <h3>Order Details</h3>
        <ul>
          {basketItems && basketItems.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <p>Ticket Number: {ticketNumber}</p>
        {/* Additional summary information can be added here */}
      </div>
    </div>
  );
};

export default OrderSummary;
