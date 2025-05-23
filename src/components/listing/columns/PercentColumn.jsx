import React from 'react'
import PropTypes from 'prop-types'

const PercentColumn = ({ name, row }) => {
  let value = row[name] ?? ''
  if (value !== '') {
    value = (parseFloat(value) * 100).toFixed(2) + ' %'
  }
  return (
    <td>
      <span>{value}</span>
    </td>
  )
}

PercentColumn.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default PercentColumn
