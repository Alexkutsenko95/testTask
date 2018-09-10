import {
    FETCH_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
    PATCH_DATA,
    POST_DATA,
    DELETE_DATA,
    PATCH_DATA_SUCCESS,
    DELETE_DATA_SUCCESS, POST_DATA_SUCCES
} from '../actions/types';
import update from 'react-addons-update';


const INITIAL_STATE = {
    users: void 0,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_DATA:
            return {
                users: void 0,
                error: null
            };
        case FETCH_DATA_SUCCESS:
            return {
                users: action.payload,
                error: null
            };
        case POST_DATA:
            return {
                ...state
            };
        case POST_DATA_SUCCES:
            return {
                ...state,
                users: [...state.users, action.payload]
            };

        case PATCH_DATA:
            return {...state};
        case PATCH_DATA_SUCCESS:
            return update(state, {
                users: {
                    [action.payload.id - 1]: {$set: action.payload}
                }
            });

        case DELETE_DATA:
            return {...state};
        case DELETE_DATA_SUCCESS:
            return {...state, users: state.users.filter(user => user.id !== action.payload.id)};
        case FETCH_DATA_ERROR:
            return {
                users: void 0,
                error: action.payload
            };

        default:
            return state;
    }
}