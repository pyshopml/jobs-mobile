import React, { Component } from 'react';
import { ListView } from 'react-native';

import Vacancy from './Vacancy';

interface Props {
  dataSource: any;
  onEndReached();
};

class VacancyList extends Component<Props, null> {
  render() {
    return (
      <ListView dataSource={this.props.dataSource}
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={10}
                pageSize={10}
                renderRow={(rowData) => <Vacancy post={rowData}/>}
      />
    );
  }
}

export default VacancyList;