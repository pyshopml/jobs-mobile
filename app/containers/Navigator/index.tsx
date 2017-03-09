import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushScene, popScene } from './actions';
import IScene from '../../interfaces/iscene';
import selectors from './selectors';
import { NavigationExperimental, BackAndroid, DrawerLayoutAndroid} from 'react-native';
const { CardStack: NavigationCardStack } = NavigationExperimental;

import Navigation from '../../components/Navigation';
import Header from '../../components/Header';


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
  refs: {
    drawer: any
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
  openDrawer = () => {
    this.refs.drawer.openDrawer()
  };
  renderScene(sceneProps){
    const SceneComponent = sceneProps.scene.route.component;
    const props = sceneProps.scene.route.props;
    return (
      <SceneComponent {...props}/>
    )
  }
  renderHeader = (sceneProps) => {
    return (
      <Header onIconPress={this.openDrawer} title={sceneProps.scene.route.title}/>
    )
  }
  renderNavigationView = () => {
    const {index, routes} = this.props.navigationState;
    return <Navigation routeKey={routes[index].key}/>
  }
  render() {
    return (
      <DrawerLayoutAndroid drawerWidth={300}
                           ref="drawer"
                           drawerPosition={DrawerLayoutAndroid.positions.Left}
                           renderNavigationView={this.renderNavigationView}
      >
        <NavigationCardStack onNavigateBack={this.props.popScene}
                             navigationState={this.props.navigationState}
                             direction={'horizontal'}
                             renderHeader={this.renderHeader}
                             scenesStyle={{marginTop: 56}}
                             gestureResponseDistance={100}
                             renderScene={this.renderScene}/>
      </DrawerLayoutAndroid>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  popScene: () => dispatch(popScene()),
  pushScene: (scene: IScene) => dispatch(pushScene(scene))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);