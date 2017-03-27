import renderer from 'react-test-renderer';
import React from 'react'
import Loading1 from './Loading1'

test('test', () => {
  const tree = renderer.create(
      <Loading1 />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
