import { SELECT_QUEST } from '../constants'

export default (state= 0, action) => {
  switch (action.type) {
    case SELECT_QUEST:
      return action.payload
    default:
      return state
  }
}
