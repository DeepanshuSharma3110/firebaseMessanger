import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import style from './Nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState();
    const [uidCookies, setUidCookies,removeCookie] = useCookies(['uid']);
    const [tokenCookies, setTokenCookies] = useCookies(['token']);
    const windows  = useSelector((state)=>state.website);
    const navigate = useNavigate()  

    useEffect(()=>{
        setDisplayName(windows.sender.senderName)
    },[])

    const handleLogout  = async(e)=>{
        e.preventDefault();
        const response = await dispatch(logout());
        removeCookie('uid');
        removeCookie('token');
        navigate('/login');
    }

 
  return (
    <div className={style.bar}>
        <div className={style.logoPart}>
        <img className={style.logo} src={logo} />
        </div>
        <div className={style.userInfo}>
            <h3>{displayName}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Nav
