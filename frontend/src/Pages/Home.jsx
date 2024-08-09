import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleUser, faGear, faCircleInfo, faArrowRightFromBracket, faCartShopping ,faHeart, faDolly } from '@fortawesome/free-solid-svg-icons';
import './myStyle.css';
import Logo from '../assets/tyre.png';
import { NavLink, BrowserRouter as Router, useNavigate } from 'react-router-dom';

const DropDownProfile = () => {
    const navigate = useNavigate();
    return (
        <div className='dropDownProfile'>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faCircleUser} className='profile-list' />
                    Profile
                </li>
                <li>
                    <FontAwesomeIcon icon={faGear} className='profile-list' />
                    Settings
                </li>
                <li>
                    <FontAwesomeIcon icon={faCircleInfo} className='profile-list' />
                    About
                </li>
                <li onClick={()=>navigate('/login')}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='profile-list' />
                    Logout
                </li>
            </ul>
        </div>
    );
};

const DropDownCart = () => {
    return (
        <div className='dropDownCart'>
            <ul>
                <li><FontAwesomeIcon icon={faHeart} className='cart-list' style={{ color:'red'}}/>My Whislist</li>
                <li><FontAwesomeIcon icon={faDolly} className='cart-list' />My Orders</li>
            </ul>
        </div>
    );
};

function Home() {
    const navigate = useNavigate();

    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
    const [isCartDropdownVisible, setIsCartDropdownVisible] = useState(false);

    const handleProfileClick = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
        setIsCartDropdownVisible(false);
    };

    const handleCartClick = () => {
        setIsCartDropdownVisible(!isCartDropdownVisible);
        setIsProfileDropdownVisible(false); 
    };

    return (
        <>
            <div className='top-bar'>
                <div>
                    <img className='tyre-logo' src={Logo} alt='Tyres' />
                </div>

                {isProfileDropdownVisible && <DropDownProfile/>}
                {isCartDropdownVisible && <DropDownCart/>}
                
                {/* <div className='search-container'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                    <input type='text' placeholder='Search...' className='search-input' />
                </div> */}

                <div className='nave-item'>
                    <nav>
                        <ul>
                            <li className='a' onClick={() => navigate("/login")}>Sign in</li>
                            <div className='b'>|</div>
                            <li className='a' onClick={() => navigate("/register")}>Sign up</li>  
                            <li className='a' onClick={handleCartClick}>
                                <FontAwesomeIcon icon={faCartShopping} />Cart
                            </li>
                            <li className='a'>Help</li>
                            <FontAwesomeIcon
                                icon={faCircleUser}
                                className='profile'
                                onClick={handleProfileClick}
                            />
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='home-body'>
                
            </div>
        </>
    );
}

const App = () => (
    <Router>
        <Home />
    </Router>
);
 
ReactDOM.render(<App />, document.getElementById('root'));

export default Home;
