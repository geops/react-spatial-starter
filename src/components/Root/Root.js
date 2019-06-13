import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import OLMap from 'ol/Map';
import { defaults as defaultInteractions } from 'ol/interaction';
import LayerService from 'react-spatial/LayerService';
import ConfigReader from 'react-spatial/ConfigReader';
import Zoom from 'react-spatial/components/Zoom';
import APP_CONF from '../../appConfig';
import Permalink from '../Permalink';
import Map from '../Map';

import { setLayers, setLayerService } from '../../model/map/actions';

import 'react-spatial/themes/default/index.scss';
import './Root.scss';

const propTypes = {
  initialState: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),

  // mapDispatchToProps
  dispatchSetLayers: PropTypes.func.isRequired,
  dispatchSetLayerService: PropTypes.func.isRequired,
};

const defaultProps = {
  history: null,
  initialState: {},
};

class Root extends PureComponent {
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

  componentDidMount() {
    this.loadLayers();
  }

  loadLayers() {
    const { dispatchSetLayers, dispatchSetLayerService } = this.props;

    const layers = ConfigReader.readConfig(this.map, APP_CONF.layers);

    this.layerService = new LayerService(layers);
    dispatchSetLayers([...this.layerService.getLayers()]);
    dispatchSetLayerService(this.layerService);
  }

  render() {
    const { initialState, history } = this.props;

    return (
      <div className="tm-root">
        <Map map={this.map} projection={APP_CONF.projection} />
        <Permalink
          map={this.map}
          history={history}
          initialState={initialState}
        />
        <Zoom map={this.map} />
      </div>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  dispatchSetLayers: setLayers,
  dispatchSetLayerService: setLayerService,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Root);
