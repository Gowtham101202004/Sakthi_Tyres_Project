import React, { useState } from 'react'
import Logo from '../assets/tyre2.png'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registeration() {

  const notifySuccess = () =>toast.success('Account created Successful! 😎', {
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

  const navigator=useNavigate();
  const [data,setData]=useState({name:'',email:'',password:''});
  const [pass,setPass]=useState('');

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

    const res=await axios.post("http://localhost:8080/register",data,config);
    console.log(res);
    notifySuccess();
    navigator('/login');
  }catch(err){
    console.log("Axios Error -> ",err.message);
    notifyError("Username or Email already exixt.");
  }

  }

  const validateData=(e)=>{
    e.preventDefault();

    const email_check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!data.name || !data.email || !data.password || !pass){
     notifyError("Fill the requirements!");
    }
    else if (!email_check.test(data.email)) {
      notifyError("Invalid email format!");
    }
    else if(data.password!=pass){
      notifyError("Miss-match password!");
    }
    else if(data.password.length<6){
      notifyError("Password length size must be greater than 6")
    }
    else{
      display();

    }
  }
 
  return (
    <div className='main-container'>
      <div className='container'>
        <div className='left'> 
          <img className='bg' src={Logo} alt='Logo'/>
          <div className="logo">
                <h2>Sakthi Tyres</h2>
          </div>
          <div class="left-content">
                <h1>Create an Account</h1>
                <h2>Start Your Journey with Us!</h2>
          </div>
        </div>
          <div className='right'>
            <div style={{ height:'540px'}} className='box'>
              <span class="borderLine"></span>
              <form>
                <h2>SIGN UP</h2>
                <div class="inputBox">
                  <input type="text" name='name' value={data.name} onChange={handleChange} required />
                  <span>Username</span>
                  <i></i>
                </div>
                <div class="inputBox">
                  <input type="email" name='email' value={data.email} onChange={handleChange} required/>
                  <span>E-mail</span>
                  <i></i>
                </div>
                <div class="inputBox">
                  <input type="password" name='password' value={data.password} onChange={handleChange} required/>
                  <span>Password</span>
                  <i></i>
                </div>
                <div class="inputBox">
                  <input type="password" name='password' value={pass} onChange={(e)=>setPass(e.target.value)} required/>
                  <span>Confirm password</span>
                  <i></i>
                </div>
                <input type="submit" value="Sign up" onClick={validateData}/>
                <div className='last'>
                  <p>Already have an account? <u onClick={()=>navigator('/login')}>Sign in</u></p>
                </div>
              </form>
            </div>
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
theme="colored"
/>
  </div>
  )
}

export default Registeration