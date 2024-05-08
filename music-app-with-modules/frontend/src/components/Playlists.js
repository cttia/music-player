import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylist, fetchPlaylists } from '../redux/playlistsSlice';

const Playlists = ({ userId }) => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists.playlists);
    const [playlistName, setPlaylistName] = useState('');
    const isLoading = useSelector(state => state.playlists.status === 'loading');

    useEffect(() => {
        if (userId) {
            dispatch(fetchPlaylists(userId));
        }
    }, [dispatch, userId]);

    const handleCreatePlaylist = () => {
        if (playlistName.trim()) {
            dispatch(createPlaylist({ userId, playlistName })).then(() => {
                // After the createPlaylist action is resolved, fetch the updated playlists
                dispatch(fetchPlaylists(userId));
                setPlaylistName('');
            }).catch(error => {
                console.error('Failed to create playlist:', error);
            });
        }
    };

    
   

    return (
        <div>
      
            <h1>Playlists</h1>
            <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
            />
            <button onClick={handleCreatePlaylist}>Create New Playlist</button>
            {isLoading && <p>Loading...</p>}
            <ul>
                {playlists.map(playlist => (
                    <li key={playlist.id}>
                        <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlists;
