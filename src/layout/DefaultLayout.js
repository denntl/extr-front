import React from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import ConfirmModalProvider from 'src/providers/ConfirmModalProvider'
import AuthBadgeProvider from 'src/providers/AuthBadgeProvider'
import BotStatusProvider from 'src/providers/BotStatusProvider'
import NotificationPopupProvider from 'src/providers/NotificationPopupProvider'

const DefaultLayout = () => {
  return (
    <>
      <BotStatusProvider>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <NotificationPopupProvider>
              <ConfirmModalProvider>
                <AuthBadgeProvider>
                  <AppContent />
                </AuthBadgeProvider>
              </ConfirmModalProvider>
            </NotificationPopupProvider>
          </div>
          <AppFooter />
        </div>
        <AppAside />
      </BotStatusProvider>
    </>
  )
}

export default DefaultLayout
