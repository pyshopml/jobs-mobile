import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import autobind from 'autobind-decorator';
import scenes from 'scenes';
import { ISignupCredentials } from "../../interfaces";
import { Button } from 'react-native-material-design';

interface Props {
  onSubmit(credentials: ISignupCredentials);
  result: any;
}

interface State {
  email: string;
  password: string;
  name: string;
}

@autobind
class SignUpForm extends Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }
  static contextTypes = {
    pushScene: React.PropTypes.func,
  };
  refs: {
    emailField: any;
    passwordField: any;
    nameField: any;
  }
  onSubmit(){
    const { email, password, name } = this.state;
    this.props.onSubmit({
      name,
      email,
      password
    })
    this.setState({
      password: ''
    })
  }
  render() {
    const { email, password, name } = this.state;
    const { result:{
      email: emailErr,
      password: passwordErr,
      name: nameErr,
      non_field_errors
    }} = this.props;
    return (
      <View>
        <TextInput
          placeholder="Имя пользователя"
          ref="nameField"
          blurOnSubmit={false}
          value={name}
          returnKeyType="next"
          onSubmitEditing={() => this.refs.emailField.focus()}
          onChangeText={ (text) => this.setState({name: text}) }
        />
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
        <Button text="Зарегистрироваться" raised={true} onPress={this.onSubmit} />
        <TouchableHighlight onPress={() => this.context.pushScene(scenes.auth({type: 'signin'}))}>
          <Text>Уже зарегистрированы?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default SignUpForm;