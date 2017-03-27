import renderer from 'react-test-renderer';
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import CameraOn from './CameraOn'
import Camera from 'react-native-camera'

jest.mock('react-native-camera', () => 'Camera')
const middlewares = []
const mockStore = configureStore(middlewares)

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={mockStore({events: []})}>
      <CameraOn />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
