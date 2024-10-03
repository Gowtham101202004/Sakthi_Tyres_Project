import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigation, useNavigate } from 'react-router-dom';
import Login from './Form/Login';
import Registration from './Form/Registration';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Cart from './Pages/Cart/Cart';
import About from './Pages/About/About';
import Contact from './Pages/Contact_Us/Contact';
import Help from './Pages/Help/Help';
import Welcome from './Pages/Welcome';
import Footer from './Pages/Footer';
import ScrollToTop from './Pages/Scroll/ScrollToTop';
import LoadingComponent from './Pages/Animation/Loading';

import Apollo from './Pages/Brand_About/Apollo';
import Bridgestone from './Pages/Brand_About/Bridgestone';
import JK from './Pages/Brand_About/JK';
import Michelin from './Pages/Brand_About/Michelin';

function App() {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <MainContent cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
    </BrowserRouter>
  );
}

function MainContent({ cartItems, addToCart, removeFromCart }) {
  const location = useLocation();

  const showFooter = !['/login', '/register'].includes(location.pathname);

  return (
    
    <>
      <LoadingComponent />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path='product' element={<Product addToCart={addToCart} />} />
          <Route path='cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='help' element={<Help />} />
          <Route path="apollo" element={<Apollo />} />
          <Route path="bridgestone" element={<Bridgestone />} />
          <Route path="jk" element={<JK />} />
          <Route path="michelin" element={<Michelin />} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
      </Routes>
      {showFooter && <Footer />} 
    </>
  );
}

export default App;
