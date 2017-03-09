import React, { Component } from 'react';
import { Snackbar } from 'react-native-material-design';
import { connect } from 'react-redux';
import { addNotification, removeFirstNotification } from './actions';
import selectors from './selectors';


import Navigator from '..//Navigator';

import style from './style';

interface Props{
  removeFirstNotification();
  addNotification(message: string)
};
interface State{};


class App extends Component<Props, State> {
  render() {
    return (
      <Navigator/>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  removeFirstNotification: () => dispatch(removeFirstNotification()),
  addNotification: (message: string) => dispatch(addNotification(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);