import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/reducers/userReducer.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies] = useCookies(['uid', 'token']);
  const dispatch = useDispatch();
  const [uidCookies, setUidCookies] = useCookies(['uid']);
  const [tokenCookies, setTokenCookies] = useCookies(['token']);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
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
   const result = await dispatch(loginUser(user));
   console.log(result.meta.requestStatus);
   
    if(result.meta.requestStatus=='fulfilled'){
      setUidCookies('uid', result.payload.uid);
      setTokenCookies('token',result.payload.accessToken)
      navigate('/');
    }else{
      toast.error('something went wrong')
    }
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.box}>
          <h1>Login</h1>
          <form className={style.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              name="email"
              onChange={handleChange}
              value={user.username}
            />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={user.password}
            />
            <Link to='/register' >New User</Link>
            <button type="submit" className={style.loginButton}>Login</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
