import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-material-design';

import autobind from 'autobind-decorator';
import scenes from 'scenes';
import { ILoginCredentials } from "../../interfaces";

interface Props {
  onSubmit(credentials: ILoginCredentials);
  result: any;
}

interface State {
  email: string;
  password: string;
}

@autobind
class SignInForm extends Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  static contextTypes = {
    pushScene: React.PropTypes.func,
  };
  refs: {
    emailField: any;
    passwordField: any;
  }
  onSubmit(){
    const { email, password } = this.state;
    this.props.onSubmit({
      email,
      password
    })
    this.setState({
      password: ''
    })
  }
  render() {
    const { email, password } = this.state;
    const { result:{
      email: emailErr,
      password: passwordErr,
      non_field_errors
    }} = this.props;
    return (
      <View>
        <TextInput
          placeholder="Email"
          ref="emailField"
          blurOnSubmit={false}
          value={email}
          returnKeyType="next"
          onSubmitEditing={() => this.refs.passwordField.focus()}
          keyboardType="email-address"
          onChangeText={ (text) => this.setState({email: text}) }
        />
        <TextInput
          placeholder="Пароль"
          ref="passwordField"
          onSubmitEditing={this.onSubmit}
          secureTextEntry={true}
          value={password}
          onChangeText={ (text) => this.setState({password: text}) }
        />
        <Button text="Войти" raised={true} onPress={this.onSubmit} />
        <TouchableHighlight onPress={() => this.context.pushScene(scenes.auth({type: 'signup'}))}>
          <Text>Ещё не зарегистрированы?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SignInForm;