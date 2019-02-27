import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AppComponent from './AppComponent';

configure({
  adapter: new Adapter(),
});

const mockStore = configureStore();
const initialState = {
  dispatchSetCenter: () => {},
  dispatchSetZoom: () => {},
  dispatchSetResolution: () => {},
  dispatchSetLayers: () => {},

  center: [922747.8054581558, 5911639.7675754195],
  layers: [],
  extent: undefined,
  resolution: undefined,
  zoom: 9,
};

describe('AppComponent', () => {
  test('AppComponent should match snapshot.', () => {
    const store = mockStore(initialState);
    const component = renderer.create(
      <Provider store={store}>
        <AppComponent />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
