import React, { useState } from 'react';
import style from './ProfilePic.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { updateProfilePic } from '../../redux/reducers/userReducer';
import { setSenderImage } from '../../redux/reducers/webInfoReducer';
const ProfilePic = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const dispatch = useDispatch();
  const website = useSelector((state) => state.website);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add upload functionality here, e.g., send the image to a server
    if (image) {
        const data =  {uid:website.sender.senderId, file:image}
        const response = await dispatch(updateProfilePic(data))
        if(response.meta.requestStatus){
            const url = response.payload;
             dispatch(setSenderImage(url))
        }
      setImage(null);
      setPreview('');
    }
  };

  return (
    <div className={style.container}>
      <h1>Upload Your Profile Picture</h1>
      <form className={style.uploadForm} onSubmit={handleSubmit}>
        <div className={style.previewContainer}>
          {preview ? (
            <img src={preview} alt="Profile Picture Preview" className={style.profilePicPreview} />
          ) : (
            <p>No image selected</p>
          )}
        </div>
        <input
          type="file"
          className={style.fileInput}
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit" className={style.uploadButton} disabled={!image}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProfilePic;
