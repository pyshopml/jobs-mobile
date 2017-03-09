import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Snackbar } from 'react-native-material-design';
import { connect } from 'react-redux';
import { DrawerLayoutAndroid } from 'react-native';

import { pushScene, popScene } from '../SceneNavigator/actions'
import selectors from './selectors';
import IScene from "types/scene.interface";
import SceneNavigator from '../SceneNavigator';
import Navigation from './components/Navigation';

interface Props{
  navigationState: any;
  pushScene();
  popScene();
}

@autobind
class App extends Component<Props, null> {
  refs: {
    drawer: any
  };
  openDrawer(){
    this.refs.drawer.openDrawer()
  };
  renderNavigationView(){
  }
  render() {
    return (
      <DrawerLayoutAndroid drawerWidth={300}
                           ref="drawer"
                           drawerPosition={DrawerLayoutAndroid.positions.Left}
                           renderNavigationView={this.renderNavigationView}
      >
        <SceneNavigator openDrawer={this.openDrawer}/>
      </DrawerLayoutAndroid>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  popScene: () => dispatch(popScene()),
  pushScene: (scene: IScene) => dispatch(pushScene(scene))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);