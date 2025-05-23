import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment-timezone'

const RegularTimeColumn = ({ row }) => {
  let dateTime = moment.tz(moment().format('YYYY-MM-DD') + ' ' + row.send_time, 'UTC')
  dateTime.tz(moment.tz.guess())
  return (
    <td>
      <span>{dateTime.format('HH:mm')}</span>
    </td>
  )
}

RegularTimeColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    send_time: PropTypes.string.isRequired,
  }).isRequired,
  onRefreshListingData: PropTypes.func,
}

export default RegularTimeColumn
