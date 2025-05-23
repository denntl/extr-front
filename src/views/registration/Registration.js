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
import { useNavigate } from 'react-router-dom'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { MatchRule } from 'src/services/validation/rules/MatchRule'
import { Validation } from 'src/services/validation/Validation'
import useApi from 'src/hooks/useApi'
import { EqualRule } from 'src/services/validation/rules/EqualRule'
import { useAuth } from 'src/providers/AuthProvider'
import AuthLeftSide from 'src/views/login/partials/AuthLeftSide'
import { AuthRightSide } from 'src/views/login/partials/AuthRightSide'
import { useTranslation } from 'react-i18next'

const regEmailValid =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const passwordErrorMessage =
  'Только латиница, миниум одна заглавная буква, миниум один специальный символ'

const formRules = {
  username: [
    new RequiredRule(),
    new StringRule(2, 255),
    new MatchRule(/^[0-9A-Za-z]+$/, 'Только латиница и цифры'),
  ],
  companyName: [new RequiredRule(), new StringRule(2, 15)],
  email: [new RequiredRule(), new MatchRule(regEmailValid, 'Введите правильный email')],
  telegramName: [new MatchRule(/^\w+$/i, 'Неправильный формат. Пример: username')],
  password: [
    new RequiredRule(),
    new StringRule(8, 32),
    new MatchRule(/^(.)*([A-Z])+(.)*$/, passwordErrorMessage),
    new MatchRule(/^(.)*([^\w\d ])+(.)*$/, passwordErrorMessage),
  ],
  passwordConfirm: [new RequiredRule(), new EqualRule('password', 'Пароли должны совпадать')],
}

const defaultErrors = {
  username: null,
  companyName: null,
  email: null,
  password: null,
  passwordConfirm: null,
  telegramName: null,
}

const Registration = () => {
  const navigate = useNavigate()
  const { Auth } = useApi()
  const auth = useAuth()
  const { t } = useTranslation('auth')

  const [validationErrors, setValidationErrors] = useState(defaultErrors)
  const [validationStatus, setValidationStatus] = useState({
    username: false,
    companyName: false,
    email: false,
    password: false,
    passwordConfirm: false,
    telegramName: false,
  })

  const [formValues, setFormValues] = useState({
    username: '',
    companyName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    telegramName: '',
  })

  const handleChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleBlur = ({ target }) => {
    setValidationErrors((prev) => ({ ...prev, [target.name]: null }))
    if (formRules[target.name]) {
      const validation = new Validation({ [target.name]: formRules[target.name] })
      const result = validation.validate(formValues)
      if (!result) {
        setValidationStatus((prev) => ({ ...prev, [target.name]: false }))
        setValidationErrors((prev) => ({ ...prev, ...validation.errors }))
      } else {
        setValidationStatus((prev) => ({ ...prev, [target.name]: true }))
      }
    }
  }

  const formSubmit = () => {
    const validation = new Validation(formRules)
    const result = validation.validate(formValues)
    if (!result) {
      setValidationErrors((prev) => ({ ...prev, ...validation.errors }))
      return
    }

    Auth.register(formValues)
      .then((response) => {
        auth.signin(response.token, response.access, () => {
          navigate('/admin/applications', { replace: true })
        })
      })
      .catch((response) => {
        if (response.hasValidationErrors()) {
          setValidationErrors((prev) => ({ ...prev, ...response.getErrors() }))
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
            <AuthRightSide page="register">
              <CForm className="needs-validation d-flex flex-column justify-content-center">
                <h1 className="h4 text-black dark:text-white">{t('registration')}</h1>

                <CFormLabel className="text-body-pwa" htmlFor="company_name">
                  {t('company_name')}
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    id="company_name"
                    placeholder={t('company_name')}
                    autoComplete="companyName"
                    name="companyName"
                    aria-describedby="validationcompanyNameFeedback"
                    feedbackInvalid={validationErrors.companyName}
                    valid={validationStatus.companyName}
                    invalid={!!validationErrors.companyName}
                    onBlur={handleBlur}
                    value={formValues.companyName}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CFormLabel className="text-body-pwa" htmlFor="company_name">
                  {t('username')}
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder={t('username')}
                    autoComplete="username"
                    name="username"
                    aria-describedby="validationUsernameFeedback"
                    feedbackInvalid={validationErrors.username}
                    valid={validationStatus.username}
                    invalid={!!validationErrors.username}
                    onBlur={handleBlur}
                    value={formValues.username}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CFormLabel className="text-body-pwa" htmlFor="company_name">
                  {t('telegram')}
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder={t('telegram')}
                    autoComplete="telegramName"
                    name="telegramName"
                    aria-describedby="validationtelegramNameFeedback"
                    feedbackInvalid={validationErrors.telegramName}
                    valid={validationStatus.telegramName}
                    invalid={!!validationErrors.telegramName}
                    onBlur={handleBlur}
                    value={formValues.telegramName}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CFormLabel className="text-body-pwa" htmlFor="company_name">
                  {t('email')}
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder={t('email')}
                    autoComplete="email"
                    name="email"
                    aria-describedby="validationEmailFeedback"
                    feedbackInvalid={validationErrors.email}
                    valid={validationStatus.email}
                    invalid={!!validationErrors.email}
                    onBlur={handleBlur}
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CFormLabel className="text-body-pwa" htmlFor="company_name">
                  {t('password')}
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    type="password"
                    placeholder={t('password')}
                    autoComplete="new-password"
                    name="password"
                    aria-describedby="validationPasswordFeedback"
                    feedbackInvalid={validationErrors.password}
                    valid={validationStatus.password}
                    invalid={!!validationErrors.password}
                    onBlur={handleBlur}
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CFormLabel className="text-body-pwa" htmlFor="company_name">
                  {t('password_confirm')}
                </CFormLabel>
                <CInputGroup className="mb-4">
                  <CFormInput
                    type="password"
                    placeholder={t('password_confirm')}
                    autoComplete="new-password"
                    name="passwordConfirm"
                    aria-describedby="validationPasswordConfirmFeedback"
                    feedbackInvalid={validationErrors.passwordConfirm}
                    valid={validationStatus.passwordConfirm}
                    invalid={!!validationErrors.passwordConfirm}
                    onBlur={handleBlur}
                    value={formValues.passwordConfirm}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton
                  as="div"
                  color="primary-pwa"
                  className="rounded-pill px-5 align-self-center"
                  onClick={formSubmit}
                >
                  {t('register')}
                </CButton>
              </CForm>
            </AuthRightSide>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Registration
