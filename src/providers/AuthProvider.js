import * as React from 'react'
import { useCallback, useContext, useState } from 'react'
import { get, getObject, remove, set, setObject } from 'src/tools/localStorage'
import useApi from 'src/hooks/useApi'
import PropTypes from 'prop-types'
import Clarity from '@microsoft/clarity'

export const Auth = {
  isAuthenticated: false,
  token: get('token'),
  access: getObject('access'),
  signin(token, access, callback) {
    this.isAuthenticated = true
    set('token', token)
    this.token = token
    if (access) {
      setObject('access', access)
      this.access = access
    } else {
      this.access = { isAdmin: false, permissions: [] }
      setObject('access', this.access)
    }
    setTimeout(callback, 300) // fake async
  },
  signout(callback) {
    this.isAuthenticated = false
    this.token = null
    remove('token')
    setTimeout(callback, 300)
  },
  init() {
    this.token = get('token')
  },
}

const AuthContext = React.createContext()

export default function AuthProvider({ children }) {
  const { Auth: AuthAPI } = useApi()

  let [user, setUser] = useState(null)
  let [params, setParams] = useState({})
  let [access, setAccess] = useState(Auth.access)
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(get('token')))

  const loadUser = useCallback(() => {
    AuthAPI.getUser().then((response) => {
      setUser(response.user)
      setParams(response.params)
      if (response.access) {
        setAccess(response.access)
        setObject('access', response.access)
      }
      setIsAuthenticated(true)
      if (import.meta.env.MODE !== 'development') {
        Clarity.init('pgv5gq6gi6')
        Clarity.setTag('user-public-id', response.user.public_id)
      }
    })
  }, [setUser, AuthAPI])

  React.useEffect(() => {
    const token = get('token')
    const access = getObject('access')
    if (token) {
      signin(token, access, () => {})
    }
  }, [])

  let signin = (token, access, callback) => {
    Auth.signin(token, access, () => {
      if (access) {
        setAccess(Auth.access)
      }
      loadUser()
      callback()
    })
  }

  let signout = (callback) => {
    return Auth.signout(() => {
      setUser(null)
      setParams({})
      setIsAuthenticated(false)
      callback()
      remove('auth-badge')
    })
  }

  const can = (permission) => {
    if (!user) {
      return false
    }
    return access.permissions.includes(permission)
  }

  const refresh = () => {
    loadUser()
  }

  const value = { user, params, signin, signout, isAuthenticated, can, refresh }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
