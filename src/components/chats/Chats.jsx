import React, { useEffect, useState, useRef } from 'react';
import style from './Chats.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../input/Input';
import welcomeImage from '../../assets/welcome.png';
import { readMsg } from '../../redux/reducers/messageReducer';

const Chats = () => {
    const website = useSelector((state) => state.website);
    const [profile, setProfile] = useState();
    const [welcome, setWelcome] = useState(true);
    const [messages, setMessages] = useState([]); 
    const dispatch = useDispatch();
    const messageEndRef = useRef(null);

    useEffect(() => {
        setProfile(website?.sender?.senderPhotoURL);
    }, [website]);

    useEffect(() => {
        const onChat = async () => {
            if (website?.sender?.senderId && website?.receiver?.receiverId) {
                setWelcome(false);
                const data = {
                    senderId: website.sender.senderId,
                    reciverId: website.receiver.receiverId,
                };
    
                const result = await dispatch(readMsg(data));
    
                if (result?.payload) {
                    const messagesArray = Object.values(result.payload); 
                    setMessages(messagesArray); 
                    console.log('Updated Messages:', messagesArray);
                }
            }
        };
        onChat();
    }, [website.sender.senderId, website.receiver.receiverId, dispatch, messages]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    console.log('Messages in Render:', messages);

    return (
        <div className={style.chatContainer}>
            <div className={style.profileContainer}>
                <img src={profile} className={style.userImage} alt="User" />
                <h4>{website?.sender?.senderName}</h4>
            </div>
            <div className={style.messageContainer}>
                {welcome ? (
                    <div>
                        <img src={welcomeImage} className={style.welcomeImage} alt="Welcome" />
                    </div>
                ) : (
                    Array.isArray(messages) && messages.length > 0 ? (
                        messages.map((m) => (
                            <div 
                                key={m.timeStamp}
                                className={website.sender.senderId === m.senderId ? style.sender : style.receiver}
                            >
                                <p>{m.msg}</p>
                            </div>
                        ))
                    ) : (
                        <p>No messages found</p> 
                    )
                )}
                <div ref={messageEndRef} /> {/* This div helps in scrolling */}
            </div>
            <div className={style.inputContainer}>
                <Input />
            </div>
        </div>
    );
};

export default Chats;
