import grilledImage from "../assests/images/grilled.jpg";
import spag from "../assests/images/SPAG.jpg";
const mainCourses = [
  {
    name: "Grilled Chicken",
    price: "99 pesos",
    description:
      "Juicy grilled chicken breast served with mashed potatoes and steamed vegetables.",
    image: grilledImage, // Use the imported image
  },
  {
    name: "Spaghetti Bolognese",
    price: "89 pesos",
    description:
      "Classic spaghetti pasta with rich Bolognese sauce and Parmesan cheese.",
    image: spag, // Dummy image URL
  },
  // Add more main course items as needed
];

export default mainCourses;
