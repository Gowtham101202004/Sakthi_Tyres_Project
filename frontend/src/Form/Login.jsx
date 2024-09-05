import React, { useState } from 'react'
import left from '../assets/tyre2.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const notify = () =>toast.success('Login Successful! 😎', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
    });

    const notifyError=(msg)=>toast.error(msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
      });

  const navigate = useNavigate();
  const [data,setData]=useState({name:"",password:""});

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value});
  }

  const display=async()=>{

    
    console.log(data);
    try{
    const config={
      header:{
        'Coneten-Type':'application/json',
      },
    };

    const res=await axios.post("http://localhost:8080/login",data,config);
    notify(); 
   
  }catch(err){
    console.log("Axios Error -> ",err.message);
    notifyError("Invalid username or password!");
  }
  }

  const ValidateData=(e)=>{
    e.preventDefault();
    if(!data.name || !data.password){
      notifyError("Fill the requiremenst!");
    }
    else if(data.password.length<6){
      notifyError("Password length minimum 6");
    }
    else{
      display();
      navigate('/');
    }
  }


  return (
    <div className='main-container'>        
      <div className="container">
        <div className="left">
            <img  className="bg" src={left} alt="bg"/>
            <div className="logo">
                <h2>Sakthi Tyres</h2>
            </div>
            <div class="left-content">
                <h1>Welcome Back !</h1>
                <h2>Your Journey Continues Here</h2>
            </div>
        </div>
      <div className="right">
        <div style={{ height:'420px'}} className="box">
          <span className="borderLine"></span>
          <form>
            <h2>SIGN IN</h2>
            <div class="inputBox">
              <input type="text" name='name' value={data.name} onChange={handleChange} required />
              <span>Username</span>
              <i></i>
            </div>
            <div class="inputBox">
              <input type="password" name='password' value={data.password} onChange={handleChange}  required/>
              <span>Password</span>
              <i></i>
            </div>
            <div class="links">
              <a href="#">Forgot Password?</a>
            </div> 
            <input type="submit" value="Sign in" onClick={ValidateData}/>
            <div className='last'>
              <p>Don't have an account? <u onClick={()=>navigate('/register')}>Sign up</u></p>
            </div>
        </form>
      </div>
    </div>
      <ToastContainer
  position="top-right"
  autoClose={4000}
  limit={2}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"/>
  </div>
</div>
  )
}

export default Login