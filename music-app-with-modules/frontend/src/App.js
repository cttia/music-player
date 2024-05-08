import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from './redux/authSlice';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import Playlists from './components/Playlists';
import CreatePlaylist from './components/CreatePlaylist';


const App = () => {
    const userName = useSelector(state => state.auth.userName);
    const userId = useSelector(state => state.auth.userId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(clearUser());
        navigate('/login');  // Redirect to login page after logout
    };

    return (
        <>
        <NavigationBar userName={userName} handleSignOut={handleSignOut} />
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/home" /> : <LoginForm />}
            />
            <Route
                path="/signup"
                element={isAuthenticated ? <Navigate to="/home" /> : <SignupForm />}
            />
            <Route
                path="/home"
                element={
                    isAuthenticated ? (
                        <HomePage username={userName} onSignOut={handleSignOut} />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
                path="/playlists"
                element={
                    isAuthenticated ? (
                        <Playlists userId={userId}/>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route path="/create-playlist" element={
                    isAuthenticated ? (
                        <CreatePlaylist userId={userId}/>
                    ) : (
                        <Navigate to="/login" />
                    )
                } />
        </Routes>
         </>
    );
};


export default App;
