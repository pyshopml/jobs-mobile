import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import { Button } from 'react-native-material-design';
import autobind from 'autobind-decorator'
import AutoGrowingTextInput from 'components/AutoGrowingTextInput';


import INewPost from 'types/new_post.interface'


interface Props {
  onSubmit(post: INewPost)
};
interface State {
  title: string;
  description: string;
}

@autobind
class Form extends Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }
  onTitleChange(event){
    this.setState({
      title: event.nativeEvent.text
    })
  }
  onDescriptionChange(event){
    this.setState({
      description: event.nativeEvent.text
    })
  }
  refs: {
    descriptionInput: HTMLElement
  }
  onSubmit(){
    this.props.onSubmit({
      description: this.state.description,
      title: this.state.title
    })
  }
  render() {
    return (
      <View>
        <TextInput placeholder="Заголовок"
                   onChange={this.onTitleChange}
                   returnKeyType="next"
                   blurOnSubmit={false}
                   onSubmitEditing={() => this.refs.descriptionInput.focus()}
                   maxLength={1000}/>
        <AutoGrowingTextInput placeholder="Описание"
                              ref="descriptionInput"
                              minHeight={70}
                              maxHeight={200}
                              onChange={this.onDescriptionChange}/>
        <Button text="Создать" raised={true} onPress={this.onSubmit}/>
      </View>
    );
  }
}


export default Form;