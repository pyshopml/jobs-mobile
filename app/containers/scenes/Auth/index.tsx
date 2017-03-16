import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-material-design';

import { connect } from 'react-redux';

import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { auth, logout, signUp } from './actions';
import selectors from './selectors';
import { ILoginCredentials, ISignupCredentials } from './interfaces';


interface Props {
	auth(LoginCredentials): any;
	signUp(SignupCredentials): any;
	logout(): void;
	type: 'signin' | 'signup';
	isSignUp: boolean;
	isAuth: boolean;
	isFetching: boolean;
	result: any;
}

class Auth extends Component<Props, null> {
	render() {
		const { type } = this.props;
	  return (
		  <Card style={{flex: 1, flexDirection: "column", justifyContent: 'center'}}>
				{ type == 'signin' ? <SignInForm {...this.props} onSubmit={this.props.auth}/>
					: type == 'signup' ? <SignUpForm {...this.props} onSubmit={this.props.signUp}/>
						: null}
		  </Card>
	  );
	}
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
	auth: (data : ILoginCredentials) => dispatch(auth(data)),
	signUp: (data : ISignupCredentials) => dispatch(signUp(data)),
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
