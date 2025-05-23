import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns-tz'

const DateColumn = ({ name, row }) => (
  <td>
    <span>
      {row[name]
        ? format(row[name], 'dd.MM.yyyy', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        : '–'}
    </span>
  </td>
)

DateColumn.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default DateColumn
