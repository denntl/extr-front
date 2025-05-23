import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CHeader,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Validation } from 'src/services/validation/Validation'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { MatchRule } from 'src/services/validation/rules/MatchRule'
import { useNavigate, useParams } from 'react-router-dom'
import SingleSelect from 'src/components/custom/SingleSelect'
import CustomSelect from 'src/components/custom/CustomSelect'
import PropTypes from 'prop-types'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import ChangeStatusDialog from 'src/views/my-company/partials/ChangeStatusDialog'
import useApi from 'src/hooks/useApi'
import { USER_STATUS_DELETED } from 'src/components/listing/constants'
import { useTranslation } from 'react-i18next'

const defaultValues = {
  username: '',
  name: '',
  email: '',
  password: '',
  roles: [],
  is_employee: false,
  isEnabled: false,
  status: '',
}

const defaultErrors = {
  username: null,
  name: null,
  email: null,
  password: null,
  roles: null,
  is_employee: null,
  isEnabled: null,
  status: null,
}

const regEmailValid =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const passwordErrorMessage =
  'Только латиница, миниум одна заглавная буква, миниум один специальный символ'

const validationRules = {
  name: [new RequiredRule(), new StringRule(2, 255)],
  email: [new MatchRule(regEmailValid, 'Введите правильный email')],
  username: [new MatchRule(/^\w+$/i, 'Неправильный формат. Пример: username')],
  password: [
    new StringRule(8, 32),
    new MatchRule(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+$/, passwordErrorMessage),
  ],
  status: [new RequiredRule()],
}

const UserForm = ({ errors, values, companyName, enums, onSave, onCancel }) => {
  const navigate = useNavigate()
  const ConfirmModal = useConfirmModal()
  const { User } = useApi()
  const { userId } = useParams()
  const { t } = useTranslation('admin-users')

  const [statuses, setStatuses] = useState([])
  const [roles, setRoles] = useState([])
  const [rolesList, setRolesList] = useState([])
  const [activeApplications, setActiveApplications] = useState([])
  const [companyUsers, setCompanyUsers] = useState([])
  const [formCompanyName, setCompanyName] = useState('')
  const [formValues, setValues] = useState(defaultValues)
  const [formErrors, setErrors] = useState(defaultErrors)
  const [newAppsOwners, setNewAppsOwners] = useState([])
  const [statusErrors, setStatusErrors] = useState({})

  useEffect(() => {
    if (enums) {
      setRoles(enums.roles)
      setRolesList(enums.rolesList)
      setStatuses(enums.statusList)
      setActiveApplications(enums.activeApplications)
      setCompanyUsers(enums.companyUsers)
    }
  }, [enums])

  useEffect(() => {
    ConfirmModal.setConfirmCallback(async () => {
      return await onConfirmChangeAppUser()
    })
    activeApplications.length === newAppsOwners.length
      ? ConfirmModal.setConfirmDisabled(false)
      : ConfirmModal.setConfirmDisabled(true)
  }, [newAppsOwners])

  useEffect(() => {
    ConfirmModal.setErrorCallback(statusErrors)
    ConfirmModal.setMessageCallback(message(statusErrors))
  }, [statusErrors])

  useEffect(() => {
    if (values) {
      setValues(values)
    }
  }, [values])

  useEffect(() => {
    if (companyName) {
      setCompanyName(companyName)
    }
  }, [companyName])

  useEffect(() => {
    if (errors) {
      setErrors(errors)
    }
  }, [errors])

  const handleOnChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleRolesSelect = (selected) => {
    setValues((prev) => ({ ...prev, roles: selected }))
  }

  const handleStatusSelect = (selected) => {
    setValues((prev) => ({ ...prev, status: selected !== undefined ? selected : null }))
  }

  const handelCheckbox = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.checked }))
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

  const handleCancel = () => {
    onCancel()
  }
  const handleUserSelect = (userId, applicationId) => {
    setNewAppsOwners((prev) => {
      const updatedPwaOwners = prev.map((app) => {
        if (app.applicationId === applicationId) {
          return { ...app, userId: userId }
        }
        return app
      })
      const appExists = prev.some((pwa) => pwa.applicationId === applicationId)
      if (!appExists) {
        updatedPwaOwners.push({ userId, applicationId: applicationId })
      }
      return updatedPwaOwners.filter((user) => user.userId !== null)
    })
  }

  const onConfirmChangeAppUser = async () => {
    const response = await User.changeStatus(userId, {
      status: formValues.status,
      newApplicationsOwners: newAppsOwners.filter((user) => user.userId !== null),
    }).catch((errors) => {
      setStatusErrors(errors.getErrors())
      return errors
    })
    if (response?.data.isUpdated) {
      onSave(formValues)
    }
    return response
  }

  const message = (apps) => {
    if (apps.length === 0) {
      return t('update_confirmation')
    }
    const data = {
      users: companyUsers,
      applications: activeApplications,
    }
    return (
      <>
        <p>{t('set_new_apps_owners')}</p>
        <ChangeStatusDialog values={data} errors={statusErrors} onChange={handleUserSelect} />
      </>
    )
  }
  const handleSave = () => {
    const validationResult = validateForm()
    if (!validationResult) {
      return
    }
    if (activeApplications.length > 0 && formValues.status === USER_STATUS_DELETED) {
      ConfirmModal.initAndOpen({
        message: message(activeApplications),
        size: 'lg',
        backdrop: 'static',
        errors: {},
        confirmDisabled: true,
        confirmCallback: async () => {
          return await onConfirmChangeAppUser()
        },
        rejectCallback: () => {
          setStatusErrors({})
        },
      })
    } else {
      onSave(formValues)
    }
  }

  return (
    <>
      <CCard>
        <CHeader className="p-3">{t('edit_user')}</CHeader>
        <CCardBody>
          <CForm className="needs-validation" noValidate validated={false}></CForm>
          <CFormLabel className="mt-2">{t('company')}</CFormLabel>
          <p>{formCompanyName}</p>
          <CFormLabel className="mt-2">{t('username')}</CFormLabel>
          <CFormInput
            placeholder={t('username')}
            autoComplete="off"
            name="name"
            aria-describedby="nameValidation"
            feedbackInvalid={formErrors.name}
            invalid={!!formErrors.name}
            value={formValues.name}
            onChange={handleOnChange}
          />
          <CFormLabel className="mt-2">{t('telegram')}</CFormLabel>
          <CFormInput
            placeholder={t('telegram')}
            autoComplete="username"
            name="username"
            aria-describedby="validationUsernameFeedback"
            feedbackInvalid={formErrors.username}
            invalid={!!formErrors.username}
            value={formValues.username}
            onChange={handleOnChange}
          />
          <CFormLabel className="mt-2">Email</CFormLabel>
          <CFormInput
            placeholder="Email"
            autoComplete="email"
            name="email"
            aria-describedby="validationEmailFeedback"
            feedbackInvalid={formErrors.email}
            invalid={!!formErrors.email}
            value={formValues.email ? formValues.email : ''}
            onChange={handleOnChange}
          />
          <CFormLabel className="mt-2">{t('password')}</CFormLabel>
          <CFormInput
            type="password"
            placeholder={t('password')}
            autoComplete="new-password"
            name="password"
            aria-describedby="validationPasswordFeedback"
            feedbackInvalid={formErrors.password}
            invalid={!!formErrors.password}
            onChange={handleOnChange}
          />
          <CFormLabel className="mt-2">{t('roles')}</CFormLabel>
          <CustomSelect
            value={roles}
            options={rolesList}
            name="roles"
            aria-describedby="rolesValidatin"
            feedbackInvalid={formErrors.roles}
            invalid={!!formErrors.roles}
            onChange={handleRolesSelect}
            placeholder={t('roles')}
            virtualScroller
            visibleItems={5}
          />
          <CFormCheck
            id="isEmployeeCheckbox"
            className="mt-2"
            name="is_employee"
            value="1"
            label={t('employee')}
            aria-describedby="isEmployeeValidation"
            feedbackInvalid={formErrors.is_employee}
            invalid={!!formErrors.is_employee}
            checked={!!formValues.is_employee}
            onChange={handelCheckbox}
          />
          <CFormLabel className="mt-2">{t('status')}</CFormLabel>
          <SingleSelect
            options={statuses}
            name="status"
            aria-describedby="statusValidation"
            value={formValues.status}
            feedbackInvalid={formErrors.status}
            invalid={!!formErrors.status}
            onChange={handleStatusSelect}
            placeholder={t('status')}
            cleaner={false}
            virtualScroller
            visibleItems={5}
          />
        </CCardBody>
        <CCardFooter className="p-3">
          <CButton color="cancel" className="px-4-5 rounded-pill" onClick={handleCancel}>
            {t('cancel')}
          </CButton>
          <CButton
            color="confirm"
            className="px-4-5 rounded-pill float-end ml-2"
            onClick={handleSave}
          >
            {t('save')}
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

UserForm.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object,
  companyName: PropTypes.string,
  enums: PropTypes.shape({
    roles: PropTypes.array,
    rolesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    statusList: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeApplications: PropTypes.arrayOf(PropTypes.object).isRequired,
    companyUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default UserForm
