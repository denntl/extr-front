import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CSpinner, useColorModes } from '@coreui/react-pro'
import './scss/style.scss'
import './scss/general.scss'
import AuthProvider from 'src/providers/AuthProvider'
import RequireAuth from 'src/providers/RequireAuth'
import RequireGuest from 'src/providers/RequireGuest'
import { useSelector } from 'react-redux'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/login/Login'))
const Register = React.lazy(() => import('./views/registration/Registration'))
const Page404 = React.lazy(() => import('./views/pages/Page404'))
const Page403 = React.lazy(() => import('./views/pages/Page403'))
const Page500 = React.lazy(() => import('./views/pages/Page500'))
const Invite = React.lazy(() => import('./views/registration/InviteRegistration'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes(
    'coreui-pro-react-admin-template-theme-modern',
  )
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <Suspense
          fallback={
            <div className="pt-3 text-center loader-spinner align-content-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route
              exact
              path="login"
              name="Login Page"
              element={
                <RequireGuest>
                  <Login />
                </RequireGuest>
              }
            />
            <Route
              exact
              path="registration"
              name="Registration Page"
              element={
                <RequireGuest>
                  <Register />
                </RequireGuest>
              }
            />
            <Route
              exact
              path="invite/:key"
              name="Invite Registration Page"
              element={
                <RequireGuest>
                  <Invite />
                </RequireGuest>
              }
            />
            <Route
              path="*"
              element={
                <RequireAuth>
                  <DefaultLayout />
                </RequireAuth>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
