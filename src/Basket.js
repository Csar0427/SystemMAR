import React, { useState, useEffect } from 'react';
import './Basket.css';
import { writeOrderToDatabase } from './firebase';

const BasketSection = ({ basketItems, onRemoveItem, onReduceQuantity, addQuantity }) => {
  const [requestInput, setRequestInput] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basket, setBasket] = useState(basketItems);

  useEffect(() => {
    let totalPrice = 0;
    const filteredBasketItems = basket.filter(item => item.quantity > 0);
    filteredBasketItems.forEach((item) => {
      if (item.price && item.quantity) {
        totalPrice += parseFloat(item.price) * item.quantity;
      }
    });
    setTotalPrice(totalPrice);
  }, [basket]);

  const handleRequestChange = (e) => {
    if (!orderPlaced) {
      setRequestInput(e.target.value);
    }
  };

  const handlePlaceOrder = () => {
    const generatedTicketNumber = Math.floor(Math.random() * 1000000);
    setTicketNumber(generatedTicketNumber);
    setOrderPlaced(true);

    const itemsForOrder = basket
      .filter(item => item.quantity > 0)
      .map(({ name, size, price, quantity }) => ({
        name,
        size: typeof size === 'object' ? JSON.stringify(size) : size || "N/A",
        price,
        quantity
      }));

    writeOrderToDatabase({
      items: itemsForOrder,
      request: requestInput,
      ticketNumber: generatedTicketNumber,
      totalPrice: totalPrice
    });
  };

  const handleRemoveItem = (index) => {
    if (!orderPlaced) {
      onRemoveItem(index);
    }
  };

  const handleAddQuantity = (index, amount) => {
    if (!orderPlaced) {
      const updatedBasket = [...basket];
      updatedBasket[index].quantity += amount;
      setBasket(updatedBasket);
    }
  };

  const handleReduceQuantity = (index, amount) => {
    if (!orderPlaced) {
      const updatedBasket = [...basket];
      updatedBasket[index].quantity -= amount;

      if (updatedBasket[index].quantity <= 0) {
        updatedBasket.splice(index, 1);
      } else {
        updatedBasket[index].quantity = Math.max(updatedBasket[index].quantity, 0);
      }

      setBasket(updatedBasket);
    }
  };

  return (
    <div className="basket-section">
      <h2>Basket</h2>
     
      <div className="basket-items-container">
     
        {basket.map((item, index) => (
          <div key={index} className="basket-item">
            <img src={item.image} alt={item.name} />
            <p>
              {item.name} - <span className="item-price">Price: ₱ {item.price}</span><br />
              Quantity: {item.quantity}<br />
              Size: {item.size}
            </p>
            <button className="remove-button" onClick={() => handleReduceQuantity(index, 1)}>-</button>
            <button className="add-quantity-button" onClick={() => handleAddQuantity(index, 1)}>+</button>
          </div>
        ))}
      </div>
      {basket.length > 0 && (
        <div className="request-input">
          <textarea
            value={requestInput}
            onChange={handleRequestChange}
            placeholder="Any special requests? (e.g., No onions, extra sauce)"
            disabled={orderPlaced}
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
