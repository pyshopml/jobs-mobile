import React, { Component } from 'react';
import { Card } from 'react-native-material-design';
import { connect } from 'react-redux';

import { loadPost } from './actions';
import IPost from '../../../types/post.interface';
import { ScrollView, Text } from 'react-native'

import selectors from './selectors';

import style from './style';

interface Props {
  openedPost: IPost;
  loadPost(id: number);
  postId: number
}

interface State {
  description: any;
};

class VacancyDetail extends Component<Props, State> {
  componentDidMount(){
    this.props.loadPost(+this.props.postId);
  }
  renderLoading(){
    return(
      <Text>Loading</Text>
    )
  }
  render() {
    if(!this.props.openedPost)
      return this.renderLoading();
    return (
      <ScrollView>
        <Card style={style.header}>
          <Text style={style.date}> 11.11.11</Text>
          <Text style={style.title}>{this.props.openedPost.title}</Text>
          <Text style={style.employer}>Employer</Text>
        </Card>
        <Card style={style.post}>
          <Text>
            {this.props.openedPost.description}
          </Text>
        </Card>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPost: (id: number) => dispatch(loadPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetail);