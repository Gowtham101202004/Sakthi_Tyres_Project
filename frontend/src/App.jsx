import React from 'react'
import Login from './Form/Login'
import Registeration from './Form/Registeration'
import Home from './Pages/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'



function App() {
  
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route  index path='/' element={<Home/>}/>
        <Route  index path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registeration/>}/>
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App