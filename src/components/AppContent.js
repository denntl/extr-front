import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react-pro'

// routes config
import routes from '../routes'
import AppBreadcrumb from './AppBreadcrumb'
import { useAuth } from 'src/providers/AuthProvider'
import Page500 from 'src/views/pages/Page500'
import Page403 from 'src/views/pages/Page403'

const Page404 = React.lazy(() => import('../views/pages/Page404'))

const AppContent = () => {
  const auth = useAuth()

  return (
    <CContainer lg className="px-4">
      <AppBreadcrumb />
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route) => {
            if (route.access !== undefined) {
              if (!auth.can(route.access)) {
                return null
              }
            }
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" exact element={<Navigate to="/applications" replace />} />
          <Route exact path="error" name="Error" element={<Page500 />} />
          <Route exact path="not-allowed" name="Not Allowed" element={<Page403 />} />
          {auth.user && <Route path="*" element={<Page404 />} />}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
