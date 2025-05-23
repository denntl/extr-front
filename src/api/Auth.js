const LOGIN_URI = '/api/auth/login'
const REGISTRATION_URI = '/api/auth/registration'
const REFRESH_URI = '/api/auth/refresh-token'
const LOGOUT_URI = '/api/auth/logout'

const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'include',
}
export const loginRequest = (login, password) => {
  let config = {
    ...defaultConfig,
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  }
  return fetch(`${import.meta.env.VITE_API_SERVER_URL}${LOGIN_URI}`, config)
}

export const refreshRequest = () => {
  return fetch(`${import.meta.env.VITE_API_SERVER_URL}${REFRESH_URI}`, defaultConfig)
}

export const registrationRequest = (params) => {
  let config = { ...defaultConfig, body: JSON.stringify(params) }
  return fetch(`${import.meta.env.VITE_API_SERVER_URL}${REGISTRATION_URI}`, config)
}

export const logoutRequest = () => {
  return fetch(`${import.meta.env.VITE_API_SERVER_URL}${LOGOUT_URI}`, defaultConfig)
}
