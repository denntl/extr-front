import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { getTransactionType } from 'src/views/companies/modal/TransactionModal'
import { useTranslation } from 'react-i18next'
import { ListingContext } from 'src/components/listing/Listing'

const TransactionTypeColumn = ({ row }) => {
  const { settings } = useContext(ListingContext)
  const { t } = useTranslation('company-balance-transactions')

  return (
    <td>
      <span>{getTransactionType(row, settings)}</span>
    </td>
  )
}

TransactionTypeColumn.propTypes = {
  row: PropTypes.shape({
    type: PropTypes.number.isRequired,
    processor_id: PropTypes.number,
  }).isRequired,
}

export default TransactionTypeColumn
