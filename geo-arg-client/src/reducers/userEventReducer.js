import { QUEST_LIST, VERIFY_QUEST } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case QUEST_LIST:
      return action.payload
    case VERIFY_QUEST:
      return state.map(userEvent => userEvent.id === action.payload.id ? {...userEvent, completion: action.payload.completion} : userEvent)
    default:
      return state
  }
}
