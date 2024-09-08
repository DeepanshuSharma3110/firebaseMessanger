import React, { useState, useEffect } from 'react';
import style from './Input.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../../redux/reducers/messageReducer';

const Input = () => {
  const website = useSelector((state) => state.website);
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const onChat = () => {
      if (website.sender.senderId && website.receiver.receiverId) {
        setOk(true);
      }
    };
    onChat();
  }, [website]);

  const sendMsg = async () => {
    if (msg.trim()) {
      const now = new Date();
      const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const data = {
        senderId: website.sender.senderId,
        reciverId: website.receiver.receiverId,
        msg: msg,
        timeStamp: formattedTime,  
      };
        
      const result = await dispatch(sendMessage(data));
      console.log(result);
      
      setMsg(''); // Clear the input field after sending
    }
  };

  return (
    <>
      {ok && (
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            className={style.inputField}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className={style.sendButton} onClick={sendMsg}>Send</button>
        </div>
      )}
    </>
  );
};

export default Input;
