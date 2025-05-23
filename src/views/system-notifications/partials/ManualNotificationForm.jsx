import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CInputGroup,
} from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomSelect from 'src/components/custom/CustomSelect'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'

const defaultValues = {
  name: '',
  isAllUsers: true,
  roles: [],
  isAllCompanies: true,
  companies: [],
  message: '',
}

const defaultErrors = {
  name: null,
  isAllUsers: null,
  roles: null,
  isAllCompanies: null,
  companies: null,
  message: null,
}

const validationRules = {
  name: [new RequiredRule(), new StringRule(0, 255)],
  message: [new RequiredRule()],
}

const ManualNotificationForm = ({ values, errors, enums, onSave, onCancel }) => {
  const { t } = useTranslation('system-notifications')

  const [formErrors, setErrors] = useState(defaultErrors)
  const [formValues, setValues] = useState(defaultValues)
  const [roles, setRoles] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (enums) {
      setRoles(enums.roles)
      setCompanies(enums.companies)
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

  const handleSwitchChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.checked }))
  }

  const handleRolesSelect = (selected) => {
    setValues((prev) => ({ ...prev, roles: selected }))
  }

  const handleCompaniesSelect = (selected) => {
    setValues((prev) => ({ ...prev, companies: selected }))
  }

  const validateForm = () => {
    setErrors(defaultErrors)
    let rules = { ...validationRules }
    if (!formValues.isAllUsers) {
      rules['roles'] = [new RequiredRule()]
    }
    if (!formValues.isAllCompanies) {
      rules['companies'] = [new RequiredRule()]
    }
    const validation = new Validation(rules)
    const result = validation.validate(formValues)
    if (!result) {
      setErrors((prev) => ({ ...prev, ...validation.errors }))
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
        <CInputGroup>
          <CFormSwitch
            size="xl"
            className="mt-1 form-switch-wide"
            name="isAllUsers"
            checked={!!formValues.isAllUsers}
            onChange={handleSwitchChange}
          ></CFormSwitch>
          <span className="ml-2 mt-2">{t('notification_form_all_users')}</span>
        </CInputGroup>
        <CFormLabel className="mt-2">{t('notification_form_roles')}</CFormLabel>
        <CustomSelect
          value={formValues.roles}
          options={roles}
          name="roles"
          aria-describedby="rolesValidatin"
          feedbackInvalid={formErrors.roles}
          invalid={!!formErrors.roles}
          onChange={handleRolesSelect}
          placeholder={t('notification_form_roles')}
          virtualScroller
          visibleItems={5}
          disabled={formValues.isAllUsers}
        />
        <CInputGroup>
          <CFormSwitch
            size="xl"
            className="mt-1 form-switch-wide"
            name="isAllCompanies"
            checked={!!formValues.isAllCompanies}
            onChange={handleSwitchChange}
          ></CFormSwitch>
          <span className="ml-2 mt-2">{t('notification_form_all_companies')}</span>
        </CInputGroup>
        <CFormLabel className="mt-2">{t('notification_form_companies')}</CFormLabel>
        <CustomSelect
          value={formValues.companies}
          options={companies}
          name="roles"
          aria-describedby="companiesValidatin"
          feedbackInvalid={formErrors.companies}
          invalid={!!formErrors.companies}
          onChange={handleCompaniesSelect}
          placeholder={t('notification_form_companies')}
          virtualScroller
          visibleItems={5}
          disabled={formValues.isAllCompanies}
        />
        <CFormLabel className="mt-2">{t('notification_form_message')}</CFormLabel>
        <CFormTextarea
          value={formValues.message}
          name="message"
          aria-describedby="messageValidatin"
          feedbackInvalid={formErrors.message}
          invalid={!!formErrors.message}
          onChange={handleOnChange}
        />
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

ManualNotificationForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  enums: PropTypes.shape({
    companies: PropTypes.array,
    roles: PropTypes.array,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default ManualNotificationForm
