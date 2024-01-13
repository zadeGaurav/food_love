import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", geolocation:""})

    const handleSubmit = async(e)=>{
        //synthetic event- example 
        e.preventDefault();
        // localhost:5000/api/createuser
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
        },
        body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
    });
    const json= await response.json()
    console.log(json, "user signed up")
    
    if(!json.success){
        alert("Enter valid credentials")
    }
}
    const onChange= (event)=>{
        setCredentials({...credentials,[event.target.name]: event.target.value})
    } 

    return (
        <>
          <div><Navbar/></div>
          <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} placeholder='Type your name' />
                    {/* <div id="emailHelp" className="form-text">Type your name</div> */}
                    {/* name and value for backend  onChange is for making the input controled (('' satic at that time as we provide 
                    the '" in useState as intial value"))  aur input ka type to rahega*/}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} placeholder='Type your email address' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} placeholder='password should be greter than 5 chrecters' />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} placeholder='Add your current address'/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger' >Already a user</Link>
            </form>
          </div>
        </>
    )
}

export default Signup