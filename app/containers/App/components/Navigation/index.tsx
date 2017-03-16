import React from 'react';
import autobind from 'autobind-decorator'
import {View, Text, Image} from 'react-native';
import {Avatar, Drawer, Divider, COLOR, TYPO} from 'react-native-material-design';

import IScene from 'types/scene.interface';
import scenes from 'scenes';
import style from './style';

interface Props {
  routeKey: string;
  pushScene(scene:IScene);
  closeDrawer();
  popScene();
  isAuth: boolean;
};

@autobind
class Navigation extends React.Component<Props, null> {
  vacanciesSectionItems = () => ([
    {
      icon: 'view-list',
      value: 'Список',
      onPress: () => this.pushScene(scenes.vacancies()),
      active: this.props.routeKey === scenes.vacancies().key,
    },
    {
      icon: 'add-box',
      value: 'Создать',
      onPress: () => this.pushScene(scenes.vacancyCreation()),
      active: this.props.routeKey === scenes.vacancyCreation().key,
      disabled: !this.props.isAuth
    }
  ])
  pushScene(scene: IScene){
    this.props.closeDrawer();
    this.props.pushScene(scene)
  }

  render() {
    return (
      <Drawer theme='light'>
        <Drawer.Header>
          <View style={style.header}>
            <Text style={[style.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>
              JobsTeamMobile
            </Text>
          </View>
        </Drawer.Header>
        <Drawer.Section
          title="Вакансии"
          items={this.vacanciesSectionItems()}
        />
        <Divider style={{ marginTop: 8 }}/>
      </Drawer>
    );
  }
}

export default Navigation