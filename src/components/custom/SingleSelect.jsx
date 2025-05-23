import React, { useEffect, useState } from 'react'
import { CMultiSelect } from '@coreui/react-pro'
import PropTypes from 'prop-types'

const SingleSelect = ({ name, options, onChange, value, disabled = false, ...rest }) => {
  // const [_disabled, setDisabled] = useState()
  const [selected, setSelected] = useState()
  const [_options, setOptions] = useState([])

  useEffect(() => {
    setSelected(value)
  }, [value])

  useEffect(() => {
    setOptions(
      options.map((option) => {
        return { ...option, selected: selected === option.value }
      }),
    )
  }, [selected, options])
  const handleChange = (selected) => {
    const _selected = selected.map((option) => option.value)
    setSelected(_selected[0])
    if (onChange) {
      onChange(_selected[0], name)
    }
  }

  return (
    <CMultiSelect
      disabled={disabled}
      multiple={false}
      options={_options}
      name={name}
      onChange={handleChange}
      optionsStyle="text"
      {...rest}
    />
  )
}

SingleSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
}
export default SingleSelect
