import * as actionTypes from './action-types';
import {CLOSE_ENROLLEMENT_SNACKBAR} from "./action-types";

const initialState = {
    // UI States
    showForm: actionTypes.ShowForm.SHOW_SIGNIN,
    toolbarTitle: 'Dashboard'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SIGNIN_FORM:
            return {
                ...state,
                showForm: actionTypes.ShowForm.SHOW_SIGNIN
            };

        case actionTypes.SHOW_SIGNUP_FORM:
            return {
                ...state,
                showForm: actionTypes.ShowForm.SHOW_SIGNUP
            };

        case actionTypes.UPDATE_TOOLBAR_TITLE:
            return {
                ...state,
                toolbarTitle: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;

