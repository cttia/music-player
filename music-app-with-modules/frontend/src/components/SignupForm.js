import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css'; 
import { signupUser, signupFailed, signupSuccess,  } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // State variable to hold error message
 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let signupResponse = '';
        // Use useSelector to get the authentication state from Redux store
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

        const handleSubmit = (event) => {
            event.preventDefault();
            dispatch(signupUser({ username, password }))
                .then((resultAction) => {
                    signupResponse = resultAction.payload;
   
                    if (signupResponse.userId) {
                        console.log("SignupForm.js - got success response from backend.")
                        dispatch(signupSuccess(signupResponse));
                    } else {
                        console.log("SignupForm.js - got error response from backend.", resultAction.payload)
                        dispatch(signupFailed('Failed to signup.')); 
                        setErrorMessage(signupResponse.message);
                    }
                })
                .catch((error) => {
                    console.error('Signup error:', error);
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
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-box">
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Sign Up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    );
};

export default SignupForm;
