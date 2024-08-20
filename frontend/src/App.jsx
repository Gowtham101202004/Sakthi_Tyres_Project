import React, { useState } from 'react';
import Login from './Form/Login';
import Registeration from './Form/Registeration';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Help from './Pages/Help';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Footer from './Pages/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Welcome />} />
            <Route path='/product' element={<Product addToCart={addToCart} />} />  {/* Passing addToCart */}
            <Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />  {/* Passing cartItems and removeFromCart */}
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/help' element={<Help />} />
          </Route>
          <Route index path='/login' element={<Login />} />
          <Route path='/register' element={<Registeration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
