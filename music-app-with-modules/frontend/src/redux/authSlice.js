import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userName: null,
        userId: null, 
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        // this gets populated from '/login' API call response.
        loginSuccess: (state, action) => {
            state.userName = action.payload.userName;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailed: (state, action) => {
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        signupSuccess: (state, action) => {
            state.userName = action.payload.userName;
            state.userId = action.payload.userId; 
            state.isAuthenticated = true;
            state.error = null;
        },
        signupFailed: (state, action) => {
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.userName = action.payload.userName;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.userName = null;
            state.userId = null; 
            state.isAuthenticated = false;
        },
        extraReducers: (builder) => {
            builder
            .addCase(loginUser.fulfilled, (action) => {
              // Call loginSuccess action creator with payload
                const userData = action.payload;
                return loginSuccess(userData);
            })
            .addCase(signupUser.fulfilled, (action) => {
                console.log("authSlice.js - signupUser.fulfilled. userID:" + action.payload)
              const userData = action.payload;
              return loginSuccess(userData);
          });
        }
    }
});

// Define async thunk to handle user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, thunkAPI) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const userData = await response.json();
  
        if (!response.ok) {
          // Check if response status is 400 and extract error message
          if (response.status === 400) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
          } else {
            throw new Error('Failed to login.');
          }
        }
  
        return userData;
      } catch (error) {
        return thunkAPI.rejectWithValue({ message: 'Failed to login.'});
      }
    }
  );

  // Define async thunk to handle user signup
  export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ username, password }, thunkAPI) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const userData = await response.json();
  
        if (!response.ok) {
          if (response.status === 400) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
          } else {
            throw new Error('Failed to signup.');
          }
        }
  
        return userData;
      } catch (error) {
        return thunkAPI.rejectWithValue({ message: 'Failed to signup.'});
      }
    }
  );
  



export const { loginSuccess, loginFailed, signupSuccess, signupFailed, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
