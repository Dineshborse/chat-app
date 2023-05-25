import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

// import './_navmenu.scss'

function NavMenu({userCookie, setuserCookie}) {

    const MenuItemsList = useRef();
    const menuBtn = useRef();
    const menuBurger1 = useRef();
    const menuBurger2 = useRef();
    const menuBurger3 = useRef();

    const navigate = useNavigate();

    const handleMenuBtnClick = (e) => {
        // e.preventDefault();
        MenuItemsList.current.classList.toggle('open');
        menuBtn.current.classList.toggle('open');
        menuBurger1.current.classList.toggle('open');
        menuBurger2.current.classList.toggle('open');
        menuBurger3.current.classList.toggle('open');
    }
    
    const handleNavMenuItemClick =(e)=>{
        e.preventDefault();
        let itemName =e.currentTarget.innerHTML
        // console.log(e.currentTarget.innerHTML)
        setuserCookie("token", "", { path: "/" });
        navigate("/")
    }
    return (
        <div className='navmenu'>
            <div ref={MenuItemsList} className='navmenu__items-list'>
                <div style={{height:"50px"}}></div>
            <div onClick={handleNavMenuItemClick} className='navmenu__items-list__item'>Logout</div>
            </div>
            <div ref={menuBtn} onClick={handleMenuBtnClick} className='navmenu__btn'>
                <span ref={menuBurger1} className='navmenu__btn__burger1'></span>
                <span ref={menuBurger2} className='navmenu__btn__burger2'></span>
                <span ref={menuBurger3} className='navmenu__btn__burger3'></span>
            </div>
            
        </div>
    )
}

export default NavMenu