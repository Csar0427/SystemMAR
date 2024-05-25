import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './homepage.css';
import hamburgerImage from 'D:/MenuAugReal/my-app/src/hamburger.jpg';

const Homepage = ({ onOpenNavbar }) => {
  return (
    <div className="homepage">
      <h1 className="title cursive-title">Travel Mug Cafe</h1> 
      <div className="homeseparator"></div>
      <div className="header">
        <img src={hamburgerImage} alt="Restaurant Header" />
      </div>
      <div className="restaurant-info">
      <p>Although we offer a wide variety of hot and iced drinks, we also provide savory and sweet food options. So whether you're stopping for your morning coffee, lunch, or an afternoon snack, we've got you covered!!</p>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Location: Novaliches Proper, Philippines
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> Contact: 0927 423 3201
        </p>
        
         <p>
          <FontAwesomeIcon icon={faCheckCircle} className="perfect-icon" />{' '}
          <a href="https://travelmugcafeph.com/" target="_blank" rel="noopener noreferrer" className="link-no-underline link-no-color">https://travelmugcafeph.com/</a>
        </p>
        <button onClick={onOpenNavbar}>
          <FontAwesomeIcon icon={faShoppingCart} /> Start Ordering
        </button>
      </div>
    </div>
  );
}

export default Homepage;
