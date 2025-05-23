export const ACTION_CHANGE_STATE = 'set'

const initialState = {
  sidebarShow: true,
  theme: 'dark',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case ACTION_CHANGE_STATE:
      return { ...state, ...rest }
    default:
      return state
  }
}

export default changeState
