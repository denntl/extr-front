import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns-tz'

const DateTimeColumn = ({ name, row }) => (
  <td>
    <span>
      {row[name]
        ? format(row[name], 'dd.MM.yyyy HH:mm:ss', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        : '–'}
    </span>
  </td>
)

DateTimeColumn.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
}

export default DateTimeColumn
