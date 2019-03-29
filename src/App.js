import React from 'react';
import { Provider } from 'react-redux';
import Root from './components/Root';

import store from './model/store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Root />
    </div>
  </Provider>
);

export default App;
