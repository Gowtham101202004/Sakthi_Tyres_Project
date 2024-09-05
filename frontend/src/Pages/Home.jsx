import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleUser, faGear, faCircleInfo, faArrowRightFromBracket, faCartShopping ,faHeart, faDolly, faPen} from '@fortawesome/free-solid-svg-icons';
import './myStyle.css';
import Sakthi from '../assets/Sakthi.png';
import { NavLink, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

const DropDownProfile = () => {
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate('/Profile'); // Navigate to the Profile component
      };
    return (
        <div className='dropDownProfile'>
            <h2><FontAwesomeIcon icon={faCircleUser} className='user-profile'/>
            Profile
            </h2>
            <ul>    
                <hr/>
                <li onClick={handleProfile}>
                    <FontAwesomeIcon icon={faPen} className='profile-list' />
                    Edit Profile
                </li>
                <li>
                    <FontAwesomeIcon icon={faGear} className='profile-list' />
                    Settings
                </li>
                <li>
                    <FontAwesomeIcon icon={faCircleInfo} className='profile-list' />
                    About
                </li>
                <hr/>
                <li onClick={() => navigate('/login')}>
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
                <li><FontAwesomeIcon icon={faHeart} className='cart-list' style={{ color: 'red' }} />My Wishlist</li>
                <li><FontAwesomeIcon icon={faDolly} className='cart-list' />My Orders</li>
            </ul>
        </div>
    );
};

function Home() {
    // const navigate = useNavigate();

    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
    const [isCartDropdownVisible, setIsCartDropdownVisible] = useState(false);

    const handleProfileClick = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
        setIsCartDropdownVisible(false);
    };

    const handleCartHover = (isHovering) => {
        setIsCartDropdownVisible(isHovering);
        setIsProfileDropdownVisible(false);
    };

    return (
        <>
            <div className='top-bar'>
                <div>
                    <img className='tyre-logo' src={Sakthi} alt='Tyres' />
                </div>

                {isProfileDropdownVisible && <DropDownProfile />}
                {isCartDropdownVisible && <DropDownCart />}

                <div className='nav-item'>
                    <nav>
                        <ul id='navbar'>
                            <li><NavLink className='page-link' to='/'>Home</NavLink></li>
                            <li><NavLink className='page-link' to='product'>Product</NavLink></li>
                            <li
                                o       nMouseEnter={() => handleCartHover(true)}
                                onMouseLeave={() => handleCartHover(false)}
                            >
                                <NavLink className='page-link' to='cart'>
                                    <FontAwesomeIcon icon={faCartShopping} />Cart
                                </NavLink>
                            </li>
                            <li><NavLink className='page-link' to='about'>About</NavLink></li>
                            <li><NavLink className='page-link' to='contact'>Contact Us</NavLink></li>
                            <li><NavLink className='page-link' to='help'>Help</NavLink></li>
                            <li><NavLink className='page-link' to='login'>Sign in</NavLink></li>
                            <div className='b'>|</div>
                            <li><NavLink className='page-link' to='register'>Sign up</NavLink></li>

                            <FontAwesomeIcon
                                icon={faCircleUser}
                                className='profile'
                                onClick={handleProfileClick}
                            />
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='Outlet'>
                <Outlet />
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
