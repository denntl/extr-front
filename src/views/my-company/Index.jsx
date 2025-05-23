import React, { useEffect, useState } from 'react'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import tabs, { TAB_COMPANY } from 'src/views/my-company/partials/tabs'
import {
  CButton,
  CCardBody,
  CCardFooter,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CPopover,
} from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilBriefcase } from '@coreui/icons'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import CoverProvider from 'src/providers/CoverProvider'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import { useAuth } from 'src/providers/AuthProvider'
import {
  PERMISSION_CLIENT_COMPANY_EDIT,
  PERMISSION_CLIENT_COMPANY_INVITE,
  PERMISSION_MY_COMPANY,
} from 'src/enums/permissions'

const formRules = {
  name: [new RequiredRule(), new StringRule(2, 15)],
}

export default function Index() {
  const navigate = useNavigate()
  const { t } = useTranslation('client')
  const { MyCompany, Company } = useApi()
  const auth = useAuth()

  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState({ name: '' })
  const [companyId, setCompanyId] = useState(null)
  const [validationErrors, setValidationErrors] = useState({ name: null })
  const [validationStatus, setValidationStatus] = useState({ name: false })

  useEffect(() => {
    MyCompany.edit()
      .then((response) => {
        setFormValues(response.company)
        setCompanyId(response.companyId)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const validateForm = () => {
    const validation = new Validation(formRules)
    const result = validation.validate(formValues)
    setValidationErrors(result ? {} : validation.errors)

    const validationStatuses = {}
    Object.keys(validation.errors).forEach((key) => {
      validationStatuses[key] = !Boolean(validation.errors[key])
    })

    setValidationStatus(validationStatuses)

    return result
  }

  const handleCancel = () => {
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
      navigate(-1)
    } else {
      navigate('/applications')
    }
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleBlur = () => {
    validateForm()
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return false
    }
    setLoading(true)
    MyCompany.update(formValues)
      .catch((response) => {
        if (response.hasValidationErrors()) {
          setValidationErrors(response.getValidationErrors())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleInvite = () => {
    Company.invite().then(async (response) => {
      await navigator.clipboard.writeText(
        `${window.location.origin}/admin/invite/${response.data.key}`,
      )
    })
  }

  return (
    <PageContainerWithTabs active={TAB_COMPANY} tabs={tabs}>
      <CoverProvider isLoading={loading}>
        <CCardBody>
          <CContainer className="col-lg-4 m-0">
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilBriefcase} />
              </CInputGroupText>
              <CFormInput
                placeholder={t('myCompany_companyName_placeholder')}
                name="name"
                disabled={
                  auth.can(PERMISSION_MY_COMPANY) && !auth.can(PERMISSION_CLIENT_COMPANY_EDIT)
                }
                aria-describedby="validationcompanyNameFeedback"
                feedbackInvalid={validationErrors.name}
                valid={validationStatus.name}
                invalid={!!validationErrors.name}
                onBlur={handleBlur}
                value={formValues.name}
                onChange={handleChange}
              />
            </CInputGroup>
            {auth.can(PERMISSION_CLIENT_COMPANY_INVITE) && (
              <>
                <span className="mr-2">{t('invite_to_company')}</span>
                <CPopover
                  content={t('company_invite_copy_message')}
                  placement="top"
                  trigger="focus"
                >
                  <CButton color="confirm" className="px-4-5 rounded-pill" onClick={handleInvite}>
                    {t('copy')}
                  </CButton>
                </CPopover>
              </>
            )}
          </CContainer>
        </CCardBody>
        {auth.can(PERMISSION_CLIENT_COMPANY_EDIT) && (
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
        )}
      </CoverProvider>
    </PageContainerWithTabs>
  )
}
