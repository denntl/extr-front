import React, { useMemo, useState } from 'react'
import AutoClosePopover from 'src/components/custom/AutoClosePopover'
import FilterBody from 'src/components/listing/filters/FilterBody'
import FilterToggle from 'src/components/listing/filters/FilterToggle'
import PropTypes from 'prop-types'
import { OPERATOR_EMPTY, OPERATOR_NOT_EMPTY } from 'src/components/listing/constants'

export default function FilterWrap({
  isAddingNew = false,
  columns = {},
  filter = {},
  onChange,
  possibleFilters = [],
  listAvailableFilters = [],
}) {
  const [tempFilter, setTempFilter] = useState(filter)

  const column = useMemo(
    () => (tempFilter.name ? columns[tempFilter.name] : {}),
    [tempFilter.name, columns],
  )

  const availableColumnOptions = useMemo(
    () =>
      possibleFilters.filter(
        (item) => listAvailableFilters.includes(item.value) || item.value === column.name,
      ),
    [possibleFilters, listAvailableFilters],
  )

  const handleFilterChange = (value) => {
    setTempFilter(value)
  }
  const handleClear = () => {
    onChange(column.name, null)
  }

  const handleHidePopover = () => {
    if (!tempFilter.name) {
      return
    }

    if (
      tempFilter.name &&
      tempFilter.operator &&
      (tempFilter.value || [OPERATOR_EMPTY, OPERATOR_NOT_EMPTY].includes(tempFilter.operator))
    ) {
      onChange(tempFilter.name, tempFilter)
      if (isAddingNew) {
        setTempFilter({})
      }
    } else {
      onChange(column.name, null)
      setTempFilter({})
    }
  }

  return (
    <AutoClosePopover
      onHide={handleHidePopover}
      content={
        <FilterBody
          isAddingNew={isAddingNew}
          filter={tempFilter}
          column={column}
          onChange={handleFilterChange}
          columns={availableColumnOptions}
        />
      }
      showComponent
    >
      <FilterToggle
        name={column?.label}
        operator={filter?.operator}
        value={filter?.value}
        onClear={handleClear}
        column={column}
      />
    </AutoClosePopover>
  )
}

FilterWrap.propTypes = {
  isAddingNew: PropTypes.bool,
  columns: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      filterOperators: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  filter: PropTypes.shape({
    name: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
    ]),
  }),
  onChange: PropTypes.func.isRequired,
  possibleFilters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  listAvailableFilters: PropTypes.arrayOf(PropTypes.string),
}
