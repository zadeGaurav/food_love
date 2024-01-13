import React from 'react'
import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './screens/Login'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup'
import { CartProvider } from './components/ContextReducer.js'
import MyOrder from './screens/MyOrder.js'
// import Cart from './screens/Cart.js'


export default function App() {
  return (
    <CartProvider>

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createUser" element={<Signup />} />
            {/* <Route exact path="/cart" element={<Cart/>} /> */}
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
      
    </CartProvider>

  )
}