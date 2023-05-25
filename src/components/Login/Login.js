import axios from "axios";
import { React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../../redux/userSlice";
// import { PersonIcon } from '@mui/icons-material';

import "./Login.scss"
const Login = (props) => {
    
    const user = useSelector((state)=>state.user);
    const userDispatch = useDispatch();
    const { setuserCookie, userCookie } = props;
    const userEmailElementRef = useRef();
    const passwordElementRef = useRef();
    const errorMessageElementRef = useRef();
    const navigate = useNavigate();
    const userdetail={
        name: "",
        email:"",
    }

    const handleLoginBtnClick = () => {
        let userEmail = userEmailElementRef.current.value;
        let password = passwordElementRef.current.value;
        console.log(userEmail, password)

        if (userEmail.length >= 6 && password.length >= 6) {
            errorMessageElementRef.current.style.opacity = 0;
            axios({
                url: "http://localhost:3006/user/login",
                method: "POST",
                headers: {
                },
                data: { useremail: userEmail, password: password }
            }).then(async (loginData) => {
                console.log(loginData)

                await setuserCookie("token", loginData.data.token, { path: "/" })
                userdetail.name = loginData.data.userName;
                userdetail.email = loginData.data.userEmail;
                console.log(userCookie.token)
                userDispatch(update(userdetail))
                // if (userCookie.token !== "") {
                navigate("/userchat")
                // } else {
                //     navigate("/")
                // }

            }).catch((err) => {
                window.alert(err.response.data.message)
                console.log(err);
            })
        }
        else {
            if (userEmail.length < 6) {
                errorMessageElementRef.current.innerHTML = "User name length should be more the 5"
                errorMessageElementRef.current.style.opacity = 1;
            }
            else {
                errorMessageElementRef.current.innerHTML = "password length should be more than or equal to 6"
                errorMessageElementRef.current.style.opacity = 1;
            }
        }
    }

    return (
        <div className="login-page-body" style={{ height: "100vh", width: "100vw" }}>
            <div className="login-page-main-container">
                <div className="login-page-usericon-container"></div>
                <div className="login-page-member-login-name">Member Login</div>
                <input ref={userEmailElementRef} className="login-page-input-username" type={"email"} placeholder={"User Email Id"}></input>
                <input ref={passwordElementRef} className="login-page-input-password" type={"password"} placeholder={"Password"}></input>
                <div onClick={handleLoginBtnClick} className="login-page-btn-login">LOGIN</div>
                <div onClick={() => { navigate("/register") }} className="login-page-register-link">Register</div>
                <div ref={errorMessageElementRef} className="login-page-error-message">message</div>
            </div>

        </div>
    )
}


export default Login;