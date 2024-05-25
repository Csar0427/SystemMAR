import React, { useState } from 'react';
import mainCourses from './database/mainCourseDb';
import './App.css';

const MainCourseSection = ({ addToBasket }) => {
  const [selectedMainCourse, setSelectedMainCourse] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleItemClick = (index) => {
    setSelectedMainCourse(mainCourses[index]);
    setDescriptionVisible(true);
  };

  const handleCloseDescription = () => {
    setSelectedMainCourse(null);
    setDescriptionVisible(false);
  };

  const handleOrder = () => {
    if (selectedMainCourse && quantity > 0) {
      addToBasket({ ...selectedMainCourse, quantity });
      setSelectedMainCourse(null);
      setQuantity(1);
    }
  };

  return (
    <div className="main-course-section">
      <h2>Main Courses</h2>
      <p>Enjoy our delicious main courses.</p>
     
      <div className="main-course-menu">
        
        {mainCourses.map((mainCourse, index) => (
          <div key={index} className="main-course-item" onClick={() => handleItemClick(index)}>
            <div className="column-left">
              <h3>{mainCourse.name}</h3>
              <p>{mainCourse.price}</p>
              <button>View</button>
              <button onClick={() => { setSelectedMainCourse(mainCourse); setDescriptionVisible(true); }}>Order</button>
            </div>
            <div className="column-right">
              <img src={mainCourse.image} alt={mainCourse.name} />
            </div>
          </div>
        ))}
      </div>
      {selectedMainCourse && descriptionVisible && (
        <div className="main-course-description">
          <div className="description-content">
            <h3>{selectedMainCourse.name}</h3>
            <p>{selectedMainCourse.description}</p>
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

export default MainCourseSection;
