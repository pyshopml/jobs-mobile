import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { NavigationExperimental, BackAndroid } from 'react-native';

import { pushScene, popScene } from './actions';
import { logout } from '../scenes/Auth/actions'
import IScene from 'types/scene.interface';
import selectors from './selectors';
import scenes from 'scenes';
import Header from './components/Header'

const { CardStack: NavigationCardStack } = NavigationExperimental;


interface Props {
  popScene?();
  logout?();
  navigationState?: any;
  pushScene?(scene: IScene);
  openDrawer();
  isAuth?: boolean;
};
interface State {};

@autobind
class SceneNavigator extends Component<Props, State> {
  getChildContext() {
    return {
      popScene: this.props.popScene,
      pushScene: this.props.pushScene
    };
  }
  static childContextTypes = {
    popScene: React.PropTypes.func,
    pushScene: React.PropTypes.func,
  };
  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigationState.routes.length <= 1  ) {
        return false;
      }
      this.props.popScene();
      return true;
    });
  }
  renderScene(sceneProps){
    const SceneComponent = sceneProps.scene.route.component;
    const props = sceneProps.scene.route.props;
    return (
      <SceneComponent {...props}/>
    )
  }
  renderHeader(sceneProps){
    return (
      <Header onIconPress={this.props.openDrawer}
              action={this.getHeaderAction()}
              title={sceneProps.scene.route.title}/>
    )
  }
  getHeaderAction(){
    const { signIn, signOut } = this.actions;
    return this.props.isAuth ? signOut : signIn
  }
  actions = {
    signIn: {
      icon: 'person-outline',
      onPress: () => {
        this.props.pushScene(scenes.auth({type: 'signin'}))
      }
    },
    signOut: {
      icon: 'exit-to-app',
      onPress: () => {
        this.props.logout()
      }
    }
  }
  render() {
    return (
    <NavigationCardStack onNavigateBack={this.props.popScene}
                         navigationState={this.props.navigationState}
                         direction={'horizontal'}
                         scenesStyle={{marginTop: 56}}
                         gestureResponseDistance={100}
                         renderHeader={this.renderHeader}
                         renderScene={this.renderScene}/>
    );
  }
}

const mapStateToProps = (state, ownProps: Props) => selectors(state);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  popScene: () => dispatch(popScene()),
  pushScene: (scene: IScene) => dispatch(pushScene(scene))
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneNavigator);