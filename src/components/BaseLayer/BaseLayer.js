import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layer from 'react-spatial/Layer';

import WMTSTilegrid from 'ol/tilegrid/WMTS';
import TileLayer from 'ol/layer/Tile';
import WMTSSource from 'ol/source/WMTS';

import CONF from '../../config';
import { setLayers } from '../../model/actions';

const propTypes = {
  layers: PropTypes.arrayOf(PropTypes.instanceOf(Layer)).isRequired,
  dispatchSetLayers: PropTypes.func.isRequired,
};

const wmtsResolutions = [
  156543.033928,
  78271.516964,
  39135.758482,
  19567.879241,
  9783.9396205,
  4891.96981025,
  2445.98490513,
  1222.99245256,
  611.496226281,
  305.748113141,
  152.87405657,
  76.4370282852,
  38.2185141426,
  19.1092570713,
  9.55462853565,
  4.77731426782,
  2.38865713391,
  1.19432856696,
  0.597164283478,
  0.298582141739,
];

const wmtsMatrixIds = wmtsResolutions.map((res, i) => `${i}`);

const projectionExtent = [
  -20037508.3428,
  -20037508.3428,
  20037508.3428,
  20037508.3428,
];

class BaseLayer extends Component {
  constructor(props) {
    super(props);
    const name = 'Basemap';

    this.layer = new Layer({
      name,
      olLayer: new TileLayer({
        source: new WMTSSource({
          url:
            `${CONF.tilesUrl}/wmts/netzkarte_relief_grey_webmercator/` +
            '{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
          layer: 'netzkarte_relief_grey_webmercator',
          matrixSet: 'webmercator',
          requestEncoding: 'REST',
          tileGrid: new WMTSTilegrid({
            extent: projectionExtent,
            resolutions: wmtsResolutions,
            matrixIds: wmtsMatrixIds,
          }),
        }),
      }),
    });
  }

  componentDidMount() {
    const { dispatchSetLayers, layers } = this.props;
    const otherLayers = layers.filter(l => l.getName() !== this.layer.name);
    dispatchSetLayers([this.layer, ...otherLayers]);
  }

  render() {
    return null;
  }
}

BaseLayer.propTypes = propTypes;

const mapStateToProps = state => ({
  layers: state.layers,
});

const mapDispatchToProps = {
  dispatchSetLayers: setLayers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaseLayer);
