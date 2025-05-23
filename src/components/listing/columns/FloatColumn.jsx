import React from 'react'
import PropTypes from 'prop-types'

const FloatColumn = ({ name, row }) => (
  <td>
    <span>{row[name] ?? ''}</span>
  </td>
)

FloatColumn.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default FloatColumn
