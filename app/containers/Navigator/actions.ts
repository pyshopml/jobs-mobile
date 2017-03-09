import {
  PUSH_SCENE,
  POP_SCENE
} from './constants';
import IScene from '../../interfaces/iscene';
import sectors from './selectors';
import { Action } from '../../interfaces/action';

export const pushScene = (scene: IScene) => (
  (dispatch) => {
    dispatch({
      type: PUSH_SCENE,
      data: {
        scene
      }
    })
  }
);

export const popScene = (): Action => ({
  type: POP_SCENE
})
