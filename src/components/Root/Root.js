import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import OLMap from 'ol/Map';

import Layer from 'react-spatial/Layer';
import BasicMap from 'react-spatial/components/map/BasicMap';
import BaseLayer from '../BaseLayer';

import {
  setResolution,
  setLayers,
  setCenter,
  setZoom,
} from '../../model/actions';

import './Root.scss';

const propTypes = {
  // mapStateToProps
  center: PropTypes.arrayOf(PropTypes.number),
  extent: PropTypes.arrayOf(PropTypes.number),
  layers: PropTypes.arrayOf(PropTypes.instanceOf(Layer)),
  resolution: PropTypes.number,
  zoom: PropTypes.number,

  // mapDispatchToProps
  dispatchSetCenter: PropTypes.func.isRequired,
  dispatchSetZoom: PropTypes.func.isRequired,
  dispatchSetResolution: PropTypes.func.isRequired,
};

const defaultProps = {
  center: [922747.8054581558, 5911639.7675754195],
  layers: [],
  extent: undefined,
  resolution: undefined,
  zoom: 9,
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.projection = 'EPSG:3857';
  }

  onMapMoved(evt) {
    const {
      center,
      resolution,
      dispatchSetCenter,
      dispatchSetResolution,
      dispatchSetZoom,
      zoom,
    } = this.props;

    const newResolution = evt.map.getView().getResolution();
    const newZoom = evt.map.getView().getZoom();
    const newCenter = evt.map.getView().getCenter();

    if (zoom !== newZoom) {
      dispatchSetZoom(newZoom);
    }

    if (resolution !== newResolution) {
      dispatchSetResolution(newResolution);
    }

    if (center[0] !== newCenter[0] || center[1] !== newCenter[1]) {
      dispatchSetCenter(newCenter);
    }
  }

  render() {
    const { center, zoom, layers, resolution, extent } = this.props;
    let layerContainer = null;

    this.map = new OLMap({ controls: [] });
    layerContainer = (
      <>
        <BaseLayer />
      </>
    );

    return (
      <div className="tm-root">
        <BasicMap
          center={center}
          resolution={resolution}
          extent={extent}
          layers={layers}
          zoom={zoom}
          map={this.map}
          onMapMoved={evt => this.onMapMoved(evt)}
          viewOptions={{
            projection: this.projection,
          }}
        />

        {layerContainer}
      </div>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

const mapStateToProps = state => ({
  layers: state.layers,
  center: state.center,
  extent: state.extent,
  resolution: state.resolution,
  zoom: state.zoom,
});

const mapDispatchToProps = {
  dispatchSetResolution: setResolution,
  dispatchSetLayers: setLayers,
  dispatchSetCenter: setCenter,
  dispatchSetZoom: setZoom,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Root);
