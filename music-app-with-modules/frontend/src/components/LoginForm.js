import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailed , loginUser} from '../redux/authSlice';
import '../styles.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // State variable to hold error message
 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let loginResponse = '';

    // Use useSelector to get the authentication state from Redux store
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(loginUser({ username, password }))
            .then((resultAction) => {
                loginResponse = resultAction.payload;
           

                if (loginResponse.userId) {
                    // Dispatch the loginSuccess action with userData
                    dispatch(loginSuccess(loginResponse));
                } else {
                    setErrorMessage(loginResponse.message);
                    dispatch(loginFailed('Failed to log in'));
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };
    
      

    // useEffect to navigate after the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            console.log("User authenticated. Navigating to /home");
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                
                {errorMessage && <p className="error-message">{errorMessage}</p>}
           
                <button type="submit">Login</button>
                <p>
                    New here? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
