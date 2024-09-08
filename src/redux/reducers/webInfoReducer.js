import { createSlice } from '@reduxjs/toolkit';

const websiteReduce = createSlice({
  name: 'websiteReduce',
  initialState: {
    sender: {
      senderName: null,
      senderId: null,
      senderPhotoURL: null,
    },
    receiver: {
      receiverName: null,
      receiverId: null,
      receiverPhotoURL: null,
    },
  },
  reducers: {
    setSenderInfo: (state, action) => {
      state.sender = {
        senderName: action.payload.senderName,
        senderId: action.payload.senderId,
        senderPhotoURL: action.payload.senderPhotoURL, 
      };
    },
    setSenderImage: (state, action) => {
      state.sender = {
        ...state.sender, 
        senderPhotoURL: action.payload,
      };
    },
    setReceiverInfo: (state, action) => {
      state.receiver = {
        receiverName: action.payload.receiverName,
        receiverId: action.payload.receiverId,
        receiverPhotoURL: action.payload.receiverPhotoURL,
      };
    },
  },
});

export const { setSenderInfo, setReceiverInfo, setSenderImage } = websiteReduce.actions;

export default websiteReduce.reducer;
