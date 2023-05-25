import axios from "axios";
import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.scss"
const Register = (props) => {

    // const {} = props;
    const usernameElementRef = useRef();
    const userEmailElementRef = useRef();
    const passwordElementRef = useRef();
    const confirmPasswordElementRef = useRef();
    const errorMessageElementRef = useRef();
    const navigate = useNavigate();


    const handleRegisterBtnClick = () => {
        let username = usernameElementRef.current.value;
        let userEmail = userEmailElementRef.current.value;
        let password = passwordElementRef.current.value;
        let confirmPassword = confirmPasswordElementRef.current.value;
        console.log(username, password, confirmPassword)

        if (username.length >= 6 && password.length >5 && userEmail.length>5) {
            if (password === confirmPassword && password.length>=6) {
                errorMessageElementRef.current.style.opacity = 0;
                axios({
                    url: "http://localhost:3006/user/register",
                    method: "POST",
                    headers: {
                    },
                    data: { useremail: userEmail,username: username, password: password  }
                }).then(async (loginData) => {
                    if(loginData.data.status==="success"){
                        window.alert(loginData.data.message)
                    }
                    console.log(loginData.data)
                    navigate("/")

                }).catch((err) => {
                    window.alert(err.response.data.message)
                    console.log(err);
                })
            }
            else {
                if(password.length<6){
                    errorMessageElementRef.current.innerHTML = "minimum length of password should be 6"
                errorMessageElementRef.current.style.opacity = 1;
                }
                else{
                    errorMessageElementRef.current.innerHTML = "password does not match"
                    errorMessageElementRef.current.style.opacity = 1;
                }
                
            }
        }
        else {
            if (username.length<6) {
                errorMessageElementRef.current.innerHTML = "pls enter username"
                errorMessageElementRef.current.style.opacity = 1;
            }
            else {
                errorMessageElementRef.current.innerHTML = "pls enter password"
                errorMessageElementRef.current.style.opacity = 1;
            }
        }
    }

    return (
        <div className="register-page-body" style={{ height: "100vh", width: "100vw" }}>
            <div className="register-page-main-container">
                <div className="register-page-usericon-container"></div>
                <div className="register-page-member-register-name">Member Register</div>
                <input ref={usernameElementRef} className="register-page-input-username" type={"text"} placeholder={"Username"}></input>
                <input ref={userEmailElementRef} className="register-page-input-username" type={"email"} placeholder={"Email ID"}></input>
                <input ref={passwordElementRef} className="register-page-input-password" type={"password"} placeholder={"Password"}></input>
                <input ref={confirmPasswordElementRef} className="register-page-input-confirm-password" type={"password"} placeholder={"Confirm Password"}></input>
                <div onClick={handleRegisterBtnClick} className="register-page-btn-register">REGISTER</div>
                <div onClick={()=>{navigate("/")}}className="register-page-login-link">Login</div>
                <div ref={errorMessageElementRef} className="register-page-error-message">message</div>
            </div>

        </div>
    )
}


export default Register