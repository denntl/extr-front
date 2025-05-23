import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from 'src/components/custom/CustomSelect'
import './ListValue.scss'

const ListValue = ({ onChange, value = [], column }) => {
  return (
    <div className="mb-2">
      <CustomSelect
        className="filter-list-value"
        value={value ?? []}
        onChange={onChange}
        options={column.list ?? []}
        optionsMaxHeight="13rem"
      />
    </div>
  )
}

ListValue.propTypes = {
  column: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
}

export default ListValue
