import React, {useState}  from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


const Login = () => {
    const history  = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  

    const [error, setError] = useState({
        "email":"",
        "password":""
    })
    const onSubmit = (e) => {
        e.preventDefault()
       
        const data = {
            email: email,
            password: password
        }

        axios.post("https://localhost:44394/api/Account/login", data)
                .then(res =>{
                    window.localStorage.setItem("token", "Bearer " + res.data.token) 
                   
                   history.push('/sliderlist')
                   window.location.reload()
                })
                .catch(err => {
                   
                    setError(err.res.data)
                })
    }

    return(
        <div className="row mt-5 mb-5">
          
            <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
                <div className="card card-signin my-5">
                    <div className="card-body">
                    <form className="form-signin"onSubmit={onSubmit} method="post">
                           <br />
                            <div className="form-label-group mt-2">
                                <label htmlFor="email" >Email</label><br />
                                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}className="form-control"/>
                                {error.email ? error.email : ''}
                            </div>
                            <div className="form-label-group mt-2">
                                <label htmlFor="password" >Password</label><br />
                                <input type="password" name="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                                {error.password ? error.password : ""}
                            </div>
                            <div className="form-group d-flex justify-content-center mt-4">
                                <input type="submit" name="submit" className="btn btn-info btn-md algin-center" value={'Login'} />
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        
        </div>
    )
}


export default Login;