import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCartShopping, faArrowRightFromBracket, faPen, faUserTie, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import './myStyle.css';
import Sakthi from '../assets/Sakthi.png';
import { NavLink, BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Lottie from 'react-lottie';
import logoutAnimation from '../assets/Home/logout.json';
import Login_Gif from '../assets/Home/Login_Animation.gif';
import axios from 'axios';
import DefaultProfile from './Edit_Profile/default-profile.png'
import "aos/dist/aos.css";
import AOS from 'aos';

function Home() {
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUserName] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin status
 
    useEffect(() => {
        AOS.init({
          once: true,
          disable: "phone",
          duration: 750,
          easing: "ease-out-cubic",
        });
      }, []);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const { data } = await axios.get('http://localhost:8080/user/cart', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCartCount(data.length); 
                } else {
                    setCartCount(0); 
                }
            } catch (error) {
                console.error('Failed to fetch cart count:', error);
                setCartCount(0); 
            }
        };
        fetchCartCount();

        const userStatus = JSON.parse(localStorage.getItem("userStatus"));
        if ((location.pathname === '/product' || location.pathname === '/cart') && !userStatus) {
            setShowLoginPrompt(true);
            navigate('/login');
        }
    }, [location, navigate]);

    const handleProfileClick = () => {
        setIsProfileDropdownVisible(!isProfileDropdownVisible);
    };

    const handleProductClick = () => {
        const userStatus = JSON.parse(localStorage.getItem("userStatus"));
        if (!userStatus) {
            setShowLoginPrompt(true);
        } else {
            navigate('/product');
        }
    };

    const handleCartClick = () => {
        const userStatus = JSON.parse(localStorage.getItem("userStatus"));
        if (!userStatus) {
            setShowLoginPrompt(true);
        } else {
            navigate('/cart');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    
    const handleEditProfileClick = () => {
        navigate('/edit-profile');
    };
    
    const handleAdminClick = () => {
        navigate('/admin');
    };
    const closeLoginPrompt = () => {
        setShowLoginPrompt(false);
    };

    const handleLogoutClick = () => {
        localStorage.setItem("userStatus", false);
        localStorage.removeItem('token');
        localStorage.removeItem('userdata');
        localStorage.removeItem('userData');
        setShowLogoutAnimation(true);
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    const isCartActive = location.pathname === '/cart';
    const isProductActive = location.pathname === '/product';

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: logoutAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        if (localStorage.getItem('userdata')) {
            const userdata = JSON.parse(localStorage.getItem('userdata'));
            setUserName(userdata.name);
            setIsAdmin(userdata.isadmin); // Set admin status from userdata
        } else {
            setUserName("Profile");
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            const userData = JSON.parse(localStorage.getItem('userData')).data;
            if (userData.profileImage !== "") {
                setProfileImg(userData.profileImage);
            } else {
                setProfileImg(DefaultProfile);
            }
        } else {
            setProfileImg(DefaultProfile);
        }
    }, []);
    
    return (
        <>
            {showLoginPrompt && (
                <div data-aos="zoom-in" className='login-prompt-container'>
                    <div className='login-prompt-box'>
                        <img src={Login_Gif} alt="Login_Gif" />
                        <h2>Please login to continue </h2>
                        <button className='login-button' onClick={handleLoginClick}>
                            Login
                        </button>
                        <button className='close-button' onClick={closeLoginPrompt}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {showLogoutAnimation && (
                <>
                    <div className='dark-overlay'></div>
                    <div className='logout-animation-container'>
                        <Lottie options={defaultOptions} height={400} width={400} />
                    </div>
                </>
            )}

            <div className={`top-bar ${showLoginPrompt ? 'blur-background' : ''}`}>
                <div>
                    <img className='tyre-logo' src={Sakthi} alt='Tyres' />
                </div>

                {isProfileDropdownVisible && (
                    <div className={`dropDownProfile ${isAdmin ? 'admin-profile' : 'user-profile'}`}>
                        {JSON.parse(localStorage.getItem("userStatus")) ? (
                            <>
                                <h2>
                                    {username}
                                </h2>
                                <ul>
                                    <hr />
                                    {/* Admin condition added */}
                                    {isAdmin && (
                                        <li onClick={handleAdminClick}>
                                            <FontAwesomeIcon className="icons" icon={faUserTie} />
                                            <span className="edit-profile-text">Admin Panel</span>
                                        </li>
                                    )}
                                    <li onClick={handleEditProfileClick}>
                                        <FontAwesomeIcon className="icons" icon={faPen} />
                                        <span className="edit-profile-text">Edit Profile</span>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon className="icons" icon={faCircleQuestion} />
                                        <span className="edit-profile-text">Help & Support</span>
                                    </li>
                                    <hr />
                                    <li onClick={handleLogoutClick} className='logout-item'>
                                        <FontAwesomeIcon className="icons-log" icon={faArrowRightFromBracket} />
                                        <span className="edit-profile-text">Logout</span>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <ul>
                                <li onClick={handleLoginClick} className='login-item'>
                                    <FontAwesomeIcon className="icons-log" icon={faArrowRightFromBracket} />
                                    <span className="edit-profile-text">Login</span>
                                </li>
                            </ul>
                        )}
                    </div>
                )}

                <div className='nav-item'>
                    <nav>
                        <ul id='navbar'>
                            <li><NavLink className='page-link' to='/'>Home</NavLink></li>
                            <li>
                                <span
                                    className={`page-link ${isProductActive ? 'active' : ''}`}
                                    onClick={handleProductClick}
                                >
                                    Product
                                </span>
                            </li>
                            <li><NavLink className='page-link' to='about'>About Us</NavLink></li>
                            <li><NavLink className='page-link' to='contact'>Contact Us</NavLink></li>
                            <li><NavLink className='page-link' to='help'>Help</NavLink></li>
                            <img 
                                src={profileImg} 
                                alt="Profile" 
                                className='profile'
                                onClick={handleProfileClick}
                            />
                            {/* <FontAwesomeIcon
                                icon={faCircleUser}
                                className='profile'
                                onClick={handleProfileClick} /> */}
                        </ul>
                    </nav>
                </div>

                {/* Cart Icon */}
                <div 
                    className={`cart-icon-container ${isCartActive ? 'active' : ''}`}
                    onClick={handleCartClick}>
                    <FontAwesomeIcon icon={faCartShopping} className={`cart-icon ${isCartActive ? 'active-icon' : ''}`} />
                    {cartCount > 0 && (
                        <div className='cart-badge'>{cartCount}</div>
                    )}
                </div>
            </div>
            <div className={`Outlet ${showLoginPrompt ? 'blur-background' : ''}`}>
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
