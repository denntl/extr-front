import React from 'react'
import PropTypes from 'prop-types'
import {
  OPERATOR_EQUAL,
  OPERATOR_NOT_EQUAL,
  OPERATOR_GREATER_THAN_OR_EQUAL,
  OPERATOR_LESS_THAN_OR_EQUAL,
  OPERATOR_BETWEEN,
} from 'src/components/listing/constants'
import { CFormInput } from '@coreui/react-pro'

const IntValue = ({ column, onChange, value = '', operator }) => {
  const [intValue, setIntValue] = React.useState(value || '')
  const [rangeValue, setRangeValue] = React.useState(
    value && Array.isArray(value) ? [...value] : [],
  )

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    setIntValue(newValue)
  }

  const handleChangeBetween = (index, v) => {
    const newValue = [...rangeValue]

    if (newValue.length === 0) {
      // set first value
      newValue[index] = v
      setRangeValue(newValue)
      return
    }

    newValue[index] = v

    if (newValue[0] === '' || newValue[1] === '' || newValue[0] <= newValue[1]) {
      setRangeValue(newValue)
    }
  }

  const handleBlurSingle = () => {
    onChange(intValue)
  }

  const handleBlurRange = () => {
    if (rangeValue[0] === '' || rangeValue[1] === '') {
      onChange(null)
    } else if (rangeValue.length === 2 && rangeValue[0] <= rangeValue[1]) {
      onChange(rangeValue)
    }
  }

  switch (operator) {
    case OPERATOR_EQUAL:
    case OPERATOR_NOT_EQUAL:
    case OPERATOR_GREATER_THAN_OR_EQUAL:
    case OPERATOR_LESS_THAN_OR_EQUAL:
      return (
        <div className="mb-2">
          <CFormInput
            placeholder="Value"
            type="number"
            step={column.step}
            value={intValue}
            onChange={handleChange}
            onBlur={handleBlurSingle}
          />
        </div>
      )
    case OPERATOR_BETWEEN:
      return (
        <>
          <div className="mb-2">
            <CFormInput
              type="number"
              step={column.step}
              placeholder="From"
              value={rangeValue[0] ?? ''}
              onChange={(e) =>
                handleChangeBetween(0, e.target.value ? parseInt(e.target.value) : '')
              }
              onBlur={handleBlurRange}
            />
          </div>
          <div className="mb-2">
            <CFormInput
              type="number"
              step={column.step}
              placeholder="To"
              value={rangeValue[1] ?? ''}
              onChange={(e) =>
                handleChangeBetween(1, e.target.value ? parseInt(e.target.value) : '')
              }
              onBlur={handleBlurRange}
            />
          </div>
        </>
      )
    default:
      return null
  }
}

IntValue.propTypes = {
  column: PropTypes.object.isRequired,
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

export default IntValue
