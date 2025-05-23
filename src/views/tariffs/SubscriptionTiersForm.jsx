import React, { useEffect, useState, useCallback } from 'react'
import CustomSelect from 'src/components/custom/CustomSelect'
import { useTranslation } from 'react-i18next'
import TiersForm from 'src/components/tariffForm/TiersForm'
import PropTypes from 'prop-types'
import { CButton, CFormInput, CFormLabel, CFormSwitch, CInputGroup } from '@coreui/react-pro'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { NumberRule } from 'src/services/validation/rules/NumberRule'
import { Validation } from 'src/services/validation/Validation'
import { TARIFF_TYPE_SUBSCRIPTION_TIERS } from 'src/enums/tariff-types'
import { StringRule } from 'src/services/validation/rules/StringRule'

export const defaultValues = {
  amount: 0,
  name: '',
  status: 1,
  companyIds: [],
}

const defaultErrors = {
  amount: null,
  name: null,
}

const minAmount = 1
const maxAmount = 1000000

const validationRules = {
  amount: [new RequiredRule(), new NumberRule(minAmount, maxAmount)],
  name: [new RequiredRule(), new StringRule(3, 255)],
}

const SubscriptionTiersEdit = ({
  updateDenied,
  handleSave,
  handleCancel,
  values,
  tariffTypeList,
}) => {
  const { t } = useTranslation('tariff')
  const [formErrors, setFormErrors] = useState(defaultErrors)
  const [formValues, setFormValues] = useState(defaultValues)
  const [tiersData, setTiersData] = useState({})
  const [formCompanies, setFormCompanies] = useState(null)

  useEffect(() => {
    if (values === null) {
      return
    }
    setFormValues({ ...values?.tariff, companyIds: values?.companyIds })
    setFormCompanies(values?.companies)
    setTiersData(values)
  }, [values])

  const handlePriceChange = ({ target: { name, value } }) => {
    if (value !== '') {
      let numericValue = parseFloat(value)
      if (!isNaN(numericValue)) {
        value = parseFloat(numericValue.toFixed(2))
      }
    }
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSave = () => {
    const validationResult = validateForm()
    if (!validationResult) {
      return
    }
    handleSave({ tariff: formValues, tiers: tiersData.tiers })
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

  const handleTiersChanged = useCallback((data) => {
    setTiersData(data)
  }, [])

  const handleNameChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSwitchChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.checked ? 1 : 0 }))
  }
  const handleCompaniesChange = (selected) => {
    setFormValues((prev) => ({ ...prev, companyIds: selected }))
  }

  return (
    formCompanies && (
      <>
        <div className="mt-3 d-flex justify-content-end">
          <div className="d-flex">
            <span className="ml-2 mt-2 mr-2">{t('tariffs_subscription_formActive')}</span>
            <CInputGroup>
              <CFormSwitch
                size="xl"
                className="mt-1 form-switch-wide"
                name="status"
                checked={!!formValues.status}
                onChange={handleSwitchChange}
              />
            </CInputGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <CFormLabel className="mt-2">{t('label_type')}</CFormLabel>
            <CustomSelect
              name="tariff_type"
              options={tariffTypeList}
              multiple={false}
              value={[TARIFF_TYPE_SUBSCRIPTION_TIERS]}
              cleaner={false}
              disabled={true}
              onChange={() => {}}
            />
          </div>
          <div className="col-6">
            <CFormLabel className="mt-2">{t('label_amount')}</CFormLabel>
            <CFormInput
              name="amount"
              type="number"
              aria-describedby="amountValidation"
              feedbackInvalid={formErrors.amount}
              invalid={!!formErrors.amount}
              value={formValues.amount}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <CFormLabel className="mt-2">{t('label_name')}</CFormLabel>
            <CFormInput
              name="name"
              aria-describedby="nameValidation"
              feedbackInvalid={formErrors.name}
              invalid={!!formErrors.name}
              value={formValues.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="col-6">
            <CFormLabel className="mt-2">{t('label_companies')}</CFormLabel>
            <CustomSelect
              name="companyIds"
              options={formCompanies}
              multiple={true}
              value={formValues.companyIds}
              onChange={handleCompaniesChange}
              optionsStyle="text"
            />
          </div>
        </div>
        <TiersForm
          tariffData={tiersData}
          updateDenied={updateDenied}
          handleSave={handleTiersChanged}
        />
        <div className={'mt-4 d-flex justify-content-center'}>
          <CButton color="cancel" className="px-4-5 rounded-pill mr-4" onClick={handleCancel}>
            {t('tariffs_subscription_formCancelButton')}
          </CButton>
          <CButton
            color="confirm"
            className="px-4-5 rounded-pill float-end ml-10"
            onClick={handleFormSave}
          >
            {t('tariffs_subscription_formSaveButton')}
          </CButton>
        </div>
      </>
    )
  )
}

SubscriptionTiersEdit.propTypes = {
  updateDenied: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  values: PropTypes.shape({
    tariff: PropTypes.object,
    companyIds: PropTypes.array,
    companies: PropTypes.array,
  }),
  tariffTypeList: PropTypes.array.isRequired,
}

export default SubscriptionTiersEdit
