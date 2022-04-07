import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/BuyFromMeProvider';
import CreateProduct from './pages/CreateProduct';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Products from './pages/Product';
import Profile from './pages/Profile';
import ProfileProducts from './pages/ProfileProducts';
import Register from './pages/Register';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/create-product" element={<CreateProduct />} />
        <Route path="/profile/products" element={<ProfileProducts />} />
        <Route path="/profile/orders" element={<ProfileProducts />} />
        <Route path="/profile/sales" element={<ProfileProducts />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/product/update/:id" element={<CreateProduct />} />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
    </Provider>
  );
}
export default App;
