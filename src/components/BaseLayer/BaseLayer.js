import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layer from 'react-spatial/Layer';

import TileLayer from 'ol/layer/Tile';
import WMTSSource from 'ol/source/WMTS';
import WMTSTilegrid from '../../utils/WMTSTileGrid3857';

import CONF from '../../config';
import { addLayers } from '../../model/map/actions';

const propTypes = {
  // mapDispatchToProps
  dispatchAddLayers: PropTypes.func.isRequired,
};

class BaseLayer extends Component {
  constructor(props) {
    super(props);

    this.layer = new Layer({
      name: 'Basemap',
      isBaseLayer: true,
      olLayer: new TileLayer({
        source: new WMTSSource({
          url:
            `${CONF.tilesUrl}/wmts/netzkarte_relief_grey_webmercator/` +
            '{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
          layer: 'netzkarte_relief_grey_webmercator',
          matrixSet: 'webmercator',
          requestEncoding: 'REST',
          tileGrid: WMTSTilegrid,
        }),
      }),
    });
  }

  componentDidMount() {
    const { dispatchAddLayers } = this.props;
    dispatchAddLayers([this.layer]);
  }

  render() {
    return null;
  }
}

BaseLayer.propTypes = propTypes;

const mapDispatchToProps = {
  dispatchAddLayers: addLayers,
};

export default connect(
  null,
  mapDispatchToProps,
)(BaseLayer);
