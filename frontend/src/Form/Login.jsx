import React, { useState } from 'react';
import left from '../assets/tyre2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toaster from './Toaster';
import './style.css';

function Login() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", password: "" });
  const [logInStatus, setLogInStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const display = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post("http://localhost:8080/user/login", data, config);
      console.log("Login response:", res.data);
      setLogInStatus({ msg: "Login Successful! 😎", key: Math.random(), severity: "success" });
      localStorage.setItem("userStatus", "true");
    } catch (err) {
      console.error("Axios Error -> ", err.response ? err.response.data : err.message);
      setLogInStatus({ msg: err.response ? err.response.data.message : "An error occurred. Please try again.", key: Math.random(), severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const ValidateData = (e) => {
    e.preventDefault();
    if (!data.name || !data.password) {
      setLogInStatus({ msg: "Fill in all fields!", key: Math.random(), severity: "error" });
    } else if (data.password.length < 6) {
      setLogInStatus({ msg: "Password must be at least 6 characters long", key: Math.random(), severity: "error" });
    } else {
      display();
    }
  };

  const handleToasterClose = () => {
    navigate('/'); // Navigate after the toast closes
  };

  return (
    <>
      <div className='main-container'>
        <div className="container">
          <div className="left">
            <img className="bg" src={left} alt="Background" />
            <div className="logo">
              <h2>Sakthi Tyres</h2>
            </div>
            <div className="left-content">
              <h1>Welcome Back!</h1>
              <h2>Your Journey Continues Here</h2>
            </div>
          </div>
          <div className="right">
            <div style={{ height: '420px' }} className="box">
              <span className="borderLine"></span>
              <form onSubmit={ValidateData}>
                <h2>SIGN IN</h2>
                <div className="inputBox">
                  <input type="text" name='name' value={data.name} onChange={handleChange} required />
                  <span>Username</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="password" name='password' value={data.password} onChange={handleChange} required />
                  <span>Password</span>
                  <i></i>
                </div>
                <div className="links">
                  <a href="#">Forgot Password?</a>
                </div>
                <input type="submit" value="Sign in"/>
                <div className='last'>
                  <p>Don't have an account?<u onClick={() => navigate('/register')}>&nbsp;&nbsp;Sign up</u></p>
                </div>
              </form>
              {logInStatus && (
                <Toaster
                  key={logInStatus.key}
                  message={logInStatus.msg}
                  severity={logInStatus.severity}
                  onClose={handleToasterClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
