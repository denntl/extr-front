import React from 'react'
import PropTypes from 'prop-types'
import {
  OPERATOR_EQUAL,
  OPERATOR_NOT_EQUAL,
  OPERATOR_CONTAINS,
  OPERATOR_NOT_CONTAINS,
} from 'src/components/listing/constants'
import { CFormInput } from '@coreui/react-pro'

const StringValue = ({ onChange, value = '' }) => {
  const [intValue, setIntValue] = React.useState(value || '')

  const handleBlur = () => {
    onChange(intValue)
  }

  return (
    <div className="mb-2">
      <CFormInput
        placeholder="Value"
        type="string"
        value={intValue}
        onChange={(e) => setIntValue(e.target.value)}
        onBlur={handleBlur}
      />
    </div>
  )
}

StringValue.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  operator: PropTypes.oneOf([
    OPERATOR_EQUAL,
    OPERATOR_NOT_EQUAL,
    OPERATOR_CONTAINS,
    OPERATOR_NOT_CONTAINS,
  ]).isRequired,
}

export default StringValue
