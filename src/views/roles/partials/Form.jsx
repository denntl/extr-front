import React, { useEffect, useState } from 'react'
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
  CHeader,
} from '@coreui/react-pro'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import CoverProvider from 'src/providers/CoverProvider'
import CustomSelect from 'src/components/custom/CustomSelect'
import PropTypes from 'prop-types'

const defaultErrors = {}

const validationRules = {
  name: [new RequiredRule(), new StringRule(2, 50)],
  permissionIds: [],
}

const defaultData = {
  name: '',
  is_predefined: false,
  permissions: [],
  permissionIds: [],
}

export default function RoleForm({ values, errors, onSave, onCancel, formHeader }) {
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState(defaultErrors)
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    if (values) {
      setData(values)
    }
  }, [values])
  useEffect(() => {
    if (errors) {
      setFormErrors(errors)
      setLoading(false)
    }
  }, [errors])

  const handleOnChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handlePermissionsSelect = (selected) => {
    setData((prev) => ({ ...prev, permissionIds: selected }))
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
          <CCardHeader className="p-3">{formHeader ? formHeader : 'Роли'}</CCardHeader>
          <CCardBody>
            {formErrors.permissions && (
              <CCardText className="text-danger">{formErrors.permissions}</CCardText>
            )}
            <CForm className="needs-validation" noValidate validated={false}>
              <CFormLabel className="mt-2">Название</CFormLabel>
              <CFormInput
                placeholder="Название"
                autoComplete="off"
                name="name"
                disabled={data ? data.is_predefined : false}
                aria-describedby="nameValidation"
                feedbackInvalid={formErrors.name}
                invalid={!!formErrors.name}
                value={data ? data.name : ''}
                onChange={handleOnChange}
              />
              <CFormLabel className="mt-2">Пермишены</CFormLabel>
              <CustomSelect
                value={data.permissionIds ? data.permissionIds : []}
                options={data.permissions ? data.permissions : []}
                aria-describedby="permissions"
                feedbackInvalid={formErrors.permissionIds}
                invalid={!!formErrors.permissionIds}
                onChange={handlePermissionsSelect}
                placeholder="Пермишены"
                virtualScroller
                visibleItems={5}
                multiple={true}
              />
            </CForm>
          </CCardBody>
          <CCardFooter className="p-3">
            <CButton color="cancel" className="px-4-5 rounded-pill" onClick={onCancel}>
              Отмена
            </CButton>
            <CButton
              color="confirm"
              className="px-4-5 rounded-pill float-end ml-2"
              onClick={handleSave}
            >
              Сохранить
            </CButton>
          </CCardFooter>
        </CoverProvider>
      </CCard>
    </>
  )
}

RoleForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  formHeader: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}
