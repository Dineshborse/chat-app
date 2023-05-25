import React, { useRef } from 'react'
import NavMenu from './NavMenu'
// import './styles/_navbar'

function Navbar({userCookie, setuserCookie,userInfo}) {
    

   



    return (
        <div className='navbar'>
            <div className='navbar__container'>
                <div className='navbar__container__logo-part'>
                    <div style={{marginLeft:"20px"}}>logo</div>
                    <div style={{marginRight:"20px"}}>{userInfo.userName}</div>
                </div>
                <div className='navbar__container__senderInfo-part'>sender name</div>
            </div>
            <NavMenu userCookie={userCookie} setuserCookie={setuserCookie}/>
        </div>
    )
}

export default Navbar