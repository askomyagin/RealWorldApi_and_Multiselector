import { setItem, getItem, removeItem } from '../realworld-service';
import { UserAction, UserActionTypes, UserState } from '../types/user-types';

const initialState: UserState = {
    error: null,
    user: getItem('user'),
    loading: false,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.TRY_AUTH:
            return { loading: true, user: null, error: null };
        case UserActionTypes.AUTH_SUCCESS:
            const user = action.payload;
            setItem('user', user);
            return { loading: false, user: user, error: null };
        case UserActionTypes.AUTH_FAIL:
            return { loading: false, user: null, error: action.payload };
        case UserActionTypes.LOGOUT:
            removeItem('user');
            return { loading: false, user: null, error: null };
        default:
            return state;
    }
};
