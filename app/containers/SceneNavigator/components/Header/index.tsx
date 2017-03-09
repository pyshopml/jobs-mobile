import React, { Component } from 'react'
import { Toolbar  } from 'react-native-material-design';

import { View } from 'react-native';

import style from './style';

interface Props{
  title: string;
  onIconPress()
};

class Header extends Component<Props, null> {
  render() {
    return (
      <Toolbar style={style.header}
               onIconPress={this.props.onIconPress}
               title={this.props.title || "JobsMobile"}
               icon='menu'
      />
    );
  }
}

export default Header;