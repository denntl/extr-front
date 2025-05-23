import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react-pro'
import SingleSelect from 'src/components/custom/SingleSelect'
import CustomSelect from 'src/components/custom/CustomSelect'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Validation } from 'src/services/validation/Validation'
import PropTypes from 'prop-types'

const defaultValues = {
  id: '',
  name: '',
  teamLeadId: '',
  members: [],
}

const defaultErrors = {
  name: null,
  teamLeadId: null,
  members: null,
}

const validationRules = {
  name: [new RequiredRule(), new StringRule(0, 255)],
}
const TeamForm = ({ values, errors, teamLeads, members, onCancel, onSave }) => {
  const { t } = useTranslation('client')

  const [formErrors, setErrors] = useState(defaultErrors)
  const [formValues, setValues] = useState(defaultValues)

  useEffect(() => {
    if (values) {
      setValues(values)
    }
    if (errors) {
      setErrors(errors)
    }
  }, [errors, values])

  const handleOnChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleTeamLeadSelect = (selected) => {
    setValues((prev) => ({ ...prev, teamLeadId: selected !== undefined ? selected : null }))
  }

  const handleMembersSelect = (selected) => {
    setValues((prev) => ({ ...prev, members: selected }))
  }

  const handleCancel = () => {
    onCancel()
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
    onSave(formValues)
  }

  return (
    <>
      <CCard>
        <CCardHeader>{t('team_header_create')}</CCardHeader>
        <CCardBody>
          {errors.permissions && (
            <CCardText className="text-danger">{errors.permissions}</CCardText>
          )}

          <CForm className="needs-validation" noValidate validated={false}>
            <CFormLabel className="mt-2">{t('team_field_name')}</CFormLabel>
            <CFormInput
              placeholder={t('team_field_name')}
              autoComplete="off"
              name="name"
              aria-describedby="nameValidation"
              feedbackInvalid={formErrors.name}
              invalid={!!formErrors.name}
              value={formValues.name}
              onChange={handleOnChange}
            />
            <CFormLabel className="mt-2">{t('team_field_teamLead')}</CFormLabel>
            <SingleSelect
              options={teamLeads}
              name="teamLeadId"
              aria-describedby="teamLeadIdValidation"
              value={formValues.teamLeadId}
              feedbackInvalid={formErrors.teamLeadId}
              invalid={!!formErrors.teamLeadId}
              onChange={handleTeamLeadSelect}
              placeholder={t('team_field_teamLead')}
              cleaner={false}
              virtualScroller
              visibleItems={5}
            />
            <CFormLabel className="mt-2">{t('team_field_members')}</CFormLabel>
            <CustomSelect
              value={formValues.members}
              options={members}
              name="members"
              aria-describedby="membersValidatin"
              feedbackInvalid={formErrors.members}
              invalid={!!formErrors.members}
              onChange={handleMembersSelect}
              placeholder={t('team_field_members')}
              virtualScroller
              visibleItems={5}
            />
          </CForm>
        </CCardBody>
        <CCardFooter className="p-3">
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
        </CCardFooter>
      </CCard>
    </>
  )
}

TeamForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  teamLeads: PropTypes.arrayOf(PropTypes.object).isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}
export default TeamForm
