import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';

import selectors from './selectors';
import { loadPosts, loadMorePosts } from './actions';
import VacancyList from './components/VacancyList';

interface Props {
  allPosts: any[];
  loadPosts(): void;
  loadMorePosts(): void;
};

interface State {
  dataSource: any
};

class Vacancies extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.loadMore = this.loadMore.bind(this);
  }
  componentWillReceiveProps(newProps){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.allPosts)
    })
  }
  componentDidMount() {
    this.props.loadPosts();
  }

  loadMore() {
    this.props.loadMorePosts()
  }

  render() {
    return (
      <VacancyList  dataSource={this.state.dataSource}
                  onEndReached={this.loadMore}
      />
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(loadPosts()),
  loadMorePosts: () => dispatch(loadMorePosts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);