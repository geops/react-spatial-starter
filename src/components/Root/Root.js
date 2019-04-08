import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import qs from 'query-string';
import OLMap from 'ol/Map';
import Permalink from 'react-spatial/components/Permalink';
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
  center: [0, 0],
  zoom: 9,
};

class Root extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
    };
    this.map = new OLMap({ controls: [] });
  }

  componentDidMount() {
    const { initialState, dispatchSetZoom, dispatchSetCenter } = this.props;

    // Permalink has the priority over the initial state.
    const parameters = {
      ...initialState,
      ...qs.parse(window.location.search),
    };

    const z = parseInt(parameters.z, 10);
    const x = parseFloat(parameters.x);
    const y = parseFloat(parameters.y);

    if (x && y) {
      dispatchSetCenter([x, y]);
    }

    if (z) {
      dispatchSetZoom(z);
    }
  }

  render() {
    const { title, center, zoom, history } = this.props;
    const { params } = this.state;

    return (
      <div className="tm-root">
        <Map map={this.map} zoom={zoom} />
        <div>
          <h1>{`${title} centered on ${center && center.toString()}`}</h1>
        </div>
        <Permalink map={this.map} params={params} history={history} />
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
