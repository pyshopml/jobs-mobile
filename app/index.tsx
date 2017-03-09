import React from 'react';
import { Provider } from 'react-redux';
import configStore from './store';

import App from './containers/App';

const store = configStore({});

class Main extends React.Component<null, null> {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

export default Main;
