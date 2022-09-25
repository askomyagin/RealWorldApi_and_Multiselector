import { UserAction, UserActionTypes, UserSignIn, UserSignUp } from '../types/user-types';
import { Dispatch } from 'redux';
import { RealWorldService } from '../realworld-service';

const RealWorld = new RealWorldService();

export const signUpUser =
    ({ email, password, username }: UserSignUp) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        RealWorld.makePostRequest('/users', { user: { email, password, username } })
            .then((res) => {
                dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user });
            })
            .catch((error) => dispatch({ type: UserActionTypes.AUTH_FAIL, payload: error }));
    };

export const signInUser =
    ({ email, password }: UserSignIn) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.TRY_AUTH });
        RealWorld.makePostRequest('/users/login', { user: { email, password } })
            .then((res) => {
                dispatch({ type: UserActionTypes.AUTH_SUCCESS, payload: res.data.user });
            })
            .catch((error) => dispatch({ type: UserActionTypes.AUTH_FAIL, payload: error }));
    };

export const logOutUser = () => (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.LOGOUT });
};
