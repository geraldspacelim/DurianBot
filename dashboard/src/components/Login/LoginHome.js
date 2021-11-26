import React, { useState, useEffect } from "react";
import Background from './assets/bg.png'
import "./Login.css"

const LoginForm = ({login}) => {

    const [details, setDetails] = useState({username: "", password: ""} )

    const submitHandler = e => {
        e.preventDefault(); 
        setDetails({username:"", password:""})
        login(details)
    }
    
    return (  
        <div className="container">
            <img src={Background} alt="mofun logo" id="smellyStoryLogo" />
            <form onSubmit={submitHandler} className="login-form">
                <div className="form-group">
                    <input required type="text" className="form-control" id="inputUsername" placeholder="Username" onChange={e => setDetails({...details, username:e.target.value})} value={details.username}/>
                </div>
                <div className="form-group">
                    <input required type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
                </div>
                <button type="submit" className="btn btn-primary" id="submitAuthBtn">Login</button>
            </form>
        </div>
            
        
    )
}
 
export default LoginForm;