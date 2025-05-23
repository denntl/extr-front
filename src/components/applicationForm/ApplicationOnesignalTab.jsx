import React, { useContext } from 'react'
import { ApplicationCreateContext } from './Index'
import { CCol, CForm, CFormInput, CRow } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'

const ApplicationOnesignalTab = () => {
  const { t } = useTranslation('application')
  const { application, onChange, validationErrors, settings } = useContext(ApplicationCreateContext)

  const onInputChange = ({ target }) => onChange(target.value, target.name, false)

  return (
    <>
      <CRow>
        <CCol xxl={12}>
          <CForm
            className="max-width-800 needs-validation"
            id="baseForm"
            noValidate
            validated={false}
          >
            <CFormInput
              className="mb-2"
              type="text"
              label={t('onesignalIdLabel')}
              value={application.onesignal_id || ''}
              readOnly={true}
              disabled={true}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="text"
              name="onesignal_auth_key"
              label={t('onesignalKeyLabel')}
              aria-describedby="validationOnesignalId"
              feedbackInvalid={validationErrors.onesignal_auth_key}
              invalid={!!validationErrors.onesignal_auth_key}
              value={application.onesignal_auth_key || ''}
              onChange={onInputChange}
            ></CFormInput>
            <CFormInput
              className="mb-2"
              type="text"
              label={t('onesignalWebhookLabel')}
              value={settings.onesignalWebhook}
              readOnly={true}
              disabled={true}
            ></CFormInput>
          </CForm>
        </CCol>
      </CRow>
    </>
  )
}

export default ApplicationOnesignalTab
