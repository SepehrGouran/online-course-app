import axios from 'axios';

export const SHOW_SIGNUP_FORM = 'SHOW_SIGNUP_FORM';
export const SHOW_SIGNIN_FORM = 'SHOW_SIGNIN_FORM';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const UPDATE_USER = 'UPDATE_USER';
export const LOAD_USER_ENROLLEMENT = 'LOAD_USER_ENROLLEMENT';
export const ADD_ENROLLEMENT = 'ADD_ENROLLEMENT';
export const ENROLLEMENT_LOADING = 'ENROLLEMENT_LOADING';
export const CLOSE_ENROLLEMENT_SNACKBAR = 'CLOSE_ENROLLEMENT_SNACKBAR';
export const SET_SLIDE_SHOW_COURSE = 'SET_SLIDE_SHOW_COURSE';
export const SET_SLIDE_SHOW_CURRENT_SLIDE_INDEX = 'SET_SLIDE_SHOW_CURRENT_SLIDE_INDEX';
export const SLIDE_SHOW_NEXT = 'SLIDE_SHOW_NEXT';
export const SLIDE_SHOW_PREVIOUS = 'SLIDE_SHOW_PREVIOUS';
export const UPDATE_TOOLBAR_TITLE = 'UPDATE_TOOLBAR_TITLE';

export const ShowForm = {
    SHOW_SIGNUP: 'SHOW_SIGNUP',
    SHOW_SIGNIN: 'SHOW_SIGNIN',
};

export const addEnrollementCreator = (courseId) => {
    return {
        type: ADD_ENROLLEMENT,
        payload: courseId
    }
};

export const closeSnackbarCreator = () => {
    return {
        type: CLOSE_ENROLLEMENT_SNACKBAR
    }
};

export const addEnrollement = (courseId, token) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_DOMAIN + 'enrollments/add', {
            courseId: courseId
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            dispatch(addEnrollementCreator(courseId));
            setTimeout(() => {
                dispatch(closeSnackbarCreator());
            }, 3000);
        })
    }
};
