import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  OPERATOR_EQUAL,
  OPERATOR_NOT_EQUAL,
  OPERATOR_GREATER_THAN_OR_EQUAL,
  OPERATOR_LESS_THAN_OR_EQUAL,
  OPERATOR_BETWEEN,
} from 'src/components/listing/constants'
import { CDatePicker, CDateRangePicker } from '@coreui/react-pro'
import { format } from 'date-fns-tz'

const DateValue = ({ onChange, value = '', operator }) => {
  const [dateValue, setDateValue] = useState(value && typeof value === 'string' ? value : '')
  const [rangeValue, setRangeValue] = useState(value && Array.isArray(value) ? [...value] : [])

  useEffect(() => {
    if (!Array.isArray(rangeValue)) {
      return
    }
    if (rangeValue[0] && rangeValue[1]) {
      onChange(rangeValue)
    } else {
      onChange(null)
    }
  }, [rangeValue])

  const handleDateChange = (date) => {
    if (!date) {
      onChange(null)
      return
    }
    const formattedDate = format(new Date(date), 'yyyy-MM-dd', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    onChange(formattedDate)
  }

  const handleRangeChange = (index, d) => {
    const newRangeValue = [...rangeValue]
    newRangeValue[index] = !d
      ? ''
      : format(new Date(d), 'yyyy-MM-dd', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
    setRangeValue(newRangeValue)
  }

  switch (operator) {
    case OPERATOR_EQUAL:
    case OPERATOR_NOT_EQUAL:
    case OPERATOR_GREATER_THAN_OR_EQUAL:
    case OPERATOR_LESS_THAN_OR_EQUAL:
      return (
        <div className="mb-2">
          <CDatePicker
            portal={false}
            date={dateValue}
            placeholder="Value"
            locale="ru"
            onDateChange={handleDateChange}
          />
        </div>
      )
    case OPERATOR_BETWEEN:
      return (
        <div className="mb-2">
          <CDateRangePicker
            locale="ru"
            onStartDateChange={(v) => handleRangeChange(0, v)}
            onEndDateChange={(v) => handleRangeChange(1, v)}
            startDate={rangeValue && rangeValue[0] ? rangeValue[0] : ''}
            endDate={rangeValue && rangeValue[1] ? rangeValue[1] : ''}
            cleaner={false}
            indicator={false}
          />
        </div>
      )
    default:
      return null
  }
}

DateValue.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  operator: PropTypes.oneOf([
    OPERATOR_EQUAL,
    OPERATOR_NOT_EQUAL,
    OPERATOR_GREATER_THAN_OR_EQUAL,
    OPERATOR_LESS_THAN_OR_EQUAL,
    OPERATOR_BETWEEN,
  ]).isRequired,
}

export default DateValue
