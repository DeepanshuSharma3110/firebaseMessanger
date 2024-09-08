import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import webInfoReducer from "./reducers/webInfoReducer";
import messageReducer from "./reducers/messageReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    website:webInfoReducer,
    message:messageReducer
  },
});

export default store;