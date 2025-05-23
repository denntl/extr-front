import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CHeader,
} from '@coreui/react-pro'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import CoverProvider from 'src/providers/CoverProvider'
import PropTypes from 'prop-types'
import { DomainRule } from 'src/services/validation/rules/DomainRule'
import { useTranslation } from 'react-i18next'

const defaultErrors = {}

const validationRules = {
  domain: [new RequiredRule(), new DomainRule(), new StringRule(2, 50)],
  status: [new RequiredRule()],
}

const defaultData = {
  domain: '',
  status: true,
}

export default function DomainForm({ errors, onSave, onCancel }) {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState(defaultErrors)
  const [data, setData] = useState(defaultData)
  const { t } = useTranslation('domains')

  useEffect(() => {
    if (errors) {
      setFormErrors(errors)
      setLoading(false)
    }
  }, [errors])

  const handleInputChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  const handleSwitchChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.checked }))
  }

  const validateForm = () => {
    setFormErrors(defaultErrors)
    const validation = new Validation(validationRules)
    const result = validation.validate(data)
    if (!result) {
      setFormErrors((prev) => ({ ...prev, ...validation.errors }))
    }
    return result
  }

  const handleSave = async () => {
    const validationResult = validateForm()
    if (!validationResult) {
      return
    }
    setLoading(true)
    await onSave(data)
    setLoading(false)
  }

  return (
    <>
      <CCard>
        <CoverProvider isLoading={loading}>
          <CHeader className="p-3">{t('add_domain')}</CHeader>
          <CCardBody>
            <CForm className="needs-validation" noValidate validated={false}>
              <CFormLabel className="mt-2">{t('domain')}</CFormLabel>
              <CFormInput
                placeholder="example.com"
                autoComplete="off"
                name="domain"
                aria-describedby="nameValidation"
                feedbackInvalid={formErrors.domain}
                invalid={!!formErrors.domain}
                value={data ? data.domain : ''}
                onChange={handleInputChange}
              />
              <CFormLabel className="mt-2">{t('status')}</CFormLabel>
              <CFormSwitch
                size="xl"
                className="mt-1"
                style={{ width: '50px' }}
                name="status"
                defaultChecked
                onChange={handleSwitchChange}
              ></CFormSwitch>
            </CForm>
          </CCardBody>
          <CCardFooter className="p-3">
            <CButton color="cancel" className="px-4-5 rounded-pill" onClick={onCancel}>
              {t('cancel')}
            </CButton>
            <CButton
              color="confirm"
              className="px-4-5 rounded-pill float-end ml-2"
              onClick={handleSave}
            >
              {t('save')}
            </CButton>
          </CCardFooter>
        </CoverProvider>
      </CCard>
    </>
  )
}

DomainForm.propTypes = {
  errors: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}
