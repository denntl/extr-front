import React from 'react'
import PropTypes from 'prop-types'

const ListColumn = ({ column: { name, list }, row }) => {
  if (!list) {
    return (
      <td>
        <span>{row[name] ?? ''}</span>
      </td>
    )
  }

  const value = Array.isArray(row[name]) ? row[name] : [row[name]]

  return (
    <td>
      <span>
        {value
          .map((item) => {
            const listItem = list.find((listItem) => listItem.value === item)
            return listItem ? listItem.label : row[name]
          })
          .join(', ')}
      </span>
    </td>
  )
}

ListColumn.propTypes = {
  column: PropTypes.shape({
    name: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  row: PropTypes.object.isRequired,
}

export default ListColumn
