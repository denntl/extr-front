import React from 'react'
import PropTypes from 'prop-types'
import {
  COLUMN_TYPE_STRING,
  COLUMN_TYPE_INT,
  COLUMN_TYPE_FLOAT,
  COLUMN_TYPE_DATE,
  COLUMN_TYPE_LIST,
  COLUMN_TYPE_ARRAY_LIST,
  COLUMN_TYPE_PERCENT,
  COLUMN_TYPE_DATETIME,
} from 'src/components/listing/constants'
import IntValue from 'src/components/listing/filters/Values/IntValue'
import StringValue from 'src/components/listing/filters/Values/StringValue'
import DateValue from 'src/components/listing/filters/Values/DateValue'
import DateTimeValue from 'src/components/listing/filters/Values/DateTimeValue'
import ListValue from 'src/components/listing/filters/Values/ListValue'
import FloatValue from 'src/components/listing/filters/Values/FloatValue'

const FilterValueWrap = ({ column, onChange, value, operator }) => {
  switch (column.type) {
    case COLUMN_TYPE_STRING:
      return <StringValue onChange={onChange} value={value} operator={operator} column={column} />
    case COLUMN_TYPE_INT:
    case COLUMN_TYPE_PERCENT:
      return <IntValue onChange={onChange} value={value} operator={operator} column={column} />
    case COLUMN_TYPE_FLOAT:
      return <FloatValue onChange={onChange} value={value} operator={operator} column={column} />
    case COLUMN_TYPE_DATE:
      return <DateValue onChange={onChange} value={value} operator={operator} column={column} />
    case COLUMN_TYPE_DATETIME:
      return <DateTimeValue onChange={onChange} value={value} operator={operator} column={column} />
    case COLUMN_TYPE_LIST:
    case COLUMN_TYPE_ARRAY_LIST:
      return <ListValue onChange={onChange} value={value} column={column} />
    default:
      return null
  }
}

FilterValueWrap.propTypes = {
  column: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  operator: PropTypes.string.isRequired,
}

export default FilterValueWrap
