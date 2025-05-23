import React, { useEffect, useState, useCallback } from 'react'
import useApi from 'src/hooks/useApi'
import {
  CButton,
  CCardBody,
  CCardFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import { useNavigate, useParams } from 'react-router-dom'
import CustomSelect from 'src/components/custom/CustomSelect'
import PageContainerWithTabs from 'src/components/custom/PageContainerWithTabs'
import CompanyTabs, { TAB_MANUAL_BALANCE_DEPOSIT } from 'src/views/companies/partials/CompanyTabs'
import CoverProvider from 'src/providers/CoverProvider'
import { useNotificationPopup } from 'src/providers/NotificationPopupProvider'
import { NumberRule } from 'src/services/validation/rules/NumberRule'
import { useTranslation } from 'react-i18next'

const defaultValues = {
  amount: 0,
  balanceType: 2,
  comment: '',
}

const ManualBalanceDeposit = () => {
  const { t } = useTranslation('companies')
  const { Company } = useApi()
  const { companyId } = useParams()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formValues, setFormValues] = useState(defaultValues)
  const [depositButtonDisabled, setDepositButtonDisabled] = useState(true)
  const popup = useNotificationPopup()

  const minAmount = 0.01
  const maxAmount = 1000

  const balanceTypes = [
    { value: 2, label: t('balance_bonus') },
    { value: 1, label: t('balance_main') },
  ]

  const validationRules = {
    amount: [new RequiredRule(), new NumberRule(minAmount, maxAmount)],
    balanceType: [
      new RequiredRule(),
      {
        isValid: (value) => balanceTypes.some((type) => type.value === value),
      },
    ],
    comment: [new RequiredRule(), new StringRule(0, 255)],
  }
  const validation = new Validation(validationRules)

  const handleCommentChange = ({ target: { name, value } }) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }
  const handlePriceChange = ({ target: { name, value } }) => {
    if (value !== '') {
      let numericValue = parseFloat(value)
      if (!isNaN(numericValue)) {
        value = parseFloat(numericValue.toFixed(2))
      }
    }
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (selected, name) => {
    setFormValues((prev) => ({ ...prev, [name]: selected }))
  }

  useEffect(() => {
    setDepositButtonDisabled(!validation.validate(formValues))
  }, [formValues])

  const validateForm = useCallback(
    (key = null) => {
      setErrors({})
      if (!validation.validate(key ? { [key]: formValues[key] } : formValues)) {
        setErrors(validation.errors)
        return false
      }
      return true
    },
    [formValues, popup],
  )

  const handleSave = () => {
    if (!validateForm()) {
      popup.pushPopup(t('deposit_error'))
      return
    }
    setLoading(true)
    Company.manualBalanceDeposit(companyId, formValues).then((response) => {
      if (response.hasValidationErrors()) {
        setErrors(response.getValidationErrors())
      }
      setLoading(false)
      popup.pushPopup(t('deposit_success'))
    })
  }

  const handleBlur = ({ target: { name } }) => {
    validateForm(name)
  }

  return (
    <PageContainerWithTabs active={TAB_MANUAL_BALANCE_DEPOSIT} {...CompanyTabs({ companyId })}>
      <CoverProvider isLoading={loading}>
        <CCardBody>
          <CForm noValidate>
            <div className="row">
              <div className="col-3">
                <CFormLabel>{t('amount')}</CFormLabel>
                <CFormInput
                  placeholder={t('amount')}
                  autoComplete="off"
                  onBlur={handleBlur}
                  name="amount"
                  type="number"
                  feedbackInvalid={errors.amount}
                  invalid={!!errors.amount}
                  value={formValues.amount}
                  onChange={handlePriceChange}
                  min={minAmount}
                  max={maxAmount}
                  step="1"
                />
              </div>
              <div className="col-3">
                <CFormLabel>{t('balance_type')}</CFormLabel>
                <CustomSelect
                  name="balanceType"
                  options={balanceTypes}
                  optionsStyle="text"
                  multiple={false}
                  onChange={(selected) => handleSelectChange(selected, 'balanceType')}
                  value={[formValues.balanceType]}
                  cleaner={false}
                />
              </div>
              <div className="col-3 d-flex align-items-end">
                <CButton color="success" onClick={handleSave} disabled={depositButtonDisabled}>
                  {t('deposit_button')}
                </CButton>
              </div>
            </div>

            <div className="col-2 mt-3 d-flex justify-content-between">
              {[50, 100, 200, 500, 1000].map((sum) => (
                <div
                  className={'cursor-pointer'}
                  key={sum}
                  onClick={() => setFormValues((prev) => ({ ...prev, amount: sum }))}
                >
                  {sum}
                </div>
              ))}
            </div>

            <div className="col-11 mt-5">
              <CFormLabel>{t('deposit_comment')}</CFormLabel>
              <CFormTextarea
                name="comment"
                onBlur={handleBlur}
                feedbackInvalid={errors.comment}
                invalid={!!errors.comment}
                value={formValues.comment}
                onChange={handleCommentChange}
                rows={5}
              />
            </div>
          </CForm>
        </CCardBody>
        <CCardFooter />
      </CoverProvider>
    </PageContainerWithTabs>
  )
}

export default ManualBalanceDeposit
