import {
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ListingContext } from 'src/components/listing/Listing'
import { useTranslation } from 'react-i18next'

export const getTransactionType = (row, settings) => {
  if (settings) {
    const { balance_transaction_types } = settings.data.listItems
    return (
      balance_transaction_types.find((item) => item.value === row.type)?.label || 'Unknown type'
    )
  }

  return 'Unknown type'
}

const TransactionModal = ({ handleCloseModal, row }) => {
  const { settings } = useContext(ListingContext)
  const { t } = useTranslation('company-balance-transactions')

  if (!settings) return null

  const { balance_transaction_statuses, balance_types, users, payment_processor_types } =
    settings.data.listItems

  const getLabelById = (list = [], id) => list.find((item) => item.value === id)?.label || ''

  return (
    <CModal
      className={'align-content-md-center'}
      visible={true}
      onClose={handleCloseModal}
      backdrop="static"
      size="xl"
    >
      <CModalHeader>
        <CModalTitle>{t('header_label')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row mt-4">
          <div className="col-3">
            <CFormLabel>{t('date')}</CFormLabel>
            <CFormInput type="text" disabled value={row.created_at} />
          </div>

          <div className="col-3">
            <CFormLabel>{t('amount')}</CFormLabel>
            <CFormInput type="text" disabled value={row.amount} />
          </div>
          <div className="col-3">
            <CFormLabel>{t('status')}</CFormLabel>
            <CFormInput
              type="text"
              disabled
              value={getLabelById(balance_transaction_statuses, row.status)}
            />
          </div>
          <div className="col-3">
            <CFormLabel>{t('balance')}</CFormLabel>
            <CFormInput type="text" disabled value={row.balance_after} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-3">
            <CFormLabel>{t('balance_type')}</CFormLabel>
            <CFormInput
              type="text"
              disabled
              value={getLabelById(balance_types, row.balance_type)}
            />
          </div>
          <div className="col-3">
            <CFormLabel>{t('operation_type')}</CFormLabel>
            <CFormInput type="text" disabled value={getTransactionType(row, settings)} />
          </div>
          <div className="col-3">
            <CFormLabel>{t('provider')}</CFormLabel>
            <CFormInput
              type="text"
              disabled
              value={getLabelById(payment_processor_types, row.processor_id)}
            />
          </div>
          <div className="col-3">
            <CFormLabel>{t('operator')}</CFormLabel>
            <CFormInput type="text" disabled value={getLabelById(users, row.user_id) || 'System'} />
          </div>
        </div>

        {row.application_name && (
          <div className="row mt-4">
            <div className="col-12">
              <CFormLabel>{t('application')}</CFormLabel>
              <CFormInput name="text" value={row.application_name} disabled />
            </div>
          </div>
        )}

        {row.comment && (
          <div className="row mt-4">
            <div className="col-12">
              <CFormLabel>{t('comment')}</CFormLabel>
              <CFormTextarea name="text" value={row.comment} disabled />
            </div>
          </div>
        )}
      </CModalBody>
    </CModal>
  )
}

TransactionModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  row: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    balance_after: PropTypes.number.isRequired,
    balance_type: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    user_id: PropTypes.number,
    comment: PropTypes.string,
    processor_id: PropTypes.number,
    application_name: PropTypes.string,
  }).isRequired,
}

export default TransactionModal
