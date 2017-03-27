import { EVENT_DATA_PROFILE, SAVE_USER_LOGIN } from '../constants'

let initialData = {
  userData: [],
  userEvent: []
}

export default (state = initialData , action) => {
  switch (action.type) {
    case EVENT_DATA_PROFILE:
      return {...state, userEvent: action.payload}
    case SAVE_USER_LOGIN:
      return {...state, userData: action.payload}
    default:
      return state
  }
}
