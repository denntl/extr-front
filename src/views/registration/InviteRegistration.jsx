import { CCard, CCardBody } from '@coreui/react-pro'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { LoginButton } from '@telegram-auth/react'
import { useAuth } from 'src/providers/AuthProvider'

const InviteRegistration = () => {
  const { key } = useParams()
  const { Auth } = useApi()
  const navigate = useNavigate()
  const auth = useAuth()
  const [validationErrors, setValidationErrors] = useState({})
  const [companyName, setCompanyName] = useState()

  useEffect(() => {
    Auth.getInvite(key).then((response) => {
      setCompanyName(response.data.companyName)
    })
  }, [key])

  const handleRegister = (userData) => {
    Auth.telegram
      .register(key, userData)
      .then((response) => {
        auth.signin(response.token, response.access, () => {
          navigate('/admin/applications', { replace: true })
        })
      })
      .catch((response) => {
        if (response.hasValidationErrors()) {
          setValidationErrors(response.getErrors())
        }
      })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CCard className="w-50 m-auto">
        <CCardBody>
          <div className="text-center">
            {companyName ? (
              <>
                <h1>Регистрация в компании {companyName}</h1>
                <LoginButton
                  botUsername={import.meta.env.VITE_APP_AITH_TG_BOT_NAME}
                  buttonSize="large"
                  onAuthCallback={handleRegister}
                />
                {validationErrors &&
                  Object.entries(validationErrors).map(([key, messages]) => (
                    <p key={key} className="text-danger">
                      {messages.join(' ')}
                    </p>
                  ))}
              </>
            ) : (
              <h1>Приглашение не найдено</h1>
            )}
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default InviteRegistration
