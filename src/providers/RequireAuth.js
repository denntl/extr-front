import { Navigate, useLocation } from 'react-router-dom'
import * as React from 'react'
import { useAuth } from 'src/providers/AuthProvider'
import PropTypes from 'prop-types'

export default function RequireAuth({ children }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth?.isAuthenticated) {
    console.log('Redirecting to login')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
}
