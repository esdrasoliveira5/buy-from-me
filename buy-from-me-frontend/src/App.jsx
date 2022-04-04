import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/BuyFromMeProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Product';
import Register from './pages/Register';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Products />} />
      </Routes>
    </Provider>
  );
}

export default App;
