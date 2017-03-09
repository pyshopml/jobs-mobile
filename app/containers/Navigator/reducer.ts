import {
  PUSH_SCENE,
  POP_SCENE
} from './constants';
import scenes from 'scenes';
import IScene from 'types/scene.interface'
import {NavigationExperimental} from 'react-native';
const {StateUtils: NavigationStateUtils} = NavigationExperimental;

function pushScene(navigationState, scene){
  if (navigationState.routes[navigationState.index].key === scene.key) // New scene is current scene
    return navigationState;
  const index = navigationState.routes.findIndex((route) => {
    return scene.key === route.key
  });
  if (index > -1) { // New scene is already in navigationState;
    const clonedState = Object.assign({}, navigationState);
    clonedState.routes.splice(index, 1);
    return NavigationStateUtils.push(clonedState, scene);
  }
  return NavigationStateUtils.push(navigationState, scene);
}

function changeNavigationState(navigationState, type: 'push' | 'pop', scene?) {
  switch (type) {
    case 'push':
      if(!scene) return navigationState;
      return pushScene(navigationState, scene);
    case 'pop':
      return NavigationStateUtils.pop(navigationState);
  }
  return navigationState;
}

interface IState{
  navigationState: {
    index: number,
    routes: IScene[]
  }
}

const initialModel = {
  navigationState: {
    index: 0,
    routes: [scenes.vacancies()]
  }
};

export default (state: IState = initialModel, action) => {
  switch (action.type) {
    case PUSH_SCENE:
      return Object.assign({}, state, {
        navigationState: changeNavigationState(
          state.navigationState,
          'push',
          action.data.scene
        )
      })
    case POP_SCENE:
      return Object.assign({}, state, {
        navigationState: changeNavigationState(state.navigationState, 'pop')
      })
    default:
      return state;
  }
};

