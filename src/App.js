import React from 'react';
import { Provider } from 'react-redux';
import AppComponent from './app/AppComponent';

import store from './model/store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <AppComponent />
    </div>
  </Provider>
);

export default App;
