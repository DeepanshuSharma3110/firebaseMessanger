import React, { useEffect, useState } from 'react';
import style from './Chat.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Chats from '../../components/chats/Chats';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkProfilePicture } from '../../redux/reducers/userReducer'; 
import { setSenderInfo } from '../../redux/reducers/webInfoReducer';
import ProfilePic from '../../components/ProfilePic/ProfilePic';

const Chat = () => {
  const [cookies] = useCookies(['uid', 'token']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const website = useSelector((state) => state.website);
  const [isProfilePic, setIsProfilePic] =  useState();


  useEffect(() => {
    const check = async () => {
      const uid = cookies.uid;
      const token = cookies.token;

      if (!uid || !token) {
        navigate('/login');
      } else {
        try {
          setIsProfilePic(website.sender.senderPhotoURL)
          if(!isProfilePic){

            const response = await dispatch(checkProfilePicture(uid));
            if (response.meta.requestStatus === 'fulfilled') {
              const userData = response.payload;
              const data = {
                senderName: userData.displayName,
                senderId: userData.uid,
                senderPhotoURL: userData.photoURL 
              };
              dispatch(setSenderInfo(data));
            } else {
              console.error('Failed to fetch profile picture:', response.payload);
            }
          }
          } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    };
    check();
  }, [cookies, navigate, dispatch]); 

 useEffect(()=>{
  console.log('website',website);
  setIsProfilePic(website.sender.senderPhotoURL)
})

  return (
   <>
      {
        !isProfilePic ? <ProfilePic /> : 
        <div className={style.mainContainer}>
        <div className={style.chatContainer}>
        <div className={style.sideBar}>
          <Sidebar />
        </div>
        <div className={style.chats}>
          <Chats />
        </div>
      </div>
      </div>
      }
   </>
  );
};

export default Chat;
