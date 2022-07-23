import { REGISTER_FAIL, REGISTER_SUCCESS , USER_LOADED , AUTH_ERROR  ,LOGIN_SUCCESS , LOGIN_FAIL , LOGOUT, ACCOUNT_DELETED,
UPDATE_INVENTORY} from "../actions/types";

const initialState= {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    type: null
}

function auth (state = initialState , action){
    const {type , payload} = action;
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
                type: payload.userType
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                type: null
            }
        case UPDATE_INVENTORY:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default:
            return state;
    }
}
export default auth;