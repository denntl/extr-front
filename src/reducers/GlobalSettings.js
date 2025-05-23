import { ACTION_CHANGE_STATE } from 'src/reducers/ChangeState'

const initialState = {
  sidebarShow: true,
  asideShow: false,
  theme: 'light',
  sidebarUnfoldable: false,
}

const GlobalSettings = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case ACTION_CHANGE_STATE:
      return { ...state, ...rest }
    default:
      return state
  }
}

export default GlobalSettings
