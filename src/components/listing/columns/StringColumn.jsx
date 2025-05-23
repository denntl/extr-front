import React from 'react'
import PropTypes from 'prop-types'

const StringColumn = ({ name, row }) => (
  <td>
    <span>{row[name] ?? ''}</span>
  </td>
)

StringColumn.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default StringColumn
