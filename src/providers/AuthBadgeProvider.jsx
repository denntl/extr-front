import { useContext, useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { CButton, CToast, CToastBody, CToastClose, CToaster, CToastHeader } from '@coreui/react-pro'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider'
import { getObject, remove, set, setObject } from 'src/tools/localStorage'

const AuthBadgeContext = React.createContext()
export default function AuthBadgeProvider({ children }) {
  const navigate = useNavigate()
  const auth = useAuth()

  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [prevToken, setPrevToken] = useState(false)

  useEffect(() => {
    if (visible) {
      setObject('auth-badge', {
        text: text,
        prevToken: prevToken,
      })
    } else {
      const stored = getObject('auth-badge', false)
      if (stored) {
        showBadge(stored.text, stored.prevToken)
        remove('auth-badge')
      }
    }
  }, [visible])

  const showBadge = (text, prevToken) => {
    setVisible(true)
    setText(text)
    setPrevToken(prevToken)
  }

  const handleReturn = ({ target }) => {
    auth.signin(target.dataset.prev, null, () => {
      navigate('/applications')
      setVisible(false)
      remove('auth-badge')
    })
  }

  return (
    <AuthBadgeContext.Provider value={{ showBadge }}>
      {children}
      <CToaster className="p-3" placement="bottom-center">
        <CToast autohide={false} visible={visible} className="align-items-center width-max-content">
          <div className="d-flex">
            <CToastBody>
              <span className="mr-4">{text}</span>
              <CButton color="info" data-prev={prevToken} onClick={handleReturn}>
                Вернуться
              </CButton>
            </CToastBody>
          </div>
        </CToast>
      </CToaster>
    </AuthBadgeContext.Provider>
  )
}

AuthBadgeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuthBadge() {
  return useContext(AuthBadgeContext)
}
