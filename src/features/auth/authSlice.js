import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:80/api/users/login', userData);
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            const profileResponse = await axios.get('http://localhost:80/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return profileResponse.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {

            const { photos,avatar, ...formData } = userData;

            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('avatar', avatar[0]);

            for (let i = 0; i < photos.length; i++) {
                formDataToSend.append(`photos[${i}]`, photos[i]);
            }

            const response = await axios.post('http://localhost:80/api/users/register', formDataToSend);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {

                return rejectWithValue(error.response.data.error);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isLogin = false;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
