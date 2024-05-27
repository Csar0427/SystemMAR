import React, { useState, useEffect } from "react";
import "./Basket.css";
import { writeOrderToDatabase } from "./firebase";

const BasketSection = ({
  basketItems,
  onRemoveItem,
  onReduceQuantity,
  addQuantity,
}) => {
  const [requestInput, setRequestInput] = useState("");
  const [ticketNumber, setTicketNumber] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [basket, setBasket] = useState(basketItems);

  useEffect(() => {
    let totalPrice = 0;
    const filteredBasketItems = basket.filter((item) => item.quantity > 0);
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
      .filter((item) => item.quantity > 0)
      .map(({ name, size, price, quantity }) => ({
        name,
        size: typeof size === "object" ? JSON.stringify(size) : size || "N/A",
        price,
        quantity,
      }));

    writeOrderToDatabase({
      items: itemsForOrder,
      request: requestInput,
      ticketNumber: generatedTicketNumber,
      totalPrice: totalPrice,
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
        updatedBasket[index].quantity = Math.max(
          updatedBasket[index].quantity,
          0
        );
      }

      setBasket(updatedBasket);
    }
  };

  return (
    <div className="basket-section">
      <h2>Order Summary</h2>
      <div className="basket-items-container">
        {basket
          .filter((item) => item.quantity > 0)
          .map((item, index) => (
            <div key={index} className="basket-item-container">
              <b className="order-name">{item.name}</b>
              <div className="basket-item">
                <img src={item.image} alt={item.name} />
                <div className="orders">
                  <span>
                    <b>Price:</b> {item.price}
                  </span>
                  <br />
                  <span>
                    <b>Quantity:</b> {item.quantity}
                  </span>
                  <br />
                  <span>
                    <b>Size:</b> {item.size}
                  </span>
                </div>
                <div className="buttons-container">
                  <button
                    className="remove-button"
                    onClick={() => handleReduceQuantity(index, 1)}
                  >
                    -
                  </button>
                  <button
                    className="add-quantity-button"
                    onClick={() => handleAddQuantity(index, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {basket.length > 0 && (
        <div className="request-input">
          <textarea
            value={requestInput}
            onChange={handleRequestChange}
            placeholder="Do you have any specific requests?"
            disabled={orderPlaced}
          />
        </div>
      )}
      <div className="total-price">Total Price: ₱{totalPrice.toFixed(2)}</div>
      {orderPlaced && (
        <>
          <p className="ticket-number">Ticket Number: {ticketNumber}</p>
          <p className="ticket-note">
            Please show this ticket number to the waiter.
          </p>
        </>
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
