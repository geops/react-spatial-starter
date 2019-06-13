import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import OLMap from 'ol/Map';
import { defaults as defaultInteractions } from 'ol/interaction';
import Zoom from 'react-spatial/components/Zoom';

import APP_CONF from './appConfig';
import Permalink from './components/Permalink';
import Map from './components/Map';
import store from './model/store';

import 'react-spatial/themes/default/index.scss';
import './App.scss';

const propTypes = {
  initialState: PropTypes.object,
};

const defaultProps = {
  initialState: {},
};

class App extends Component {
  constructor(props) {
    super(props);
    this.map = new OLMap({
      controls: [],
      interactions: defaultInteractions({
        altShiftDragRotate: false,
        pinchRotate: false,
      }),
    });
  }

  render() {
    const { initialState } = this.props;
    return (
      <Provider store={store}>
        <div className="tm-app">
          <Map map={this.map} projection={APP_CONF.projection} />
          <Permalink map={this.map} initialState={initialState} />
          <Zoom map={this.map} />
        </div>
      </Provider>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
