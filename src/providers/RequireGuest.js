import { Navigate, useLocation } from 'react-router-dom'
import * as React from 'react'
import { useAuth } from 'src/providers/AuthProvider'
import PropTypes from 'prop-types'

export default function RequireGuest({ children }) {
  let auth = useAuth()
  let location = useLocation()

  if (auth?.isAuthenticated) {
    console.log('Redirecting to dashboard')
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

RequireGuest.propTypes = {
  children: PropTypes.node.isRequired,
}
