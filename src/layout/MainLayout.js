import { AppContent, AppFooter, AppHeader, AppSidebar } from 'src/components'
import React, { Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_SET_PERMISSIONS } from 'src/reducers/Permissions'
import RequireAuth from 'src/providers/RequireAuth'
import useApi from 'src/hooks/useApi'
import { useAuth } from 'src/providers/AuthProvider'

const MainLayout = ({ children }) => {
  // const { permissions } = useApi()
  // const dispatch = useDispatch()
  // let auth = useAuth()
  // if (auth?.user) {
  //   permissions()
  //     .then((result) => result.json())
  //     .then((permissions) => {
  //       dispatch({ type: ACTION_SET_PERMISSIONS, permissions: permissions })
  //     })
  // }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default MainLayout

MainLayout.propTypes = {
  children: PropTypes.object,
}
