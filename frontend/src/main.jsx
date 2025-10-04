import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Assuming you have a global CSS file
import { Provider } from 'react-redux';
import { store } from '../redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* The BrowserRouter component enables routing for your entire application */}
    <BrowserRouter>
    <Provider store={store} >
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// root.render(
//   <h1>Hello World</h1>
// );
