import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CInputGroup,
  CPopover,
} from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import PropTypes from 'prop-types'

const defaultValues = {
  token: '',
  is_active: false,
}

const defaultErrors = {
  token: null,
  is_active: null,
}

const validationRules = {
  token: [new RequiredRule(), new StringRule(0, 255)],
}

const TelegramBotForm = ({ values, errors, onActive, onSave, onCancel }) => {
  const { t } = useTranslation('client')
  const ConfirmModal = useConfirmModal()

  const [formErrors, setErrors] = useState(defaultErrors)
  const [formValues, setValues] = useState(defaultValues)

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

  const handleOnActiveChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.checked }))
    setErrors(defaultErrors)
    onActive(target.checked)
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
    ConfirmModal.initAndOpen({
      message: 'Вы уверены?',
      confirmCallback: () => {
        onSave(formValues)
      },
    })
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <>
      <CCard>
        <CCardHeader>Редактирование телеграмм бота</CCardHeader>
        <CCardBody>
          <CForm
            className="needs-validation"
            noValidate
            validated={false}
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="float-end">
              <CInputGroup>
                <div>
                  <CFormSwitch
                    size="xl"
                    className="mt-1 float-end"
                    style={{ width: '50px' }}
                    name="is_active"
                    checked={formValues.is_active}
                    invalid={Boolean(formErrors.is_active)}
                    onChange={handleOnActiveChange}
                  ></CFormSwitch>
                  <CFormFeedback invalid={formErrors.is_active} id="isActiveValidation">
                    {formErrors.is_active}
                  </CFormFeedback>
                </div>
                <span className="ml-2 mt-2">{t('tg_bot_form_is_active')}</span>
              </CInputGroup>
            </div>
            <CFormLabel className="mt-2">{t('tg_bot_form_token')}</CFormLabel>
            <CFormInput
              placeholder={t('tg_bot_form_token')}
              autoComplete="off"
              name="token"
              aria-describedby="tokenValidation"
              feedbackInvalid={formErrors.token}
              invalid={!!formErrors.token}
              value={formValues.token}
              onChange={handleOnChange}
              disabled={formValues.is_active}
            />
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton color="cancel" className="px-4-5 rounded-pill" onClick={handleCancel}>
            {t('myCompany_companyName_formCancelButton')}
          </CButton>
          <CPopover
            content="Отключите бота, чтобы редактировать его параметры."
            placement="top"
            trigger={!formValues.is_active ? [] : ['hover', 'focus']}
          >
            <span className="float-end ml-2">
              <CButton
                color="confirm"
                className="px-4-5 rounded-pill float-end ml-2"
                onClick={handleSave}
                disabled={formValues.is_active}
              >
                {t('myCompany_companyName_formSaveButton')}
              </CButton>
            </span>
          </CPopover>
        </CCardFooter>
      </CCard>
    </>
  )
}

TelegramBotForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onActive: PropTypes.func.isRequired,
}
export default TelegramBotForm
