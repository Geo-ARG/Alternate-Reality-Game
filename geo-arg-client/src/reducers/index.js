import { combineReducers } from 'redux'
import listEventsReducer from './listEventsReducer'
import locationReducer from './locationReducer'
import currentEventReducer from './currentEventReducer'
import userEventReducer from './userEventReducer'
import questReducer from './questReducer'
import profileUserReducer from './profileUserReducer'

const rootReducers = combineReducers({
  events        : listEventsReducer,
  location      : locationReducer,
  currentEvent  : currentEventReducer,
  userEvent     : userEventReducer,
  questCameraId : questReducer,
  profileUser   : profileUserReducer,
})

export default rootReducers
