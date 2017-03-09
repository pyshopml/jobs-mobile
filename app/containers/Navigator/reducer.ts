import {
  PUSH_SCENE,
  POP_SCENE
} from './constants';
import scenes from '../../scenes';
import {NavigationExperimental} from 'react-native';
const {StateUtils: NavigationStateUtils,} = NavigationExperimental;

const initialModel = {
  navigationState: {
    index: 0,
    routes: [scenes.vacancies()]
  }
};

function changeNavigationState(navigationState, type: 'push' | 'pop', scene?) {
  switch (type) {
    case 'push':
      if(!scene) return navigationState;
      if (navigationState.routes[navigationState.index].key === scene.key)
        return navigationState;
      const index = navigationState.routes.findIndex((route) => {
        return scene.key === route.key
      });
      if (index > -1) {
        const clonedState = Object.assign({}, navigationState);
        clonedState.routes.splice(index, 1);
        return NavigationStateUtils.push(clonedState, scene);
      }
      return NavigationStateUtils.push(navigationState, scene);
    case 'pop':
      return NavigationStateUtils.pop(navigationState);
  }
  return navigationState;
}

export default (state = initialModel, action) => {
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

