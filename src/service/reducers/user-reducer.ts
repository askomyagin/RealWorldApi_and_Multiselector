import { setItem, getItem, removeItem } from '../realworld-service';
import { UserAction, UserActionTypes, UserState } from '../types/user-types';

const initialState: UserState = {
    user: getItem('user'),
    error: null,
    loading: false,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.TRY_AUTH:
            return { loading: true, error: null, user: null };
        case UserActionTypes.AUTH_SUCCESS:
            const user = action.payload;
            setItem('user', user);
            return { loading: false, error: null, user: user };
        case UserActionTypes.AUTH_FAIL:
            return { loading: false, error: action.payload, user: null };
        case UserActionTypes.LOGOUT:
            removeItem('user');
            return { loading: false, user: null, error: null };
        default:
            return state;
    }
};
