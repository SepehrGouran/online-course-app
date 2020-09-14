import {
    SET_SLIDE_SHOW_COURSE,
    SET_SLIDE_SHOW_CURRENT_SLIDE_INDEX,
    SLIDE_SHOW_NEXT,
    SLIDE_SHOW_PREVIOUS,
} from './action-types';

const initialState = {
    course: null,
    currentSlide: 0
};

const slideShowReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_SLIDE_SHOW_COURSE:
            return {
                ...state,
                course: action.payload,
                currentSlide: 0
            };

        case SET_SLIDE_SHOW_CURRENT_SLIDE_INDEX:
            return {
                ...state,
                currentSlide: action.payload
            };

        case SLIDE_SHOW_NEXT:
            return {
                ...state,
                currentSlide: state.currentSlide + 1
            };

        case SLIDE_SHOW_PREVIOUS:
            return {
                ...state,
                currentSlide: state.currentSlide - 1
            };


        default:
            return state;
    }
};

export default slideShowReducer;

