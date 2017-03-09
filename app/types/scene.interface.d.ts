import { ComponentClass } from 'react';

interface IScene{
  title: string;
  props: any;
  key: string
  component: ComponentClass<any>;
}
export default IScene;