import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
import EditProfile from './Pages/Edit_Profile/EditProfile';
import Apollo from './Pages/Brand_About/Apollo';
import Bridgestone from './Pages/Brand_About/Bridgestone';
import JK from './Pages/Brand_About/JK';
import Michelin from './Pages/Brand_About/Michelin';
import Payment from './Pages/Payment/Payment'; 

// Initialize Stripe with your publishable key once
const stripePromise = loadStripe("pk_test_51Q5g2GD7L0PMiSZDyh1Slqidawdli8iWnIGxx69koWIyfEpliXrlqPBaDqtTtiiiee6upIoioleWHdwXxZDzTvdU00LXTGyT2G");

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
      <Elements stripe={stripePromise}> 
        <MainContent cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      </Elements>
    </BrowserRouter>
  );
}

function MainContent({ cartItems, addToCart, removeFromCart }) {
  const location = useLocation();

  // Show footer unless on specific pages
  const showFooter = !['/login', '/register', '/edit-profile', '/cart', '/payment'].includes(location.pathname); 

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
          <Route path='apollo' element={<Apollo />} />
          <Route path='bridgestone' element={<Bridgestone />} />
          <Route path='jk' element={<JK />} />
          <Route path='michelin' element={<Michelin />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
      {showFooter && <Footer />} 
    </>
  );
}

export default App;
