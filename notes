import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Form/Form';
import './App.css';
import Home from './Pages/Home';
import Welcome from './Pages/Welcome';
import Course from './Pages/Course';
import Product from './Pages/Product';
import Service from './Pages/Service';
import Contact from './Pages/Contact';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />}>
        ``<Route index element={<Welcome/>}/>
          <Route path='/course' element={<Course/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Route>
        <Route path="/form" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App