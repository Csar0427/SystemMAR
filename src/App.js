import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BasketSection from './Basket';
import MainCourseSection from './MainCourseSection'; 
import DrinkSection from './DrinkSection';
import DessertSection from './DessertSection';
import Homepage from './Homepage'; 
import OrderSummary from './OrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUtensils, faBasketShopping, faCake, faGlassWater, faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [generatedTicketNumber, setGeneratedTicketNumber] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToBasket = (item) => {
    const updatedBasket = [...basketItems, item];
    setBasketItems(updatedBasket);
    console.log("Updated Basket Items:", updatedBasket);
  };

  const removeFromBasket = (index) => {
    const updatedBasket = [...basketItems];
    updatedBasket.splice(index, 1);
    setBasketItems(updatedBasket);
  };

  const handleReduceQuantity = (index) => {
    if (!orderPlaced) {
      const updatedBasketItems = [...basketItems];
      const updatedItem = { ...updatedBasketItems[index] };
  
      if (updatedItem.quantity > 0) { // Check if quantity is greater than 0 before reducing
        updatedItem.quantity -= 1;
        updatedBasketItems[index] = updatedItem;
        setBasketItems(updatedBasketItems); // Update the state with the updated basket items array
      }
    }
  };

  const addQuantity = (index, amount) => {
    const updatedBasket = [...basketItems];
    updatedBasket[index].quantity += amount;
    setBasketItems(updatedBasket);
  };

  const placeOrder = () => {
    const generatedTicketNumber = Math.floor(Math.random() * 1000000);
    setGeneratedTicketNumber(generatedTicketNumber);
    console.log('Placing order:', basketItems);
    setBasketItems([]);
  };

  const openNavbar = () => {
    setSidebarOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`navbar ${sidebarOpen ? 'open' : ''}`}>
          <h2>
            <Link to="/" onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
              <FontAwesomeIcon icon={faCoffee} style={{ marginRight: '8px' }} />
              Travel Mug Cafe
            </Link>
          </h2>
          <h3>best since 2018</h3>
          <div className="separator"></div>
          <h3>Menu</h3>
          <ul>
            <li>
              <Link
                to="/main-course"
                style={{ textDecoration: 'none' }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faUtensils} /> Main Course
              </Link>
            </li>
            <li>
              <Link
                to="/drink"
                style={{ textDecoration: 'none' }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faGlassWater} /> Drinks
              </Link>
            </li>
            <li>
              <Link
                to="/dessert"
                style={{ textDecoration: 'none' }}
                onClick={() => setSidebarOpen(false)} // Close navbar on link click
              >
                <FontAwesomeIcon icon={faCake} /> Dessert
              </Link>
            </li>
          </ul>

          <h3>Order</h3>
          <ul>
            <li>
              {basketItems.length > 0 ? (
                <Link
                  to="/basket"
                  style={{ textDecoration: 'none' }}
                  onClick={() => setSidebarOpen(false)} // Close navbar on link click
                >
                  <FontAwesomeIcon icon={faBasketShopping} /> Basket
                </Link>
              ) : (
                <span style={{ textDecoration: 'none', cursor: 'not-allowed' }}>
                  <FontAwesomeIcon icon={faBasketShopping} /> Basket
                </span>
              )}
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage onOpenNavbar={openNavbar} />} />
            <Route path="/main-course" element={<MainCourseSection addToBasket={addToBasket} />} />
            <Route path="/drink" element={<DrinkSection addToBasket={addToBasket} />} />
            <Route path="/dessert" element={<DessertSection addToBasket={addToBasket} />} />
            <Route
              path="/order-summary"
              element={<OrderSummary basketItems={basketItems} ticketNumber={generatedTicketNumber} />}
            />
            <Route
              path="/basket"
              element={basketItems.length > 0 ? (
                <BasketSection
                  basketItems={basketItems}
                  onPlaceOrder={placeOrder}
                  onRemoveItem={removeFromBasket}
                  onReduceQuantity={handleReduceQuantity} // Pass handleReduceQuantity instead of reduceQuantity
                  addQuantity={addQuantity}
                />
              ) : (
                <Navigate to="/" />
              )}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
