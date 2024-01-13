import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function Navbar() {
  //for displaying the cart Modal and sending cart inside it.
  const [cartView, setCartView] = useState(false)
  // localStorage.setItem('temp', "first")
  let data = useCart();
 const navigate = useNavigate()

  const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><strong><em>Food_Love</em></strong></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active" style={{ fontWeight: 700 }} aria-current="page" to="/">Home</Link>
              </li>
              {/* Used localStorage getItem and check by ternary operator if user is logged in or not */}
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active" style={{ fontWeight: 700 }} aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""
              }
            </ul>
            {/* As LOgin and signup are in same div so using me-auto in ul shifted this div to far right */}
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createUser">Signup</Link>
              </div>
              : <div className='d-flex'>
                <div className="btn bg-white text-success mx-1" onClick={()=> {setCartView(true)}}>
                  {/* <Link className="btn bg-white text-success mx-1"  to="/"> */}
                    My Cart  &nbsp;
                    {/* >A space character: &nbsp;  or {" "}*/}
                    <Badge pill bg='danger'> {data.length}</Badge>
                    {/* </Link> */}
                </div>
                {cartView ? <Modal onClose={()=> {setCartView(false)}}><Cart/></Modal>: null}
                <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>
                  {/* Used HandleLogout event and used removeItem method of localStorage  and useNavigate form react-router-dom */}
                  {/* <Link className="btn bg-white text-danger mx-1" onClick={handleLogout}>  */}
                  Logout
                  {/* </Link> */}
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
