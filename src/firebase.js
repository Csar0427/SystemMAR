// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";

const apiKey = process.env.REACT_APP_API_KEY;

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "orderingsystem-8e3b2.firebaseapp.com",
  databaseURL: "https://orderingsystem-8e3b2-default-rtdb.firebaseio.com",
  projectId: "orderingsystem-8e3b2",
  storageBucket: "orderingsystem-8e3b2.appspot.com",
  messagingSenderId: "918684651055",
  appId: "1:918684651055:web:3f8a52a0de09f6cf9540da",
  measurementId: "G-MH8KGF8SCY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the database

// Function to write an order to the database
const writeOrderToDatabase = (order) => {
  // Push the order to the "orders" node in the database
  const ordersRef = ref(database, "orders");
  push(ordersRef, order)
    .then(() => {
      console.log("Order written to database successfully");
    })
    .catch((error) => {
      console.error("Error writing order to database:", error);
    });
};

export { app, writeOrderToDatabase };
