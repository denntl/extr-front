export const ACTION_AUTH = 'auth'

export const ACTION_LOGOUT = 'logout'
export const ACTION_AUTH_LOAD = 'auth_load'

const initialState = {
  authorized: false,
  accessToken: null,
  userName: null,
  email: null,
}

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_AUTH:
      return {
        ...state,
        authorized: true,
        accessToken: payload.accessToken,
        userName: payload.user,
        email: payload.email,
      }
    case ACTION_AUTH_LOAD:
      return { ...state }
    case ACTION_LOGOUT:
    default:
      return { ...state, ...initialState }
  }
}

export default Auth
