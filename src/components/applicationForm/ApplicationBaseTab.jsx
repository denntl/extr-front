import React, { useContext } from 'react'
import { ApplicationCreateContext } from './Index'
import { CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react-pro'
import { useAuth } from 'src/providers/AuthProvider'
import CustomSelect from 'src/components/custom/CustomSelect'
import { useTranslation } from 'react-i18next'
import { PERMISSION_CLIENT_APPLICATION_UPDATE_OWNER } from 'src/enums/permissions'

const ApplicationBaseTab = () => {
  const { t } = useTranslation('application')
  const { can } = useAuth()

  const { onChange, application, validationErrors, settings, isUpdating } =
    useContext(ApplicationCreateContext)

  const onInputChange = ({ target }) => {
    onChange(target.value, target.name, false)
  }

  return (
    <>
      <CForm className="max-width-800 needs-validation" id="baseForm" noValidate validated={false}>
        <CFormLabel className="mt-2">Название</CFormLabel>
        <CFormInput
          type="text"
          name="name"
          aria-describedby="validationName"
          feedbackInvalid={validationErrors.name}
          invalid={!!validationErrors.name}
          value={application.name}
          onChange={onInputChange}
        ></CFormInput>
        {isUpdating && (
          <>
            <CFormLabel className="mt-2">{t('label_owner')}</CFormLabel>
            <CustomSelect
              name="owner_id"
              options={settings.owners || []}
              multiple={false}
              placeholder={t('placeholder_owner')}
              onChange={onChange}
              value={application.owner_id ? [application.owner_id] : []}
              optionsStyle="text"
              disabled={!can(PERMISSION_CLIENT_APPLICATION_UPDATE_OWNER)}
              cleaner={false}
            />
          </>
        )}
        <CFormLabel className="mt-2">Тип домена</CFormLabel>
        <CFormSelect
          name="domain_type"
          aria-describedby="validationDomainType"
          feedbackInvalid={validationErrors.domain_type}
          invalid={!!validationErrors.domain_type}
          value={application.domain_type}
          onChange={onInputChange}
        >
          <option value="1">Системный</option>
        </CFormSelect>
        <CFormLabel className="mt-2">Домен</CFormLabel>
        <CFormSelect
          name="domain_id"
          aria-describedby="validationDomain"
          options={settings.domains || []}
          feedbackInvalid={validationErrors.domain_id}
          invalid={!!validationErrors.domain_id}
          value={application.domain_id}
          onChange={onInputChange}
        />
        <CFormLabel className="mt-2">Поддомен</CFormLabel>
        <CFormInput
          type="text"
          name="subdomain"
          aria-describedby="validationSubdomain"
          feedbackInvalid={validationErrors.subdomain}
          invalid={!!validationErrors.subdomain}
          value={application.subdomain}
          onChange={onInputChange}
        ></CFormInput>
        <CFormLabel className="mt-2">{t('label_status')}</CFormLabel>
        <CustomSelect
          name="status"
          options={settings.statuses ?? []}
          multiple={false}
          placeholder={t('placeholder_status')}
          onChange={onChange}
          value={application.status ? [application.status] : []}
          optionsStyle="text"
          cleaner={false}
        />
      </CForm>
    </>
  )
}

export default ApplicationBaseTab
