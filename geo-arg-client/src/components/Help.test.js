import renderer from 'react-test-renderer';
import React from 'react'
import Help from './help'

it('renders correctly', () => {
  const tree = renderer.create(
    <Help />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
