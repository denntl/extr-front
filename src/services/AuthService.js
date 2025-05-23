import { logoutRequest, refreshRequest } from 'src/api/Auth'
import { redirectTo } from 'src/tools/tools'

const AuthService = {
  authorized: false,
  accessToken: null,

  authorize(token, callback) {
    this.accessToken = token
    this.saveInfo()
    if (callback) {
      setTimeout(callback, 100)
    }
  },

  saveInfo() {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        authorized: this.authorized,
        username: this.username,
        email: this.email,
        accessToken: this.accessToken,
      }),
    )
  },

  logout() {
    this.authorized = false
    this.username = null
    this.email = null
    this.accessToken = null
    logoutRequest()
    this.saveInfo()
    redirectTo('/')
  },

  async refresh() {
    const response = await refreshRequest()
    if (response.ok) {
      const result = await response.json()
      let data = {
        accessToken: result.token,
        username: result.username,
        email: result.email,
        authorized: true,
      }
      this.authorize(data)
      return true
    } else {
      this.authorized = false
      this.username = null
      this.email = null
      this.accessToken = null
      this.saveInfo()
      return false
    }
  },

  loadInfo() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authorize(token)
    } else {
      this.saveInfo()
    }
  },

  isAuthorized() {
    if (this.authorized) {
      return true
    }
    this.loadInfo()
    return this.authorized
  },

  init() {
    AuthService.loadInfo()
  },
}

AuthService.init()

export default AuthService
