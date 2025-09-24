import {BrowserRouter as Router, Routes, Route,NavLink} from "react-router-dom"
import { useState } from 'react'
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import AddProduct from "./components/AddProduct.jsx"
import Login from "./components/Login.jsx"
import HomePage from "./pages/home/HomePage.jsx"
import Subcategory from "./pages/home/Subcategory.jsx"
import DetailP from "./pages/home/DetailP.jsx"
import CartProduct from "./pages/home/CartProduct.jsx"
import Reviews from "./pages/home/Reviews.jsx"
import AllListing from "./components/AllListing.jsx"	
import Register from "./components/Register.jsx"
import "./App.css"

function App() {
return (
  <div className="app-wrapper">
    <Router>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/detailsProduct" element={<DetailP />} />
          <Route path="/CartProduct" element={<CartProduct />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Subcategory" element={<Subcategory/>}/>
        </Routes>
      </div>
<Footer/>
    </Router>
  </div>
)


}

export default App
