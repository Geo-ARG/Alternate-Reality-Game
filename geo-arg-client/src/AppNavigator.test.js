import renderer from 'react-test-renderer';
import React from 'react'
import AppNavigator from './AppNavigator'
import Camera from 'react-native-camera';
jest.mock('react-native-camera', () => 'Camera');

test('test', () => {
  const tree = renderer.create(
    <AppNavigator />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
