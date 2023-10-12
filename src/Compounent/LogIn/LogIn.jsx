// import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import logo from "../image/AFT.png";
import React from 'react';
import { useState , useEffect } from "react";

function LogIn() {
    // const navigate = useNavigate();
    const [animate , setAnimate] = useState(false);
    useEffect(()=>
    {
        setAnimate(true);
    }, []);
    const AuthenticatedUser = [
        {email:"bilal@gmail.com",password:"1234"}
    ];
    const emptyFields = {
        email : "",
        password : ""
    };
    const [inputValues , setInputValues] = useState(emptyFields);
    const handleInput = (e) =>
    {
        const {name , value} = e.target;
        setInputValues((previous)=>
        ({
            ...previous,
            [name] : value,
        }));
    };
    const [error , setError] = useState('');
    const CheckUserAndLogin = (e) =>
    {   
        e.preventDefault();
        const authenticatedUser = AuthenticatedUser.find((user)=>
        {
           return user.email === inputValues.email && user.password === inputValues.password
        });
        if(authenticatedUser)
        {
            window.location.href = "/LandingPage";
            localStorage.setItem("isLogin", true);
        }else
        {
            const errMessage = "email or Password is incorrect.";
            setError(errMessage);    
        }
    };

    const [registerUser , setRegisterUser] = useState(false);
    const handleRegisterClick = (e) =>
    {
        e.preventDefault();
        setRegisterUser(false);
        setError(false);
        AuthenticatedUser.push(registerationInputValues);
    };

    const registerationFields = {
        firstName:"",
        lastName:"",
        email:"",
        password:""
    }
    const [registerationInputValues , setRegisterationInputValues ] = useState(registerationFields);
    const handleRegisterationValues = (e) =>
    {
        const {name , value} = e.target;
        setRegisterationInputValues((previous)=>
        ({
            ...previous,
            [name] : value,
        }));
    }
  return (
    <div className="loginDiv">
        <div className={animate?"login":"loginBeforeAnimate"}>
        {
            registerUser ? 
            (
                <>
                <h1>Register</h1>
                <form className="loginForm">
                    <label>FirstName:</label>
                    <input placeholder="firstName" type="text" name="firstName" 
                    onChange={handleRegisterationValues} value={registerationInputValues.firstName}/>
                    <label>LastName:</label>
                    <input placeholder="lastName" type="text" name="lastName" 
                    onChange={handleRegisterationValues} value={registerationInputValues.lastName}/>
                    <label>Email:</label>
                    <input placeholder="email" type="email" name="email" 
                    onChange={handleRegisterationValues} value={registerationInputValues.email} />
                    <label>Password:</label>
                    <input placeholder="password" type="password" name="password" 
                    onChange={handleRegisterationValues} value={registerationInputValues.password} />
                    <button className="loginButton" onClick={handleRegisterClick}>Register</button>
                </form>
                </>
            )
            :
            (
                <>
                <h1>Login</h1>
                <form className="loginForm">
                    <label>Email:</label>
                    <input placeholder="email" onChange={handleInput} name="email" value={inputValues.email} type="email" />
                    <label>Password:</label>
                    <input placeholder="password" onChange={handleInput} name="password" value={inputValues.password} type="password" />
                    <p className={error?"error":""}>{error}</p>
                    <button className="loginButton" onClick={CheckUserAndLogin}>Login</button>
                    {
                        error ? 
                        <p className={error?"registeration":""}>You should <a className="register" onClick={()=>setRegisterUser(true)}>register</a> first.</p>
                        :""
                    }
                </form>
                </>
            )
        }
        </div>
        <div className={animate?"loginLogo":"loginLogoBeforeAnimate"}>
            <img src={logo} alt="logo" />
        </div>
    </div>
  )
}

export default LogIn;