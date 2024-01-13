import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    //synthetic event- example 
    e.preventDefault();
    // localhost:5000/api/createuser
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    // console.log(json)
    if (json.success) {
      //save the auth toke to local storage and redirect
      // (method) Storage.setItem(key: string, value: string)
      //adding credentials email in local for checkout functionality 13th and storing 
      /*Saved email for sending data along with email to know who's data is this, 
        in backend in new schema here- Orders in models */
      localStorage.setItem('userEmail', credentials.email)   //remove this line
      localStorage.setItem('authToken', json.authToken)
      // console.log(localStorage.getItem('authToken'))
      navigate("/");
    }
    else {
      alert("Enter Valid Credentials")
    }

  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
        <div><Navbar /></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger' >I am a new user</Link>
        </form>
      </div>
    </>
  )
}


