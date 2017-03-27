import { SET_EVENTS, CLEAR_EVENTS } from '../constants'

export default (state = [] , action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.payload
    case CLEAR_EVENTS:
      return []
    default:
      return state
  }
}
