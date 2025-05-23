import React from 'react'
import PropTypes from 'prop-types'

const IntColumn = ({ name, row }) => (
  <td>
    <span>{row[name] ?? ''}</span>
  </td>
)

IntColumn.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default IntColumn
