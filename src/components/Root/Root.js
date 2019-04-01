import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import qs from 'query-string';
import OLMap from 'ol/Map';
import Permalink from 'react-spatial/components/Permalink';
import Layer from 'react-spatial/Layer';
import Map from '../Map';

import { setCenter, setZoom } from '../../model/actions';

import './Root.scss';

const propTypes = {
  title: PropTypes.string,
  initialState: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),

  // mapStateToProps
  layers: PropTypes.arrayOf(PropTypes.instanceOf(Layer)),
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,

  // mapDispatchToProps
  dispatchSetCenter: PropTypes.func.isRequired,
  dispatchSetZoom: PropTypes.func.isRequired,
};

const defaultProps = {
  title: 'My react-spatial app',
  history: null,
  initialState: {},
  layers: [],
  center: [0, 0],
  zoom: 9,
};

class Root extends PureComponent {
  constructor(props) {
    super(props);
    const {
      center,
      zoom,
      initialState,
      dispatchSetZoom,
      dispatchSetCenter,
    } = this.props;

    // Permalink has the priority over the initial state.
    const params = {
      ...initialState,
      ...qs.parse(window.location.search),
    };

    const z = parseInt(params.zoom, 10);
    const x = parseFloat(params.x);
    const y = parseFloat(params.y);

    if (x && y) {
      dispatchSetCenter([x, y]);
    }

    if (z) {
      dispatchSetZoom(z);
    }

    this.params = {
      zoom: z || zoom,
      x: x || center[0],
      y: y || center[1],
    };

    const layerNames = this.getLayers();
    if (layerNames) {
      this.params.layers = layerNames;
    }
  }

  getLayers() {
    const { layers } = this.props;
    return layers
      .filter(l => l.isBaseLayer === true)
      .map(l => l.id)
      .join(',');
  }

  render() {
    const { title, center, zoom, layers, history } = this.props;
    this.params = {
      zoom,
      x: center[0],
      y: center[1],
    };

    const layerNames = this.getLayers(layers);
    if (layerNames) {
      this.params.layers = layerNames;
    }

    this.map = new OLMap({ controls: [] });

    return (
      <div className="tm-root">
        <Map map={this.map} zoom={zoom} />
        <div>
          <h1>{`${title} centered on ${center && center.toString()}`}</h1>
        </div>
        <Permalink params={this.params} history={history} />
      </div>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

const mapStateToProps = state => ({
  layers: state.layers,
  center: state.center,
  zoom: state.zoom,
});

const mapDispatchToProps = {
  dispatchSetCenter: setCenter,
  dispatchSetZoom: setZoom,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Root);
