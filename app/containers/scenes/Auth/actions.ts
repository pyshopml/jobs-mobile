import { readFromStorage, removeFromStorage, saveToStorage } from 'tools/AsyncStorage'

import { ILoginCredentials, ISignupCredentials } from './interfaces';
import IAction from 'types/action.interface';
import scenes from 'scenes';
import { pushScene } from 'containers/SceneNavigator/actions'
import { authSignUp, authenticate, validate } from './api';
import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	AUTH_FAILED,
	SIGN_UP,
	SIGN_UP_ERROR,
	VALIDATE_ERROR,
	LOGOUT
} from './constants';


const signUpError = (payload: any): IAction => ({
	type: SIGN_UP_ERROR,
	data: payload,
});

const signUpSucceeded = (payload: any): IAction => ({
	type: SIGN_UP,
	data: payload,
});

const authStarted = (): IAction => ({
	type: AUTH_FETCHING,
});

const authSucceeded = (payload: any) : IAction => ({
	type: AUTH_SUCCESS,
	data: payload,
});

const authFailed = (errorMessage: string) : IAction => ({
	type: AUTH_FAILED,
	errorMessage,
});

const logoutUser = () => ({
	type: LOGOUT
});

export const logout = () => (dispatch: (action: IAction) => any) => {
	removeFromStorage('token');
	dispatch(logoutUser());
};

const validateError = (payload: any) : IAction => ({
	type: VALIDATE_ERROR,
	data: payload
});

export const validateToken = () => async (dispatch: (action: IAction) => any) => {
	dispatch(authStarted());
	const data = {
		auth_token: await readFromStorage('token')
	}
	validate(
		data,
		(data: any) => dispatch(authSucceeded(data)),
		(data: any) => dispatch(validateError(data)),
		(msg: string) => {}
	)
}

export const signUp = (data : ISignupCredentials) => (dispatch: (action: IAction | any) => void) => {
	dispatch(authStarted());
	authSignUp(
		data, 
		(data) => {
			dispatch(pushScene(scenes.auth({type: "signin"})))
			dispatch(signUpSucceeded(data))
		},
		(data) => dispatch(signUpError(data)),
		(msg: string) => dispatch(signUpError(msg))
	);
};

export const auth = (data : ILoginCredentials) => (dispatch: (action: IAction | any) => void) => {
	dispatch(authStarted());
	authenticate(
		data, 
		(data) => {
			saveToStorage('token', data.auth_token);
			dispatch(pushScene(scenes.vacancies()));
			return dispatch(authSucceeded(data))
		},
		(msg: string) => dispatch(authFailed(msg))
	)
}
