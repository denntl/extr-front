import { useTranslation } from 'react-i18next'
import useUploadFile from 'src/hooks/useUploadFile'
import React, { useEffect, useState } from 'react'
import { Validation } from 'src/services/validation/Validation'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CDatePicker,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CInputGroup,
  CRow,
  CTimePicker,
} from '@coreui/react-pro'
import CustomSelect from 'src/components/custom/CustomSelect'
import PropTypes from 'prop-types'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import {
  PUSH_NOTIFICATION_TYPE_REGULAR,
  PUSH_NOTIFICATION_TYPE_SINGLE,
} from 'src/enums/push-notification-types'
import SingleSelect from 'src/components/custom/SingleSelect'
import useApi from 'src/hooks/useApi'
import { parse } from 'date-fns'
import { format } from 'date-fns-tz'
import moment from 'moment-timezone'
import FileInputWithPreview from 'src/components/custom/FileInputWithPreview'
import { DynamicRule } from 'src/services/validation/rules/DynamicRule'

const defaultValues = {
  type: PUSH_NOTIFICATION_TYPE_SINGLE,
  name: '',
  push_template_id: null,
  application_id: '',
  date: null,
  time: null,
  geo: [],
  events: [],
  is_active: false,
  title: '',
  content: '',
  icon: '',
  image: '',
  link: '',
  is_delayed: false,
}

const defaultErrors = {
  type: null,
  name: null,
  push_template_id: null,
  application_id: null,
  date: null,
  time: null,
  geo: null,
  events: null,
  is_active: null,
  title: null,
  content: null,
  icon: null,
  image: null,
  link: null,
  is_delayed: null,
}

const validationRules = {
  type: [new RequiredRule()],
  application_id: [new RequiredRule()],
  time: [new RequiredRule()],
  name: [new RequiredRule(), new StringRule(0, 255)],
  geo: [new RequiredRule()],
  events: [new RequiredRule()],
}

const PushNotificationForm = ({ values, errors, enums, onSave, onCancel }) => {
  const { t } = useTranslation('client-push-notifications')
  const { PushNotifications } = useApi()

  const [formErrors, setErrors] = useState(defaultErrors)
  const [formValues, setValues] = useState(defaultValues)
  const [geos, setGeos] = useState([])
  const [events, setEvents] = useState([])
  const [templates, setTemplates] = useState([])
  const [applications, setApplications] = useState([])
  const [loaded, setLoaded] = useState(false)

  const types = [
    { value: PUSH_NOTIFICATION_TYPE_SINGLE, label: 'push_notifications_tab_single' },
    { value: PUSH_NOTIFICATION_TYPE_REGULAR, label: 'push_notifications_tab_regular' },
  ]

  useEffect(() => {
    if (enums) {
      setGeos(enums.geos)
      setEvents(enums.events)
      setApplications(enums.applications)
      setTemplates(enums.templates)
    }
  }, [enums])

  useEffect(() => {
    if (errors) {
      setErrors(errors)
    }
  }, [errors])

  useEffect(() => {
    if (values) {
      values = convertFromUTC(values)
      setValues(values)
    }
  }, [values])

  const convertToUTC = (values) => {
    let date = values.date
    if (!date) {
      date = moment().format('YYYY-MM-DD')
    }
    let dateTime = moment(date + ' ' + values.time)
    dateTime.tz('UTC')
    values.date = dateTime.format('YYYY-MM-DD')
    values.time = dateTime.format('HH:mm')
    return values
  }

  const convertFromUTC = (values) => {
    let date = values.date
    if (!date) {
      date = moment().format('YYYY-MM-DD')
    }
    let dateTime = moment.tz(date + ' ' + values.time, 'UTC')
    dateTime.tz(moment.tz.guess())
    values.date = dateTime.format('YYYY-MM-DD')
    values.time = dateTime.format('HH:mm')
    return values
  }

  const handleOnChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handelDateChange = (date) => {
    setValues((prev) => ({ ...prev, date: date ? moment(date).format('YYYY-MM-DD') : null }))
  }
  const handelTimeChange = (tz, time) => {
    setValues((prev) => ({ ...prev, time: time }))
  }

  const handleSingleSelect = (selected, name) => {
    setValues((prev) => ({ ...prev, [name]: selected }))
  }

  const handleTemplateSelect = (selected) => {
    setValues((prev) => ({ ...prev, push_template_id: selected }))

    if (selected && loaded) {
      PushNotifications.templateInfo(selected).then((response) => {
        setValues((prev) => ({
          ...prev,
          geo: response.data.template.geo,
          events: response.data.template.events,
          title: response.data.template.title,
          content: response.data.template.content,
          icon: response.data.template.icon,
          image: response.data.template.image,
          link: response.data.template.link,
        }))
      })
    }
    setLoaded(true)
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
    let rules = { ...validationRules }
    if (!formValues.push_template_id) {
      rules['title'] = [new RequiredRule(), new StringRule(0, 255)]
      rules['content'] = [new RequiredRule()]
      rules['icon'] = [new RequiredRule()]
      rules['image'] = [new RequiredRule()]
    }
    if (formValues.type === PUSH_NOTIFICATION_TYPE_SINGLE) {
      rules['date'] = [
        new RequiredRule(),
        new DynamicRule((value, values) => {
          return value + ' ' + values['time'] >= moment().format('YYYY-MM-DD HH:mm')
        }, 'Измените дату отправки пушка'),
      ]
    }
    const validation = new Validation(rules)
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
    const values = convertToUTC({ ...formValues })
    onSave(values)
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CForm
            className="needs-validation"
            noValidate
            validated={false}
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <CRow>
              <CCol>
                <CFormLabel className="mt-2">{t('push_notification_form_type')}</CFormLabel>
                <SingleSelect
                  options={types.map((type) => ({ value: type.value, label: t(type.label) }))}
                  value={formValues.type}
                  disabled={!!formValues.id}
                  name="type"
                  aria-describedby="typeValidatin"
                  feedbackInvalid={formErrors.type}
                  invalid={!!formErrors.type}
                  onChange={handleSingleSelect}
                  placeholder={t('push_notification_form_type')}
                  virtualScroller
                  visibleItems={5}
                />
                <CFormLabel className="mt-2">{t('push_notification_form_name')}</CFormLabel>
                <CFormInput
                  placeholder={t('push_notification_form_name')}
                  autoComplete="off"
                  name="name"
                  aria-describedby="nameValidation"
                  feedbackInvalid={formErrors.name}
                  invalid={!!formErrors.name}
                  value={formValues.name}
                  onChange={handleOnChange}
                />
                <CFormLabel className="mt-2">{t('push_notification_form_template')}</CFormLabel>
                <SingleSelect
                  options={templates}
                  value={formValues.push_template_id}
                  name="push_template_id"
                  aria-describedby="tpush_template_idValidatin"
                  feedbackInvalid={formErrors.push_template_id}
                  invalid={!!formErrors.push_template_id}
                  onChange={handleTemplateSelect}
                  placeholder={t('push_notification_form_template')}
                  virtualScroller
                  visibleItems={5}
                />
                {formValues.type === PUSH_NOTIFICATION_TYPE_SINGLE && (
                  <>
                    <CFormLabel className="mt-2">{t('push_notification_form_date')}</CFormLabel>
                    <CDatePicker
                      value={formValues.date}
                      date={formValues.date}
                      name="2022-11-12"
                      aria-describedby="dateValidatin"
                      feedbackInvalid={formErrors.date}
                      invalid={!!formErrors.date}
                      onDateChange={handelDateChange}
                      inputDateParse={(date) => parse(date, 'yyyy-MM-dd', new Date())}
                      inputDateFormat={(date) => format(new Date(date), 'yyyy-MM-dd')}
                    />
                  </>
                )}
                <CFormLabel className="mt-2">{t('push_notification_form_time')}</CFormLabel>
                <CTimePicker
                  value={formValues.time}
                  time={formValues.time}
                  name="time"
                  aria-describedby="timeValidatin"
                  feedbackInvalid={formErrors.time}
                  invalid={!!formErrors.time}
                  onTimeChange={handelTimeChange}
                  seconds={false}
                />
                {formValues.type === PUSH_NOTIFICATION_TYPE_REGULAR && (
                  <CInputGroup>
                    <CFormSwitch
                      size="xl"
                      className="mt-1 form-switch-wide"
                      name="is_delayed"
                      checked={!!formValues.is_delayed}
                      onChange={handleSwitchChange}
                    ></CFormSwitch>
                    <span className="ml-2 mt-2">{t('push_notification_form_delayed')}</span>
                  </CInputGroup>
                )}
              </CCol>
              <CCol>
                <CFormLabel className="mt-2">{t('push_notification_form_application')}</CFormLabel>
                <SingleSelect
                  options={applications}
                  value={formValues.application_id}
                  name="application_id"
                  disabled={!!formValues.id}
                  aria-describedby="application_idValidatin"
                  feedbackInvalid={formErrors.application_id}
                  invalid={!!formErrors.application_id}
                  onChange={handleSingleSelect}
                  placeholder={t('push_notification_form_application')}
                  virtualScroller
                  visibleItems={5}
                />
                <CFormLabel className="mt-2">{t('push_notification_form_geo')}</CFormLabel>
                <CustomSelect
                  value={formValues.geo}
                  options={geos}
                  name="geo"
                  aria-describedby="geoValidatin"
                  feedbackInvalid={formErrors.geo}
                  invalid={!!formErrors.geo}
                  onChange={handleGeosSelect}
                  placeholder={t('push_notification_form_geo')}
                  virtualScroller
                  visibleItems={5}
                />
                <CFormLabel className="mt-2">{t('push_notification_form_events')}</CFormLabel>
                <CustomSelect
                  className="mb-2"
                  value={formValues.events}
                  options={events}
                  name="events"
                  aria-describedby="eventsValidatin"
                  feedbackInvalid={formErrors.events}
                  invalid={!!formErrors.events}
                  onChange={handleEventsSelect}
                  placeholder={t('push_notification_form_events')}
                  virtualScroller
                  visibleItems={5}
                />
              </CCol>
            </CRow>
            <CFormLabel className="mt-2">{t('push_notification_form_title')}</CFormLabel>
            <CFormInput
              placeholder={t('push_notification_form_title')}
              autoComplete="off"
              name="title"
              aria-describedby="titleValidation"
              feedbackInvalid={formErrors.title}
              invalid={!!formErrors.title}
              value={formValues.title}
              onChange={handleOnChange}
            />
            <CFormLabel className="mt-2">{t('push_notification_form_content')}</CFormLabel>
            <CFormTextarea
              value={formValues.content}
              name="content"
              aria-describedby="contentValidatin"
              feedbackInvalid={formErrors.content}
              invalid={!!formErrors.content}
              onChange={handleOnChange}
            />
            <FileInputWithPreview
              value={formValues.icon}
              className=""
              type="file"
              accept="image/*"
              name="icon"
              label={t('push_notification_form_icon')}
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
              label={t('push_notification_form_image')}
              aria-describedby="imageValidation"
              feedbackInvalid={formErrors.image}
              invalid={!!formErrors.image}
              onChange={handleIconChange}
            ></FileInputWithPreview>
            <CFormLabel className="mt-2">{t('push_notification_form_link')}</CFormLabel>
            <CFormInput
              placeholder={t('push_notification_form_link')}
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
              <span className="ml-2 mt-2">{t('push_notification_form_active')}</span>
            </CInputGroup>
          </CForm>
        </CCardBody>
        <CCardFooter className="p-3">
          <CButton color="cancel" className="px-4-5 rounded-pill" onClick={onCancel}>
            {t('cancel_button')}
          </CButton>
          <CButton
            color="confirm"
            className="px-4-5 rounded-pill float-end ml-2"
            onClick={handleSave}
          >
            {t('save_button')}
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

PushNotificationForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  enums: PropTypes.shape({
    geos: PropTypes.array,
    events: PropTypes.array,
    applications: PropTypes.array,
    templates: PropTypes.array,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default PushNotificationForm
