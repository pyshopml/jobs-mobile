import {
  PUSH_SCENE,
  POP_SCENE
} from './constants';
import IScene from 'types/scene.interface';
import IAction from 'types/action.interface';

export const pushScene = (scene: IScene) => (
  (dispatch: (action: IAction) => any) => {
    dispatch({
      type: PUSH_SCENE,
      data: {
        scene
      }
    })
  }
);

export const popScene = (): IAction => ({
  type: POP_SCENE
})
