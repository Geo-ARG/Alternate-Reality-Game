import renderer from 'react-test-renderer';
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import GameEvent from './GameEvent'

const middlewares = []
const mockStore = configureStore(middlewares)

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={mockStore({
      location: {
        locationId: 1,
        nearbyUser: [
          {Users: []}
        ]
      },
      profileUser: {
        userData: {
          id: 1,
          username: 'syanmil'
        },
        userEvent: [
          {QuestId: 1,
            completion: false,
            Quest: {
              task: 'eat',
              title: 'Go To Canteen',
              type: 'photo'            }
          }
        ]
      },
      currentEvent: {
        id: 1,
        Quest: [],
        Users: []
      },
      userEvent: [{id: 1}]
    })}>
      <GameEvent />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
