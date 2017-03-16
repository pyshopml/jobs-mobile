import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	LOGOUT,
	SIGN_UP,
	SIGN_UP_ERROR,
	VALIDATE_ERROR
} from './constants';
import IAction from "../../../types/action.interface";

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
	result: {},
	isAuth: false,
	isSignUp: false,
	error: ''
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTH_FETCHING:
      return Object.assign({}, state, { isFetching: true });

    case AUTH_SUCCESS:
	    const isAuth = action.data.auth_token ? true : false
      return Object.assign(
        {},
        state,
        { isSuccess: true, isFetching: false, result: action.data, isAuth: isAuth }
      );

	  case LOGOUT:
      return Object.assign({}, state, initialState);

	  case SIGN_UP:
		  return Object.assign({}, state,  {
			  isFetching:false,
			  isSignUp:true,
			  result:action.data,
		  });

	  case SIGN_UP_ERROR:
		  return Object.assign({}, state,  {
			  isFetching:false,
			  isSignUp:false,
			  result:action.data,
		  })

	  case VALIDATE_ERROR :
		  return Object.assign({}, state,  {
			  isFetching:false,
			  isSignUp:false,
			  isAuth: false,
			  result:action.data,
		  })

    default:
      return state;
  }
}