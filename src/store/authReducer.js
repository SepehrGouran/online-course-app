import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
    UPDATE_USER
} from './action-types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload
            };

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        // case LOGIN_SUCCESS:
        // case REGISTER_SUCCESS:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         isAuthenticated: true,
        //         isLoading: false,
        //     };

        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };

        default:
            return state
    }
};

export default authReducer;