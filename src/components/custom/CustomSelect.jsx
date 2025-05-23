import React, { useMemo } from 'react'
import { CMultiSelect } from '@coreui/react-pro'
import PropTypes from 'prop-types'

const CustomSelect = ({ options, onChange, value = [], multiple = true, ...rest }) => {
  const memoOptions = multiple
    ? useMemo(
        () =>
          options.map((option) => ({
            ...option,
            selected: value.includes(option.value),
          })),
        [options, value],
      )
    : useMemo(() => {
        return options.map((option) => ({
          ...option,
          selected: value.includes(option.value),
        }))
      }, [options])

  const memoValues = useMemo(
    () =>
      options.filter((option) => {
        return value.includes(option.value)
      }),
    [options, value],
  )

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    if (multiple) {
      onChange(selectedValues, rest.name ?? null)
    } else {
      onChange(selectedValues.length > 0 ? selectedValues[0] : null, rest.name ?? null)
    }
  }

  return (
    <CMultiSelect
      options={memoOptions}
      value={memoValues}
      onChange={handleChange}
      multiple={multiple}
      {...rest}
    />
  )
}

CustomSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default CustomSelect
