import React, { useState } from 'react';
import Logo from '../assets/tyre2.png';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toaster from './Toaster';

function Registration() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateData = async (e) => {
    e.preventDefault();

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name || !data.email || !data.password || !confirmPassword) {
      setRegisterStatus({ msg: "All fields are required!", key: Math.random() });
    } else if (!emailCheck.test(data.email)) {
      setRegisterStatus({ msg: "Invalid email format!", key: Math.random() });
    } else if (data.password !== confirmPassword) {
      setRegisterStatus({ msg: "Passwords do not match!", key: Math.random() });
    } else if (data.password.length < 6) {
      setRegisterStatus({ msg: "Password must be at least 6 characters!", key: Math.random() });
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.post("http://localhost:8080/user/register", data, config);
        setRegisterStatus({ msg: "Account created successfully! 😎", key: Math.random() });
        navigate('/login');
      } catch (err) {
        setRegisterStatus({ msg: "Registration failed. Try again.", key: Math.random() });
      }
    }
  };

  return (
    <div className='main-container'>
      <div className='container'>
        <div className='left'>
          <img className='bg' src={Logo} alt='Logo'/>
          <div className="logo">
            <h2>Sakthi Tyres</h2>
          </div>
          <div className="left-content">
            <h1>Create an Account</h1>
            <h2>Start Your Journey with Us!</h2>
          </div>
        </div>
        <div className='right'>
          <div className='box' style={{ height: '540px' }}>
            <span className="borderLine"></span>
            <form>
              <h2>SIGN UP</h2>
              <div className="inputBox">
                <input type="text" name='name' value={data.name} onChange={handleChange} required />
                <span>Username</span>
                <i></i>
              </div>
              <div className="inputBox">
                <input type="email" name='email' value={data.email} onChange={handleChange} required />
                <span>Email</span>
                <i></i>
              </div>
              <div className="inputBox">
                <input type="password" name='password' value={data.password} onChange={handleChange} required />
                <span>Password</span>
                <i></i>
              </div>
              <div className="inputBox">
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <span>Confirm Password</span>
                <i></i>
              </div>
              <input type="submit" value="Sign up" onClick={validateData} />
              <div className='last'>
                <p>Already have an account? <u onClick={() => navigate('/login')}>&nbsp;&nbsp;Sign in</u></p>
              </div>
            </form>
            {registerStatus ? (<Toaster key={registerStatus.key} message={registerStatus.msg} />) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
