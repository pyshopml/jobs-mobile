import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushScene, popScene } from './actions';
import IScene from 'types/scene.interface';
import selectors from './selectors';
import { NavigationExperimental, BackAndroid } from 'react-native';

const { CardStack: NavigationCardStack } = NavigationExperimental;


interface Props {
  popScene();
  navigationState: any;
  pushScene(scene: IScene);
};
interface State {};

class Navigator extends Component<Props, State> {
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
  render() {
    return (
    <NavigationCardStack onNavigateBack={this.props.popScene}
                         navigationState={this.props.navigationState}
                         direction={'horizontal'}
                         scenesStyle={{marginTop: 56}}
                         gestureResponseDistance={100}
                         renderScene={this.renderScene}/>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  popScene: () => dispatch(popScene()),
  pushScene: (scene: IScene) => dispatch(pushScene(scene))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);