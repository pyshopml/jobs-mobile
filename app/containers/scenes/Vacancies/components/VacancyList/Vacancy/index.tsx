import React, {Component} from 'react';
import {Card} from 'react-native-material-design';
import {Text, TouchableHighlight} from 'react-native';
import IPost from 'types/post.interface';
import scenes from 'scenes';

import style from './style';

interface Props {
  post: IPost;
};


class Vacancy extends Component<Props, null> {
  static contextTypes = {
    pushScene: React.PropTypes.func,
  };
  onTitlePress = () => {
    this.context.pushScene(
      scenes.vacancyDetail(
        {postId: this.props.post.id},
        this.props.post.title
    )
    )
  };

  render() {
    const {post} = this.props;
    return (
      <Card style={style.post}>
        <TouchableHighlight onPress={this.onTitlePress}>
          <Text style={style.title}>
            {post.title}
          </Text>
        </TouchableHighlight>
        <Text style={style.description}>
          {post.description}
        </Text>
      </Card>
    );
  }
}

export default Vacancy;