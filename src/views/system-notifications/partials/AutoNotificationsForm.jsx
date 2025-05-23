import React, { useEffect, useState } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSwitch, CInputGroup } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomSelect from 'src/components/custom/CustomSelect'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'

const defaultValues = {
  name: '',
  entity: '',
  event: '',
  isAllUsers: true,
  roles: [],
  isActive: false,
  isClientShow: true,
}

const defaultErrors = {
  name: null,
  entity: null,
  event: null,
  isAllUsers: null,
  roles: null,
  isActive: null,
  isClientShow: null,
}

const validationRules = {
  name: [new RequiredRule(), new StringRule(0, 255)],
  entity: [new RequiredRule()],
  event: [new RequiredRule()],
}

const AutoNotificationsForm = ({ values, errors, enums, onSave, onCancel }) => {
  const { t } = useTranslation('system-notifications')

  const [formErrors, setFormErrors] = useState(defaultErrors)
  const [formValues, setFormValues] = useState(defaultValues)
  const [entities, setEntities] = useState([])
  const [events, setEvents] = useState([])
  const [roles, setRoles] = useState([])
  const [resetOnOptionsChange, setResetOnOptionsChange] = useState(false)

  useEffect(() => {
    if (enums) {
      setEntities(enums.entities)
      setRoles(enums.roles)
    }
  }, [enums])

  useEffect(() => {
    if (errors) {
      setFormErrors(errors)
    }
  }, [errors])

  useEffect(() => {
    if (values) {
      setFormValues(values)
    }
  }, [values])

  useEffect(() => {
    if (events.length > 0) {
      setResetOnOptionsChange(true)
    }
  }, [events])

  const handleOnChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }))
  }
  const handleEntitySelect = (value) => {
    setEvents(enums.events[value])
    if (resetOnOptionsChange) {
      setFormValues((prev) => ({ ...prev, entity: value, event: '' }))
      return
    }
    setFormValues((prev) => ({ ...prev, entity: value }))
  }

  const handleEventSelect = (value) => {
    if (value === null) return
    setFormValues((prev) => ({ ...prev, event: value }))
  }

  const handleSwitchChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.checked }))
    if (target.name === 'isAllUsers' && target.checked) {
      setFormValues((prev) => ({ ...prev, roles: [] }))
    }
  }

  const handleRolesSelect = (selected) => {
    setFormValues((prev) => ({ ...prev, roles: selected }))
  }

  const validateForm = () => {
    setFormErrors(defaultErrors)
    const validation = new Validation(validationRules)
    const result = validation.validate(formValues)
    if (!result) {
      setFormErrors((prev) => ({ ...prev, ...validation.errors }))
    }
    return result
  }

  const handleCancel = () => {
    onCancel()
  }
  const handleSave = () => {
    const validationResult = validateForm()
    if (!validationResult) {
      return
    }
    onSave(formValues)
  }

  return (
    <>
      <CForm
        className="needs-validation"
        noValidate
        validated={false}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <CFormLabel className="mt-2">{t('notification_form_name')}</CFormLabel>
        <CFormInput
          placeholder={t('notification_form_name')}
          autoComplete="off"
          name="name"
          aria-describedby="tnameValidation"
          feedbackInvalid={formErrors.name}
          invalid={!!formErrors.name}
          value={formValues.name}
          onChange={handleOnChange}
        />
        <CFormLabel className="mt-2">{t('notification_form_entity')}</CFormLabel>
        <CustomSelect
          options={entities}
          name="entity"
          aria-describedby="entityValidation"
          value={formValues.entity ? [formValues.entity] : []}
          feedbackInvalid={formErrors.entity}
          invalid={!!formErrors.entity}
          onChange={handleEntitySelect}
          placeholder={t('notification_form_entity')}
          cleaner={false}
          virtualScroller
          visibleItems={5}
          optionsStyle="text"
          multiple={false}
        />
        <CFormLabel className="mt-2">{t('notification_form_event')}</CFormLabel>
        <CustomSelect
          options={events}
          name="event"
          aria-describedby="eventValidation"
          value={formValues.event ? [formValues.event] : []}
          feedbackInvalid={formErrors.event}
          invalid={!!formErrors.event}
          onChange={handleEventSelect}
          placeholder={t('notification_form_event')}
          cleaner={false}
          virtualScroller
          visibleItems={5}
          optionsStyle="text"
          multiple={false}
          resetSelectionOnOptionsChange={resetOnOptionsChange}
        />
        {/*<CInputGroup>*/}
        {/*  <CFormSwitch*/}
        {/*    size="xl"*/}
        {/*    className="mt-1 form-switch-wide"*/}
        {/*    name="isAllUsers"*/}
        {/*    checked={!!formValues.isAllUsers}*/}
        {/*    onChange={handleSwitchChange}*/}
        {/*  ></CFormSwitch>*/}
        {/*  <span className="ml-2 mt-2">{t('notification_form_all_users')}</span>*/}
        {/*</CInputGroup>*/}
        {/*<CFormLabel className="mt-2">{t('notification_form_roles')}</CFormLabel>*/}
        {/*<CustomSelect*/}
        {/*  value={formValues.roles}*/}
        {/*  options={roles}*/}
        {/*  name="roles"*/}
        {/*  aria-describedby="rolesValidatin"*/}
        {/*  feedbackInvalid={formErrors.roles}*/}
        {/*  invalid={!!formErrors.roles}*/}
        {/*  onChange={handleRolesSelect}*/}
        {/*  placeholder={t('notification_form_roles')}*/}
        {/*  virtualScroller*/}
        {/*  visibleItems={5}*/}
        {/*  disabled={formValues.isAllUsers}*/}
        {/*/>*/}
        <CInputGroup>
          <CFormSwitch
            size="xl"
            className="mt-1 form-switch-wide"
            name="isActive"
            checked={!!formValues.isActive}
            onChange={handleSwitchChange}
          ></CFormSwitch>
          <span className="ml-2 mt-2">{t('notification_form_active')}</span>
        </CInputGroup>
        <CInputGroup>
          <CFormSwitch
            size="xl"
            className="mt-1 form-switch-wide"
            name="isClientShow"
            checked={!!formValues.isClientShow}
            onChange={handleSwitchChange}
          ></CFormSwitch>
          <span className="ml-2 mt-2">{t('notification_form_client_show')}</span>
        </CInputGroup>
      </CForm>
      <div className="mt-4">
        <CButton color="cancel" className="px-4-5 rounded-pill" onClick={handleCancel}>
          {t('myCompany_companyName_formCancelButton')}
        </CButton>
        <CButton
          color="confirm"
          className="px-4-5 rounded-pill float-end ml-2"
          onClick={handleSave}
        >
          {t('myCompany_companyName_formSaveButton')}
        </CButton>
      </div>
    </>
  )
}

AutoNotificationsForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  enums: PropTypes.shape({
    entities: PropTypes.array,
    events: PropTypes.array,
    roles: PropTypes.array,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default AutoNotificationsForm
