import React, { useEffect } from 'react'
import "./HomePage.scss"
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
  const { userCookie, setCookie, removeCookie } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if(userCookie.token===""){
      navigate("/login");
    }
  }, []);
  return (
    <div className='home-container'>
      <header style={{ margin: '0px', padding: '0px' }}>
        <Navbar />
      </header>
    </div>
  )
}

export default HomePage