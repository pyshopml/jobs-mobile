import React, { Component } from 'react';
import { Snackbar } from 'react-native-material-design';
import { connect } from 'react-redux';
import selectors from './selectors';

import SceneNavigator from '../SceneNavigator';

class App extends Component<null, null> {
  render() {
    return (
      <SceneNavigator/>
    );
  }
}

const mapStateToProps = state => selectors(state);

export default connect(mapStateToProps)(App);