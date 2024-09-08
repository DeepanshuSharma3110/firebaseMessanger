// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// import {auth,db} from "../../firebase.js";
// import { collection, addDoc, query, where, getDocs ,updateDoc} from "firebase/firestore"; 
// import { getStorage, ref ,uploadBytes, getDownloadURL } from "firebase/storage";

// const checkLoginStatus = createAsyncThunk('checkLoginStatus',async()=>{
//     try{
//         await onAuthStateChanged(auth,(user)=>{
//             if(user){
//                 const uId = user.uid;
//                 return uId;
//             }return null;
//         })
//     }catch(err){
//         console.log(err);
//     }
// })


// const getAllUser = createAsyncThunk('getAllUser',async()=>{
//     const querySnapshot = await getDocs(collection(db, "users"));
//     const users = querySnapshot.docs.map(doc => ({
//         id: doc.id, // Get the document ID
//         ...doc.data() // Spread the document data
//       }));
    
//    return users;
// });



// const updateProfilePic = createAsyncThunk('updateProfilePic', async (data, { dispatch }) => {
//     const { uid, file } = data;
//     const storage = getStorage();
//     const profilePicRef = ref(storage, `${uid}/profilePic`);

//     try {
//         const snapshot = await uploadBytes(profilePicRef, file);
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         if (downloadURL) {
//             const userRef = collection(db, 'users');
//             const q = query(userRef, where('uid', '==', uid));
//             const querySnapshot = await getDocs(q);
//             if (!querySnapshot.empty) {
//                 const userDoc = querySnapshot.docs[0].ref;
//                 await updateDoc(userDoc, { photoURL: downloadURL });         
//                return downloadURL;
//             } else {
//               return null;
//             }
//         }
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         throw error;
//     }
// });



// const checkProfilePicture = createAsyncThunk('checkProfilePicture',async(uid)=>{
  
//     try {
//         const userRef = collection(db, 'users');
//         const q = query(userRef, where('uid', '==', uid));
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           return querySnapshot.docs[0].data();
//         } else {
//           return null;
//         }
//       } catch (err) {
//         console.error('Error fetching user:', err);
//       }
// })

// const logout = createAsyncThunk('logout',async()=>{
//     try{
//         await signOut(auth);

//     }catch(err){
//         console.log(
//             err
//         );
        
//     }
// })

// const addUser = createAsyncThunk('addUser',async({ username, email, password })=>{
//     try{
//          const response = await createUserWithEmailAndPassword(auth, email, password);
//          if(response.user){
//             const docRef = await addDoc(collection(db, "users"), {
//                 accessToken:response.user.accessToken,
//                 displayName:username,
//                 email:email,
//                 photoURL:null,
//                 uid:response.user.uid,
//               });
//              return docRef.id;
//             }           
//   }catch(err){
//         console.log(err.message);
//     }    
// })

// const loginUser = createAsyncThunk('loginUser',async({email, password})=>{
//     try{
//         const response  = await signInWithEmailAndPassword(auth,email,password);
//         console.log(response);
        
//        // return response.user;
        
//     }catch(err){
//         console.log(err);
//     }
// }
// )


// const userReducer = createSlice(
//     {
//     name:'userReducer',
//     initialState:{
//         data:{},
//         isLoading:false,
//         error:null,    
//     },
//     reducers:{},
//     extraReducers:(builder)=>{
//         //add a user
//         builder.addCase(addUser.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(addUser.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(addUser.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         })

//         //check user login
//         builder.addCase(loginUser.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(loginUser.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(loginUser.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         })



//         //check UserCurrent Login Status
//         builder.addCase(checkLoginStatus.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(checkLoginStatus.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(checkLoginStatus.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         })



//           //logout
//           builder.addCase(logout.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(logout.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(logout.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         });

//         //checkProfilePic
//         builder.addCase(checkProfilePicture.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(checkProfilePicture.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(checkProfilePicture.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         });

//         //upload profile pic
//         builder.addCase(updateProfilePic.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(updateProfilePic.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(updateProfilePic.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         });


//         //get all user 
//         builder.addCase(getAllUser.fulfilled,(state,action)=>{
//             state.data=action.payload;
//             state.isLoading=false;
//             state.error=null;
//         })


//         builder.addCase(getAllUser.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.error = action.payload || 'Failed to create user';
//         })


//         builder.addCase(getAllUser.pending,(state,action)=>{
//             state.isLoading=true;
//             state.error=null;
//         });

//     }}


    
// )


// export default userReducer.reducer;
// export {addUser,loginUser,checkLoginStatus, logout,checkProfilePicture,updateProfilePic, getAllUser}




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { collection, addDoc, query, where, getDocs, updateDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const checkLoginStatus = createAsyncThunk('checkLoginStatus', async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.uid);
            } else {
                resolve(null);
            }
        }, reject);
    });
});

const getAllUser = createAsyncThunk('getAllUser', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return users;
    } catch (error) {
        throw error;
    }
});

const updateProfilePic = createAsyncThunk('updateProfilePic', async (data) => {
    const { uid, file } = data;
    const storage = getStorage();
    const profilePicRef = ref(storage, `${uid}/profilePic`);

    try {
        const snapshot = await uploadBytes(profilePicRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        if (downloadURL) {
            const userRef = collection(db, 'users');
            const q = query(userRef, where('uid', '==', uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].ref;
                await updateDoc(userDoc, { photoURL: downloadURL });
                return downloadURL;
            } else {
                throw new Error('User not found');
            }
        } else {
            throw new Error('Failed to get download URL');
        }
    } catch (error) {
        throw error;
    }
});

const checkProfilePicture = createAsyncThunk('checkProfilePicture', async (uid) => {
    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
});

const logout = createAsyncThunk('logout', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
});

const addUser = createAsyncThunk('addUser', async ({ username, email, password }) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if (response.user) {
            const docRef = await addDoc(collection(db, "users"), {
                accessToken: response.user.accessToken,
                displayName: username,
                email: email,
                photoURL: null,
                uid: response.user.uid,
            });
            return docRef.id;
        }
    } catch (error) {
        throw error;
    }
});

const loginUser = createAsyncThunk('loginUser', async ({ email, password }) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
    } catch (error) {
        throw error;
    }
});

const userReducer = createSlice({
    name: 'userReducer',
    initialState: {
        data: {},
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to create user';
            })
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to log in';
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(checkLoginStatus.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(checkLoginStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to check login status';
            })
            .addCase(checkLoginStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(logout.fulfilled, (state) => {
                state.data = {};
                state.isLoading = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to log out';
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(checkProfilePicture.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(checkProfilePicture.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch profile picture';
            })
            .addCase(checkProfilePicture.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(updateProfilePic.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateProfilePic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update profile picture';
            })
            .addCase(updateProfilePic.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(getAllUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
    }
});

export default userReducer.reducer;
export { addUser, loginUser, checkLoginStatus, logout, checkProfilePicture, updateProfilePic, getAllUser };
