import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser, loginSuccess } from '../features/auth/authSlice';
import './AuthPage.css';

const AuthPage = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const authStatus = useSelector((state) => state.auth.status);
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsLogin(false);
        } else if (location.pathname === '/login') {
            setIsLogin(true);
        }
        clearErrors();
    }, [location, clearErrors]);

    const handleRegisterClick = () => {
        setIsLogin(false);
        navigate('/register');
    };

    const handleLoginClick = () => {
        setIsLogin(true);
        navigate('/login');
    };

    const onSubmit = async (data) => {
        if (isLogin) {
            const resultAction = await dispatch(loginUser(data));
            if (loginUser.fulfilled.match(resultAction)) {
                dispatch(loginSuccess(resultAction.payload));
                navigate('/profile');
            } else {
                if (resultAction.payload) {
                    setError('apiError', { type: 'manual', message: 'Invalid credentials' });
                }
            }
        } else {
            const resultAction = await dispatch(registerUser(data));

            if (registerUser.fulfilled.match(resultAction)) {
                setIsLogin(true);
                navigate('/login');
            } else {

                setError('apiError', { type: 'manual', message: resultAction.payload });
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!isLogin && (
                        <>
                            <div>
                                <label>First Name</label>
                                <input type="text" {...register("firstName", { required: "First Name is required.", minLength: 2, maxLength: 25 })} />
                                {errors.firstName && <span>{errors.firstName.message}</span>}
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" {...register("lastName", { required: "Last Name is required.", minLength: 2, maxLength: 25 })} />
                                {errors.lastName && <span>{errors.lastName.message}</span>}
                            </div>
                        </>
                    )}
                    <div>
                        <label>Email</label>
                        <input type="email" {...register("email", { required: "Email is required." })} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" {...register("password", { required: "Password is required.", minLength: 6, maxLength: 50, pattern: /\d/ })} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    {!isLogin && (
                        <div>
                            <label>Avatar (required)</label>
                            <input type="file" {...register("avatar", { required: "Avatar is required." })} accept="image/*" />
                            {errors.avatar && <span>{errors.avatar.message}</span>}
                        </div>
                    )}
                    {!isLogin && (
                        <div>
                            <label>Photos</label>
                            <input type="file" {...register("photos", { required: "At least 4 photos are required." })} multiple />
                            {errors.photos && <span>{errors.photos.message}</span>}
                        </div>
                    )}
                    {errors.apiError && <span>{errors.apiError.message}</span>}
                    <button type="submit" disabled={authStatus === 'loading'}>{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <div className="toggle-auth">
                    {isLogin ? (
                        <p>
                            Don't have an account? <button onClick={handleRegisterClick}>Register</button>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <button onClick={handleLoginClick}>Login</button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
