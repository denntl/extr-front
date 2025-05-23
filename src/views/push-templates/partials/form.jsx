import React, { useEffect, useMemo, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CInputGroup,
} from '@coreui/react-pro'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CustomSelect from 'src/components/custom/CustomSelect'
import useUploadFile from 'src/hooks/useUploadFile'
import '../scss/push-templates.scss'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import ImagePreview from 'src/components/custom/ImagePreview'
import FileInputWithPreview from 'src/components/custom/FileInputWithPreview'

const defaultValues = {
  name: '',
  geo: [],
  events: [],
  is_active: false,
  title: '',
  content: '',
  icon: '',
  image: '',
  link: '',
}

const defaultErrors = {
  name: null,
  geo: null,
  events: null,
  is_active: null,
  title: null,
  content: null,
  icon: null,
  image: null,
  link: null,
}

const validationRules = {
  name: [new RequiredRule(), new StringRule(0, 255)],
  geo: [new RequiredRule()],
  events: [new RequiredRule()],
  title: [new RequiredRule(), new StringRule(0, 255)],
  content: [new RequiredRule()],
  icon: [new RequiredRule()],
  image: [new RequiredRule()],
}

const PushTemplatesForm = ({ values, errors, enums, onSave, onCancel }) => {
  const { t } = useTranslation(['client', 'admin'])
  const { upload, fileLoading } = useUploadFile()

  const [formErrors, setErrors] = useState(defaultErrors)
  const [formValues, setValues] = useState(defaultValues)
  const [geos, setGeos] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (enums) {
      setGeos(enums.geos)
      setEvents(enums.events)
    }
  }, [enums])

  useEffect(() => {
    if (errors) {
      setErrors(errors)
    }
  }, [errors])

  useEffect(() => {
    if (values) {
      setValues(values)
    }
  }, [values])

  const handleOnChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleGeosSelect = (selected) => {
    setValues((prev) => ({ ...prev, geo: selected }))
  }

  const handleEventsSelect = (selected) => {
    setValues((prev) => ({ ...prev, events: selected }))
  }

  const handleSwitchChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.checked }))
  }

  const handleIconChange = (values, name, errors) => {
    if (values) {
      setValues((prev) => ({ ...prev, [name]: values[0].path }))
    }
    if (errors) {
      setErrors(errors)
    }
  }

  const validateForm = () => {
    setErrors(defaultErrors)
    const validation = new Validation(validationRules)
    const result = validation.validate(formValues)
    if (!result) {
      setErrors((prev) => ({ ...prev, ...validation.errors }))
    }
    return result
  }

  const handleSave = () => {
    const validationResult = validateForm()
    if (!validationResult) {
      return
    }
    console.log(formValues)
    onSave(formValues)
  }

  return (
    <>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody>
          <CForm
            className="needs-validation"
            noValidate
            validated={false}
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <CFormLabel className="mt-2">{t('push_template_form_name')}</CFormLabel>
            <CFormInput
              placeholder={t('push_template_form_name')}
              autoComplete="off"
              name="name"
              aria-describedby="nameValidation"
              feedbackInvalid={formErrors.name}
              invalid={!!formErrors.name}
              value={formValues.name}
              onChange={handleOnChange}
            />
            <CFormLabel className="mt-2">{t('push_template_form_geo')}</CFormLabel>
            <CustomSelect
              value={formValues.geo}
              options={geos}
              name="geo"
              aria-describedby="geoValidatin"
              feedbackInvalid={formErrors.geo}
              invalid={!!formErrors.geo}
              onChange={handleGeosSelect}
              placeholder={t('push_template_form_geo')}
              virtualScroller
              visibleItems={5}
            />
            <CFormLabel className="mt-2">{t('push_template_form_title')}</CFormLabel>
            <CFormInput
              placeholder={t('push_template_form_title')}
              autoComplete="off"
              name="title"
              aria-describedby="titleValidation"
              feedbackInvalid={formErrors.title}
              invalid={!!formErrors.title}
              value={formValues.title}
              onChange={handleOnChange}
            />
            <CFormLabel className="mt-2">{t('push_template_form_content')}</CFormLabel>
            <CFormTextarea
              value={formValues.content}
              name="content"
              aria-describedby="contentValidatin"
              feedbackInvalid={formErrors.content}
              invalid={!!formErrors.content}
              onChange={handleOnChange}
            />
            <CFormLabel className="mt-2">{t('push_template_form_events')}</CFormLabel>
            <CustomSelect
              className="mb-2"
              value={formValues.events}
              options={events}
              name="events"
              aria-describedby="eventsValidatin"
              feedbackInvalid={formErrors.events}
              invalid={!!formErrors.events}
              onChange={handleEventsSelect}
              placeholder={t('push_template_form_events')}
              virtualScroller
              visibleItems={5}
            />
            <FileInputWithPreview
              value={formValues.icon}
              className=""
              type="file"
              accept="image/*"
              name="icon"
              label={t('push_template_form_icon')}
              aria-describedby="iconValidation"
              feedbackInvalid={formErrors.icon}
              invalid={!!formErrors.icon}
              onChange={handleIconChange}
            ></FileInputWithPreview>
            <FileInputWithPreview
              value={formValues.image}
              className=""
              type="file"
              accept="image/*"
              name="image"
              label={t('push_template_form_image')}
              aria-describedby="imageValidation"
              feedbackInvalid={formErrors.image}
              invalid={!!formErrors.image}
              onChange={handleIconChange}
            ></FileInputWithPreview>
            <CFormLabel className="mt-2">{t('push_template_form_link')}</CFormLabel>
            <CFormInput
              placeholder={t('push_template_form_link')}
              autoComplete="off"
              name="link"
              aria-describedby="nameValidation"
              feedbackInvalid={formErrors.link}
              invalid={!!formErrors.link}
              value={formValues.link}
              onChange={handleOnChange}
            />
            <CInputGroup>
              <CFormSwitch
                size="xl"
                className="mt-1 form-switch-wide"
                name="is_active"
                checked={!!formValues.is_active}
                onChange={handleSwitchChange}
              ></CFormSwitch>
              <span className="ml-2 mt-2">{t('push_template_form_active')}</span>
            </CInputGroup>
          </CForm>
        </CCardBody>
        <CCardFooter className="p-3">
          <CButton color="cancel" className="px-4-5 rounded-pill" onClick={onCancel}>
            {t('myCompany_companyName_formCancelButton')}
          </CButton>
          <CButton
            color="confirm"
            className="px-4-5 rounded-pill float-end ml-2"
            onClick={handleSave}
          >
            {t('myCompany_companyName_formSaveButton')}
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

PushTemplatesForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  enums: PropTypes.shape({
    geos: PropTypes.array,
    events: PropTypes.array,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default PushTemplatesForm
