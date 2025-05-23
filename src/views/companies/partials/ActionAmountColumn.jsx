import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ActionAmountColumn = ({ row }) => {
  const amount = parseFloat(row.amount)
  const isPositive = amount > 0

  return (
    <td className={classNames({ 'text-success': isPositive, 'text-danger': !isPositive })}>
      <span>{isPositive ? `+${amount}` : amount}$</span>
    </td>
  )
}

ActionAmountColumn.propTypes = {
  row: PropTypes.shape({
    amount: PropTypes.number.isRequired,
  }).isRequired,
}

export default ActionAmountColumn
