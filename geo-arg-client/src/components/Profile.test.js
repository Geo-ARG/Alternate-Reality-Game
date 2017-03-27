import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Profile from './Profile'

const middlewares = []
const mockStore = configureStore(middlewares)

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={mockStore({
        profileUser: {
          userEvent: [],
          userData: {
            User: {id: 1, username: 'syanmil'}
          }
        }
      })}>
      <Profile />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
