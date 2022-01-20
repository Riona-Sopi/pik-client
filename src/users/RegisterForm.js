import React, { useState } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const history = useHistory()


    const [error, setError] = useState({
        displayName: "",
        userName: "",
        email: "",
        password: "",
        emailExist: ""
    })

    const onSubmit = (e) =>{
        e.preventDefault();
        const data ={
            displayName: displayName,
            userName: userName,
            email: email,
            password: password
        }
       
        axios.post("https://localhost:44394/api/Account/register", data)
            .then(res => 
                {
                  history.push("/sliderlist")
                }
            )
            .catch(err => setError(err.response.data))
        
    }

    
    return(
        <div>
        <Link className="btn btn-sm btn-link mt-3" to="/loginform" >Go to Login</Link>
        {/* <hr className="mt-3"/> */}
          <div className="row d-flex justify-content-center">
            
            <div className="col-8 mt-3"> 
            
            <div className="card card-primary">

            <div className="card-header" style={{background: '#a8ab44', color:"white"}}>
                <h3 className="text-center">Register</h3>
              </div>
              {error.emailExist ? (<div className="alert alert-danger" role="alert"> {error.emailExist}</div>):null}
              <form  onSubmit={onSubmit}>
              
              
                
                <div className="card-body">
                <div className="form-group">
                <label htmlFor="name">Username</label>
                <input type="text" className="form-control" id="name" name="name" onChange={(e) => setUserName(e.target.value)}placeholder="Enter Name" />
                {error.userName ? error.userName : null}
                </div>
                <div className="form-group">
                <label htmlFor="surname">Display Name</label>
                <input type="text" className="form-control" id="surname" name="surname"  onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter Display Name" />
                {error.displayName ? error.displayName : null}
                </div>
                <div className="form-group">
                <label htmlFor="emai">Email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)}  placeholder="Enter Email" />
                {error.email ? error.email: null}
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)}  placeholder="Enter Password" />
                {error.password ? error.password : null}
                </div>
                </div>

                <div className="mb-4 ml-3">
                  <button type="submit" className="btn" style={{background: '#a8ab44', color:"white"}}>Submit</button>
                </div>
              </form>
            </div>
        </div>
    </div>
    </div>
        
    )
}

export default Register;