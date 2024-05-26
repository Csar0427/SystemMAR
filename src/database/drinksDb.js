import TEA from './TEA.jpg';
import FRUIT from './FRUIT.jpg';

const drinks = [
  {
    name: 'Iced Tea',
    sizes: ['small', 'medium', 'large'],
    price: { small: 29, medium: 39, large: 49 }, // Changed prices to numbers for better calculations
    description: 'Refreshing iced tea served with a slice of lemon.',
    image: TEA,
  },
  {
    name: 'Fruit Punch',
    sizes: ['small', 'medium', 'large'],
    price: { small: 39, medium: 49, large: 59 }, // Changed prices to numbers for better calculations
    description: 'Tropical fruit punch with a blend of pineapple, orange, and guava juices.',
    image: FRUIT,
  },
  // Add more drink items with sizes as needed
];

export default drinks;
