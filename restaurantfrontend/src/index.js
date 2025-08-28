/**
 * index.js
 *
 * Entry point for rendering the React application to the DOM.
 * Sets up Redux store and wraps the App component with Provider.
 * Imports global styles and sets up the root ReactDOM render.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootReducer from './Storage/RootReducer'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
var store=createStore(RootReducer)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}> 
    <App />
   </Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
