import renderer from 'react-test-renderer';
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Home from './Home'

const middlewares = []
const mockStore = configureStore(middlewares)

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={mockStore([])}>
      <Home />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
