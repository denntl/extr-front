import React, { useContext } from 'react'
import { ApplicationCreateContext } from './Index'
import { CCol, CForm, CFormLabel, CFormSwitch, CInputGroup, CRow } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import CustomSelect from 'src/components/custom/CustomSelect'

const ApplicationPlatformTab = () => {
  const { t } = useTranslation('application')

  const { application, settings, onChange, validationErrors } = useContext(ApplicationCreateContext)

  const handleSwitchChanged = ({ target: { checked, name } }) => {
    onChange(checked ? 1 : 0, name)
  }

  return (
    <CRow>
      <CCol xxl={12}>
        <CForm
          className="max-width-800 needs-validation"
          id="platformForm"
          noValidate
          validated={false}
        >
          <CFormLabel className="mt-2">{t('platformLabel')}</CFormLabel>
          <CustomSelect
            name="platform_type"
            options={settings.platforms || []}
            aria-label={t('platformAreaLabel')}
            multiple={false}
            placeholder={t('platformLabelPlaceholder')}
            onChange={onChange}
            value={application.platform_type ? [application.platform_type] : []}
            feedbackInvalid={validationErrors.platform_type}
            invalid={!!validationErrors.platform_type}
            optionsStyle="text"
            cleaner={false}
          />
          <CFormLabel className="mt-2">{t('landingTypeLabel')}</CFormLabel>
          <CInputGroup>
            <span className="mr-2 mt-2">{t('landingTypeOld')}</span>
            <CFormSwitch
              size="xl"
              className="mt-1"
              style={{ width: '50px' }}
              name="landing_type"
              checked={!!application.landing_type}
              onChange={handleSwitchChanged}
            ></CFormSwitch>
            <span className="ml-2 mt-2">{t('landingTypeNew')}</span>
          </CInputGroup>
          <CFormLabel className="mt-2">{t('geoLabel')}</CFormLabel>
          <CustomSelect
            name="geo"
            options={settings.geos || []}
            aria-label={t('geoAreaLabel')}
            placeholder={t('geoLabelPlaceholder')}
            onChange={onChange}
            value={application.geo || []}
            feedbackInvalid={validationErrors.geo}
            invalid={!!validationErrors.geo}
            cleaner={false}
            virtualScroller
            visibleItems={5}
          />
          <CFormLabel className="mt-2">{t('languageLabel')}</CFormLabel>
          <CustomSelect
            name="language"
            options={settings.languages || []}
            aria-label={t('languageAreaLabel')}
            multiple={false}
            placeholder={t('languageLabelPlaceholder')}
            onChange={onChange}
            value={application.language ? [application.language] : []}
            feedbackInvalid={validationErrors.language}
            invalid={!!validationErrors.language}
            optionsStyle="text"
            cleaner={false}
            virtualScroller
            visibleItems={5}
          />
          <CFormLabel className="mt-2">{t('categoryLabel')}</CFormLabel>
          <CustomSelect
            name="category"
            options={settings.categories || []}
            aria-label={t('categoryAreaLabel')}
            multiple={false}
            placeholder={t('categoryPlaceholder')}
            onChange={onChange}
            value={application.category ? [application.category] : []}
            feedbackInvalid={validationErrors.category}
            invalid={!!validationErrors.category}
            optionsStyle="text"
            cleaner={false}
            virtualScroller
            visibleItems={5}
          />
          <CFormLabel className="mt-2">{t('whiteTypeLabel')}</CFormLabel>
          <CustomSelect
            name="white_type"
            options={settings.whiteTypes || []}
            aria-label={t('whiteTypeAreaLabel')}
            multiple={false}
            placeholder={t('whiteTypePlaceholder')}
            onChange={onChange}
            value={application.white_type ? [application.white_type] : []}
            feedbackInvalid={validationErrors.white_type}
            invalid={!!validationErrors.white_type}
            optionsStyle="text"
            cleaner={false}
          />
        </CForm>
      </CCol>
    </CRow>
  )
}

export default ApplicationPlatformTab
