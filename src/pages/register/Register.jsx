import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './Register.module.css';
import { addUser } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';


const Register = () => {

  const [cookies] = useCookies(['uid', 'token']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email:'',
    password: ''
  });
  
  useEffect(()=>{
    const check = ()=>{
      const uid = cookies.uid;
      const token = cookies.token;
      if(uid && token){
        navigate('/');
      }  
    }
    check();
  },[])


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await dispatch(addUser(user));
    if(response){
        navigate('/login');
    }
  };
  
  return (
    <div>
      <div className={style.container}>
        <div className={style.box}>
          <h1>Register</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              value={user.username}
              />
              <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={user.email}
              />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={user.password}
              />
               <Link to='/login' >Already Have An Account</Link>
            <button type="submit" className={style.loginButton}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Register