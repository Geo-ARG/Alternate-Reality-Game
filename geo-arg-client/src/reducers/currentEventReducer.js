import { SET_EVENT } from '../constants'

export default (state = [] , action) => {
  switch (action.type) {
    case SET_EVENT:
      return action.payload
    default:
      return state
  }
}
