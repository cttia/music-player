import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../redux/playlistsSlice';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = ({ userId }) => {
  const [playlistName, setPlaylistName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleCreatePlaylist = () => {
    console.log("createPlaylist.js - input data:" + userId + "," + playlistName)
    dispatch(createPlaylist({ userId, playlistName }));
    navigate('/playlists');
  };

  return (
    <div>
      <h1>Create Playlist</h1>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
        required
      />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
    </div>
  );
};

export default CreatePlaylist;
