import * as React from 'react'
import { useContext, useRef, useState } from 'react'
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/react-pro'
import './NotificationPopupStyle.scss'
import PropTypes from 'prop-types'

const NotificationPopupContext = React.createContext()

export default function NotificationPopupProvider({ children }) {
  const [toast, addToast] = useState()
  const toaster = useRef(null)

  /**
   * @param {string} text
   * @param {"primary"|"secondary"|"success"|"danger"|"warning"|"info"|"dark"|"light"|null} color
   */
  const pushPopup = (text, color = null) => {
    addToast(
      <CToast className="align-items-center" color={color}>
        <div className="d-flex">
          <CToastBody className="notification-popup-body">{text}</CToastBody>
          <CToastClose className="me-2 m-auto"></CToastClose>
        </div>
      </CToast>,
    )
  }

  return (
    <NotificationPopupContext.Provider value={{ pushPopup }}>
      {children}
      <CToaster className="p-3" placement="top-end" push={toast} ref={toaster}></CToaster>
    </NotificationPopupContext.Provider>
  )
}

NotificationPopupProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useNotificationPopup() {
  return useContext(NotificationPopupContext)
}
