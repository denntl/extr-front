import React from 'react'
import PropTypes from 'prop-types'

const List = ({ name, row }) => (
  <td>
    <span>{row[name] ?? ''}</span>
  </td>
)

List.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default List
