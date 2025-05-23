import React, { useContext, useMemo } from 'react'
import { ApplicationCreateContext } from './Index'
import {
  CButton,
  CButtonGroup,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormText,
  CPopover,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { cilCopy, cilInfo } from '@coreui/icons'

const ApplicationTrafficTab = () => {
  const { t } = useTranslation('application')
  const { application, settings, onChange, validationErrors } = useContext(ApplicationCreateContext)

  const applicationLink = useMemo(() => {
    if (!settings?.domains || !application.subdomain || !application.domain_id) {
      return ''
    }
    const domain = settings.domains.filter((item) => item.value === application.domain_id)[0]?.label
    const queryString =
      '/?sub_id_1={subid}&sub_id_2={sub_id_2}&sub_id_3={sub_id_3}&sub_id_4={sub_id_4}&sub_id_5={sub_id_5}&sub_id_6={sub_id_6}&sub_id_7={sub_id_7}&sub_id_8={sub_id_8}'
    return `https://${application.subdomain}.${domain}${queryString}`
  }, [application.domain_id, application.subdomain])

  const onInputChange = ({ target }) => onChange(target.value, target.name, false)

  const copyToClipboard = (value) => navigator.clipboard.writeText(value)

  return (
    <CForm className="max-width-800 needs-validation" id="trafficForm" noValidate validated={false}>
      <CFormLabel>{t('linkLabel')}</CFormLabel>
      <div className="d-flex align-items-center mb-2">
        <CFormInput value={applicationLink} disabled />
        <CButtonGroup className="ms-2">
          <CPopover content={t('linkWasCopiedMessage')} placement="top" trigger="focus">
            <CButton color="secondary" onClick={() => copyToClipboard(applicationLink)}>
              <CIcon icon={cilCopy} />
            </CButton>
          </CPopover>
          <CTooltip content={t('linkTooltipMessage')}>
            <CButton color="secondary">
              <CIcon icon={cilInfo} />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>
      <CRow className="mb-2">
        <CCol md={6}>
          <CFormLabel>{t('pixelIdLabel')}</CFormLabel>
          <div className="d-flex align-items-center">
            <CFormInput
              type="text"
              name="pixel_id"
              aria-describedby="validationPixelId"
              invalid={!!validationErrors.pixel_id}
              value={application.pixel_id || ''}
              onChange={onInputChange}
            ></CFormInput>
            <CTooltip content={t('pixelIdTooltipMessage')}>
              <CButton color="secondary" className="ms-2">
                <CIcon icon={cilInfo} />
              </CButton>
            </CTooltip>
          </div>
          {validationErrors.pixel_id && (
            <CFormFeedback className="d-block" invalid>
              {validationErrors.pixel_id}
            </CFormFeedback>
          )}
        </CCol>
        <CCol md={6}>
          <CFormLabel>{t('pixelKeyLabel')}</CFormLabel>
          <div className="d-flex align-items-center">
            <CFormInput
              type="text"
              name="pixel_key"
              aria-describedby="validationPixelKey"
              invalid={!!validationErrors.pixel_key}
              value={application.pixel_key || ''}
              onChange={onInputChange}
            ></CFormInput>
            <CTooltip content={t('pixelKeyTooltipMessage')}>
              <CButton color="secondary" className="ms-2">
                <CIcon icon={cilInfo} />
              </CButton>
            </CTooltip>
          </div>
          {validationErrors.pixel_key && (
            <CFormFeedback className="d-block" invalid>
              {validationErrors.pixel_key}
            </CFormFeedback>
          )}
        </CCol>
      </CRow>

      <CFormLabel>{t('adLink')}</CFormLabel>
      <div className="d-flex align-items-center mb-2">
        <CFormInput
          type="text"
          name="link"
          aria-describedby="validationLink"
          invalid={!!validationErrors.link}
          value={application.link || ''}
          onChange={onInputChange}
          className="flex-grow-1"
        />
        <CButtonGroup className="ms-2">
          <CPopover content={t('linkWasCopiedMessage')} placement="top" trigger="focus">
            <CButton color="secondary" onClick={() => copyToClipboard(application.link)}>
              <CIcon icon={cilCopy} />
            </CButton>
          </CPopover>
          <CTooltip content={t('adTooltipMessage')}>
            <CButton color="secondary">
              <CIcon icon={cilInfo} />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>
      {validationErrors.link && (
        <CFormFeedback className="d-block" invalid>
          {validationErrors.link}
        </CFormFeedback>
      )}

      <CFormLabel className="">{t('postbackRegistrationLabel')}</CFormLabel>
      <div className="d-flex align-items-center mb-2">
        <CFormInput value={settings?.postbacks?.registration || ''} disabled />
        <CButtonGroup className="ms-2">
          <CPopover content={t('linkWasCopiedMessage')} placement="top" trigger="focus">
            <CButton
              color="secondary"
              onClick={() => copyToClipboard(settings?.postbacks?.registration)}
            >
              <CIcon icon={cilCopy} />
            </CButton>
          </CPopover>
          <CTooltip content={t('postbackRegistrationTooltipMessage')}>
            <CButton color="secondary">
              <CIcon icon={cilInfo} />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>

      <CFormLabel>{t('postbackDepositLabel')}</CFormLabel>
      <div className="d-flex align-items-center mb-2">
        <CFormInput value={settings?.postbacks?.deposit || ''} disabled />
        <CButtonGroup className="ms-2">
          <CPopover content={t('linkWasCopiedMessage')} placement="top" trigger="focus">
            <CButton
              color="secondary"
              onClick={() => copyToClipboard(settings?.postbacks?.deposit)}
            >
              <CIcon icon={cilCopy} />
            </CButton>
          </CPopover>
          <CTooltip content={t('postbackDepositTooltipMessage')}>
            <CButton color="secondary">
              <CIcon icon={cilInfo} />
            </CButton>
          </CTooltip>
        </CButtonGroup>
      </div>
    </CForm>
  )
}

export default ApplicationTrafficTab
