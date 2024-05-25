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

  const reduceQuantity = (index, quantityToRemove) => {
    const updatedBasketItems = [...basketItems];
    const updatedItem = { ...updatedBasketItems[index] };
    
    if (quantityToRemove >= updatedItem.quantity) {
      updatedItem.quantity = 0;
    } else {
      updatedItem.quantity -= quantityToRemove;
    }
  
    updatedBasketItems[index] = updatedItem;
    setBasketItems(updatedBasketItems);
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
              <Link to="/main-course" style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faUtensils} /> Main Course
              </Link>
            </li>
            <li>
              <Link to="/drink" style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faGlassWater} /> Drinks
              </Link>
            </li>
            <li>
              <Link to="/dessert" style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faCake} /> Dessert
              </Link>
            </li>
          </ul>
          <h3>Order</h3>
          <ul>
            <li>
              <Link to="/basket" style={{ textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faBasketShopping} /> Basket
              </Link>
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
              element={<BasketSection
                basketItems={basketItems}
                onPlaceOrder={placeOrder}
                onRemoveItem={removeFromBasket}
                onReduceQuantity={reduceQuantity}
                addQuantity={addQuantity}
              />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
