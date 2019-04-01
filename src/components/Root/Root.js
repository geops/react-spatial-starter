import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import OLMap from 'ol/Map';
import Map from '../Map';

import { setCenter } from '../../model/actions';

import './Root.scss';

const propTypes = {
  title: PropTypes.string,

  // mapStateToProps
  center: PropTypes.arrayOf(PropTypes.number),

  // mapDispatchToProps
  dispatchSetCenter: PropTypes.func.isRequired,
};

const defaultProps = {
  title: 'My react-spatial app',

  // mapStateToProps
  center: [922747.8054581558, 5911639.7675754195],
};

class Root extends PureComponent {
  componentDidMount() {
    const { center, dispatchSetCenter } = this.props;
    dispatchSetCenter(center);
  }

  render() {
    const { title, center } = this.props;
    this.map = new OLMap({ controls: [] });

    return (
      <div className="tm-root">
        <Map map={this.map} />
        <div>
          <h1>{`${title} centered on ${center && center.toString()}`}</h1>
        </div>
      </div>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

const mapStateToProps = state => ({
  center: state.center,
});

const mapDispatchToProps = {
  dispatchSetCenter: setCenter,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Root);
