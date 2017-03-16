import React, { Component }from 'react';
import { TextInput, View, LayoutAnimation } from 'react-native';
import autobind from 'autobind-decorator'

interface Props{
  placeholder?: string;
  maxHeight?: number;
  minHeight?: number;
  onChange?(event);
}
interface State{
  height: number
}
@autobind
class AutoGrowingTextInput extends Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      height: null
    }
  }
  static defaultProps = {
    minHeight: 0
  };
  onChange(event){
    this.setState({
      height: this.getValidHeight(event.nativeEvent.contentSize.height)
    })
    if(this.props.onChange)
      this.props.onChange(event);
  };
  onContentSizeChange(event) {
    this.onChange(event);
  }
  getValidHeight(height) {
    const minCappedHeight = Math.max(this.props.minHeight, height);
    if(!this.props.maxHeight) {
      return minCappedHeight;
    }
    return Math.min(this.props.maxHeight, minCappedHeight);
  }
  focus(){
    this.refs.input.focus()
  }
  refs: {
    input: HTMLElement
  }
  render(){
    return(
      <TextInput placeholder={this.props.placeholder}
                 multiline={true}
                 ref="input"
                 style={{height: this.state.height}}
                 onChange={this.onChange}
                 onContentSizeChange={this.onContentSizeChange}/>
    )
  }

}

export default AutoGrowingTextInput;