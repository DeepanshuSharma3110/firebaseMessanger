import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase.js";
import { ref, set, query, orderByChild, equalTo, get } from "firebase/database";

// Thunk to read messages
const readMsg = createAsyncThunk('message/readMsg', async (data) => {
    const { senderId, reciverId } = data;

    try {
        // Create the composite key using the sender and receiver IDs in a consistent order
        const senderReciverKey = senderId < reciverId ? `${senderId}_${reciverId}` : `${reciverId}_${senderId}`;

        // Reference to the messages node and query by senderReciverKey
        const messagesRef = ref(database, 'messages');
        const messagesQuery = query(messagesRef, orderByChild('senderReciverKey'), equalTo(senderReciverKey));

        // Fetch the messages snapshot
        const snapshot = await get(messagesQuery);
        
        if (!snapshot.exists()) {
            return []; 
        }

        //Collect and return messages
        const messages = [];
        snapshot.forEach(childSnapshot => {
            const message = childSnapshot.val();
            messages.push({ ...message, id: childSnapshot.key });
        });

        // Sort messages by timestamp
        messages.sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
        const data = snapshot.val(); 
        return data
    } catch (err) {
        throw new Error(err.message);
    }
  
   
});





// Thunk to send a message
const sendMessage = createAsyncThunk('message/sendMessage', async (data) => {
    const { senderId, reciverId, msg, timeStamp } = data;

    try {
        const messageId = Date.now(); // Use current time as message ID
        const senderReciverKey = senderId < reciverId ? `${senderId}_${reciverId}` : `${reciverId}_${senderId}`; // Ensure consistent key order
        const messageRef = ref(database, `messages/${messageId}`);
        
        await set(messageRef, { 
            senderId,
            reciverId,
            msg,
            timeStamp,
            senderReciverKey // Composite key for querying
        });
        
        return { ...data, id: messageId };
    } catch (err) {
        throw new Error(err.message);
    }
});
const messageReducer = createSlice({
    name: 'message',
    initialState: {
        messages: [], // Initialize as an empty array
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handling the sendMessage thunk
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(state.messages)) {
                    state.messages.push(action.payload); // Push only if messages is an array
                } else {
                    state.messages = [action.payload]; // Reinitialize messages if it's not an array
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handling the readMsg thunk
            .addCase(readMsg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(readMsg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = Array.isArray(action.payload) ? action.payload : []; // Ensure it's an array
            })
            .addCase(readMsg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});


export default messageReducer.reducer;
export { sendMessage, readMsg };
