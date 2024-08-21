import React, { useState, useEffect } from 'react';
import './Product.css';
import Cars from './Vehicle/Cars';
import vehicleData from './Vehicle/VehicleData';
import { useNavigate } from 'react-router-dom';

import Car from '../assets/Product/car.svg';
import Bike from '../assets/Product/bike.svg';
import Truck from '../assets/Product/truck.svg';
import SCV from '../assets/Product/scv.svg';
import LCV from '../assets/Product/lcv.svg';
import Pickup from '../assets/Product/pickup-van.svg';
import MCV from '../assets/Product/mcv.svg';
import ICV from '../assets/Product/icv.svg';
import Car_active from '../assets/Product/car-active.svg';
import Bike_active from '../assets/Product/bike-active.svg';
import Truck_active from '../assets/Product/truck-active.svg';
import SCV_active from '../assets/Product/scv-active.svg';
import LCV_active from '../assets/Product/lcv-active.svg';
import Pickup_active from '../assets/Product/pickup-van-active.svg';
import MCV_active from '../assets/Product/mcv-active.svg';
import ICV_active from '../assets/Product/icv-active.svg';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import { IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() { 
  const [activeCategory, setActiveCategory] = useState('Car');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { name: 'Car', icon: Car, activeIcon: Car_active },
    { name: 'Two Wheeler', icon: Bike, activeIcon: Bike_active },
    { name: 'Truck', icon: Truck, activeIcon: Truck_active },
    { name: 'SCV', icon: SCV, activeIcon: SCV_active },
    { name: 'LCV', icon: LCV, activeIcon: LCV_active },
    { name: 'Pick Up', icon: Pickup, activeIcon: Pickup_active },
    { name: 'MCV', icon: MCV, activeIcon: MCV_active },
    { name: 'ICV', icon: ICV, activeIcon: ICV_active }
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
  };

  const filteredItems = Cars.filter(item => {
    const isCategoryMatch = item.vehicle_type === activeCategory;
    const isBrandMatch = !selectedBrand || item.vehicle_brand === selectedBrand;
    const isModelMatch = !selectedModel || item.vehicle_model === selectedModel;
    return isCategoryMatch && (selectedBrand || selectedModel) && isBrandMatch && isModelMatch;
  });

  const addToCart = (item) => {
    const MakeToast = (msg) => {
      toast.info(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    };
    
    const MakeErrorToast = (msg) => {
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    };

    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      MakeErrorToast("The item already added to Cart");
    } else {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart to localStorage
      MakeToast("The item added to Cart");
    }
  };

  return (
    <>
      <div className="product">
        <div className="category-row">
          {categories.map((category) => (
            <div 
              key={category.name}
              className={`category-item ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <img
                src={activeCategory === category.name ? category.activeIcon : category.icon}
                alt={`${category.name} icon`}
                className="category-icon"
              />
              {category.name}
            </div>
          ))}
        </div>
        <div className="category-content">
          {activeCategory && (
            <div className="category-details">
              <h2>Select a Tyre For your {activeCategory}</h2>
              <div className="dropdown-container">
                <div className="dropdown-left">
                  <label>Select Brand</label>
                  <select className='select-type' value={selectedBrand} onChange={handleBrandChange}>
                    <option value="">Select Brand</option>
                    {vehicleData[activeCategory]?.brands.sort().map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className="dropdown-right">
                  <label>Select Model</label>
                  <select className='select-type' value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
                    <option value="">Select Model</option>
                    {selectedBrand && vehicleData[activeCategory]?.models[selectedBrand]?.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="category-images">
                {filteredItems.map((item) => {
                  const { id, image, tyre_model, tyre_size, tyre_brand, price } = item;
                  return (
                    <div className="tire-box" key={id}>
                      <img src={image} alt={tyre_model} />
                      <div className="content">
                        <h2>{tyre_brand}</h2>
                        <h3>{tyre_model}</h3>
                        <p>{tyre_size}</p>
                        <div className="price">Price: {price}</div>
                        <div className="buttons">
                          <IconButton className="add-to-cart" onClick={() => addToCart(item)} title='Add to cart'><AddShoppingCartTwoToneIcon/></IconButton>
                          <a href="#">
                            <IconButton className="buy-now" title='Buy Now'><ShoppingCartOutlinedIcon/></IconButton>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Product;
