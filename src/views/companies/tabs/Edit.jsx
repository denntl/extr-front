import React, { useEffect, useState } from 'react'
import useApi from 'src/hooks/useApi'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CHeader,
} from '@coreui/react-pro'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import { useNavigate, useParams } from 'react-router-dom'
import CustomSelect from 'src/components/custom/CustomSelect'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import CoverProvider from 'src/providers/CoverProvider'
import CompanyTabs, { TAB_EDIT } from 'src/views/companies/partials/CompanyTabs'

const defaultValues = {
  id: '',
  name: '',
  owner_id: '',
}

const defaultErrors = {}

const validationRules = {
  name: [new RequiredRule(), new StringRule(2, 15)],
}

export default function Edit() {
  const navigate = useNavigate()
  const { Company } = useApi()
  const { companyId } = useParams()

  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState(defaultErrors)
  const [users, setUsers] = useState([])

  useEffect(() => {
    Company.edit(companyId).then((response) => {
      setUsers(response.users)
      setValues(response.company)
      setLoading(false)
    })
  }, [companyId])

  const handleOnChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleOwnerIdSelect = (selected) => {
    setValues((prev) => ({ ...prev, owner_id: selected }))
  }

  const validateForm = () => {
    setErrors(defaultErrors)
    const validation = new Validation(validationRules)
    const result = validation.validate(values)
    if (!result) {
      setErrors((prev) => ({ ...prev, ...validation.errors }))
    }
    return result
  }

  const handleCancel = () => {
    return navigate('/companies')
  }

  const handleSave = () => {
    const validationResult = validateForm()
    if (!validationResult) {
      return
    }
    setLoading(true)
    Company.update(companyId, values).then(
      () => {
        return navigate('/companies')
      },
      (response) => {
        if (response.hasValidationErrors()) {
          setErrors(response.getValidationErrors())
        }
        setLoading(false)
      },
    )
  }

  return (
    <PageContainerWithTabs active={TAB_EDIT} {...CompanyTabs({ companyId })}>
      <CoverProvider isLoading={loading}>
        <CCardBody>
          <CForm className="needs-validation" noValidate validated={false}>
            <CFormLabel className="mt-2">Название</CFormLabel>
            <CFormInput
              placeholder="Название"
              autoComplete="off"
              name="name"
              aria-describedby="nameValidation"
              feedbackInvalid={errors.name}
              invalid={!!errors.name}
              value={values.name}
              onChange={handleOnChange}
            />
            <CFormLabel className="mt-2">Руководитель</CFormLabel>
            <CustomSelect
              options={users}
              multiple={false}
              placeholder="Руководитель"
              onChange={handleOwnerIdSelect}
              value={values.owner_id ? [values.owner_id] : []}
              feedbackInvalid={errors.owner_id}
              invalid={!!errors.owner_id}
              cleaner={false}
              virtualScroller
              visibleItems={5}
            />
          </CForm>
        </CCardBody>
        <CCardFooter className="p-3">
          <CButton color="cancel" className="px-4-5 rounded-pill" onClick={handleCancel}>
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
    </PageContainerWithTabs>
  )
}
