import renderer from 'react-test-renderer';
import React from 'react'
import IndexAndroid from './index.android'
import Camera from 'react-native-camera';
jest.mock('react-native-camera', () => 'Camera');

it('renders correctly', () => {
  const tree = renderer.create(
    <IndexAndroid />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
