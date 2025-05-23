import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment-timezone'

const SingleTimeColumn = ({ row }) => {
  let dateTime = moment.tz(row.send_time, 'UTC')
  dateTime.tz(moment.tz.guess())
  return (
    <td>
      <span>{dateTime.format('YYYY-MM-DD HH:mm')}</span>
    </td>
  )
}

SingleTimeColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    send_time: PropTypes.string.isRequired,
  }).isRequired,
  onRefreshListingData: PropTypes.func,
}

export default SingleTimeColumn
