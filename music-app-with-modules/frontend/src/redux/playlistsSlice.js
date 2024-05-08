import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create playlists slice
const playlistsSlice = createSlice({
  name: 'playlists',
  initialState:{
    userId: null,
    playlists: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlaylists.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const createPlaylist = createAsyncThunk(
  'playlists/createPlaylist',
  async ({ userId, playlistName}, thunkAPI) => { 
    try {
      console.log("playlistSlice.js - input data:" + userId + "," + playlistName)
      const response = await fetch('http://localhost:5000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, playlistName }),
      });
      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }
      const data = await response.json();
      console.log("playlists returned from DB: " + JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Define async thunk to fetch playlists
export const fetchPlaylists = createAsyncThunk(
  'playlists/fetchPlaylists',
  async (userId, thunkAPI) => {
    console.log("plsylistSlice.js fetchPlaylists started for userId" + userId);
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const data = await response.json();
      console.log("plsylistSlice.js fetchPlaylists DB cal returned" + JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { setUserId } = playlistsSlice.actions;

export default playlistsSlice.reducer;
