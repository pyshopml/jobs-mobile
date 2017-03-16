import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-material-design';


import IPost from 'types/post.interface';
import INewPost from 'types/new_post.interface';
import Form from './components/Form';
import { createPost } from './actions';
import selectors from './selectors';

import style from './style';

interface Props {
  createdPost: IPost;
  createPost(post: INewPost);
};


class VacancyCreation extends Component<Props, null> {
  onFormSubmit = (post: INewPost) => {
    this.props.createPost(post)
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Card style={style.root}>
          <Form onSubmit={this.onFormSubmit}/>
        </Card>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  createPost: (post: INewPost) => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(VacancyCreation);