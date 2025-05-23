import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { Validation } from 'src/services/validation/Validation'
import { EmailRule } from 'src/services/validation/rules/EmailRule'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { useAuth } from 'src/providers/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import useApi from 'src/hooks/useApi'
import { AuthRightSide } from 'src/views/login/partials/AuthRightSide'
import AuthLeftSide from 'src/views/login/partials/AuthLeftSide'
import { LoginButton } from '@telegram-auth/react'
import { useTranslation } from 'react-i18next'
import { telegram } from 'src/assets/icons/icons'

const validationRules = {
  email: [new RequiredRule(), new EmailRule()],
  password: [new RequiredRule()],
}

const Login = () => {
  const { Auth } = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('auth')

  const fromUrl = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [validationErrors, setValidationErrors] = useState({})

  const submitLogin = async () => {
    const validation = new Validation(validationRules)
    clearErrors()
    if (!validation.validate(form)) {
      setValidationErrors(validation.errors)
      return
    }

    Auth.login(form)
      .then((response) => {
        auth.signin(response.token, response.access, () => {
          navigate(fromUrl, { replace: true })
        })
      })
      .catch((response) => {
        if (response.hasValidationErrors()) {
          setValidationErrors(response.getErrors())
        }
      })
  }

  const clearErrors = () => {
    setValidationErrors({})
  }

  const handleChangeInput = ({ target: { name, value } }) => {
    clearErrors()
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleTelegramLogin = (userData) => {
    Auth.telegram
      .login(userData)
      .then((response) => {
        auth.signin(response.token, response.access, () => {
          navigate(fromUrl, { replace: true })
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
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol sm={6} className="d-none d-sm-block p-0 border-radius-0">
            <AuthLeftSide />
          </CCol>
          <CCol xs={12} sm={6} className="p-0 border-radius-0">
            <AuthRightSide>
              <CForm className="d-flex flex-column justify-content-center">
                <h1 className="h4 text-black dark:text-white">{t('enter_to_account')}</h1>
                <CFormLabel className="text-body-pwa" htmlFor="email">
                  {t('email')}
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    id="email"
                    value={form.email}
                    onChange={handleChangeInput}
                    placeholder={t('email')}
                    name="email"
                    autoComplete="email"
                    aria-describedby="validationUsernameFeedback"
                    feedbackInvalid={validationErrors.email ?? null}
                    invalid={validationErrors.email ?? null}
                    required
                  />
                </CInputGroup>
                <CFormLabel className="text-body-pwa" htmlFor="password">
                  {t('password')}
                </CFormLabel>
                <CInputGroup className="mb-4">
                  <CFormInput
                    id="password"
                    value={form.password}
                    onChange={handleChangeInput}
                    type="password"
                    name="password"
                    placeholder={t('password')}
                    autoComplete="current-password"
                    aria-describedby="validationPasswordFeedback"
                    feedbackInvalid={validationErrors.password ?? null}
                    invalid={validationErrors.password ?? null}
                    required
                  />
                </CInputGroup>
                {validationErrors?.common ? (
                  <p className="text-danger">{validationErrors.common.join(' ')}</p>
                ) : null}

                <div className="d-flex justify-content-between flex-wrap">
                  <CButton
                    as="div"
                    color="primary-pwa"
                    className="rounded-pill px-5 align-self-center mb-2 mr-1"
                    onClick={submitLogin}
                  >
                    {t('login')}
                  </CButton>

                  {import.meta.env.VITE_APP_AITH_TG_BOT_NAME && (
                    <LoginButton
                      botUsername={import.meta.env.VITE_APP_AITH_TG_BOT_NAME}
                      buttonSize="large"
                      onAuthCallback={handleTelegramLogin}
                    />
                  )}
                </div>
              </CForm>
            </AuthRightSide>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
