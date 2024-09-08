import React, { useEffect, useState } from 'react';
import style from './Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../redux/reducers/userReducer';
import { setReceiverInfo } from '../../redux/reducers/webInfoReducer';

const Contacts = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const website = useSelector((state) => state.website);

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await dispatch(getAllUser());
        const mainId = website.sender.senderId;
        const filteredUsers = response.payload.filter(
          (u) => u.uid !== mainId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getuser();
  }, [dispatch, website]);

  const handleSelect = (contact) => {
    setSelectedContact(contact.uid);
    const data = {receiverName:contact.displayName ,receiverId:contact.uid ,receiverPhotoURL:contact.photoURL}
    dispatch(setReceiverInfo(data))
    console.log(selectedContact);
  };

  return (
    <div className={style.container}>
      {users.map((contact) => (
        <div
          key={contact.uid}
          className={`${style.contactBox} ${
            selectedContact === contact.uid ? style.selected : ''
          }`}
          onClick={() => handleSelect(contact)}
        >
          <img src={contact.photoURL || contact} alt="logo" className={style.contactImage} />
          <h3 className={style.username}>{contact.displayName}</h3>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
