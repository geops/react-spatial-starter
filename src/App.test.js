import 'jest-canvas-mock';
import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer, { act } from 'react-test-renderer';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
  test('App should match snapshot.', () => {
    let component;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('App should render div.', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<App />, div);
    });
    ReactDOM.unmountComponentAtNode(div);
  });
});
