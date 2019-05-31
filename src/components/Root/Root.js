import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import OLMap from 'ol/Map';
import Zoom from 'react-spatial/components/Zoom';
import Permalink from '../Permalink';
import Map from '../Map';

import 'react-spatial/themes/default/index.scss';
import './Root.scss';

const propTypes = {
  initialState: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
};

const defaultProps = {
  history: null,
  initialState: {},
};

class Root extends PureComponent {
  constructor(props) {
    super(props);
    this.map = new OLMap({ controls: [] });
  }

  render() {
    const { initialState, history } = this.props;

    return (
      <div className="tm-root">
        <Map map={this.map} />
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

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Root);
