import {LOAD_USER_ENROLLEMENT, ADD_ENROLLEMENT, ENROLLEMENT_LOADING, CLOSE_ENROLLEMENT_SNACKBAR} from './action-types';

const initalState = {
    enrollements: [],
    isLoading: false,
    added: false,
};

const enrollementReduce = (state = initalState, action) => {
    switch (action.type) {
        case LOAD_USER_ENROLLEMENT:
            return {
                ...state,
                enrollements: action.payload
            };

        case ENROLLEMENT_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case ADD_ENROLLEMENT:
            return {
                ...state,
                isLoading: false,
                added: true,
                enrollements: state.enrollements.concat(action.payload),
            };

        case CLOSE_ENROLLEMENT_SNACKBAR:
            return {
                ...state,
                added: false,
            };

        default:
            return state;
    }
};

export default enrollementReduce;