import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/BuyFromMeProvider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default App;
