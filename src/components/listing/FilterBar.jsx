import React, { useEffect, useMemo, useState } from 'react'
import FilterWrap from 'src/components/listing/filters/FilterWrap'
import PropTypes from 'prop-types'

export default function FilterBar({ filters, onFilterChange, columns }) {
  const [activeFilters, setActiveFilters] = useState(filters ?? {})

  useEffect(() => {
    onFilterChange(activeFilters)
  }, [activeFilters])

  useEffect(() => {
    if (filters?.length !== 0) {
      setActiveFilters(filters)
    }
  }, [filters])

  const columnsAsObject = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.name] = column
      return acc
    }, {})
  }, [columns])

  const allPossibleFilters = useMemo(
    () => columns.map((item) => ({ value: item.name, label: item.label })),
    [columns],
  )
  const listAvailableFilters = useMemo(
    () =>
      Object.keys(columnsAsObject).filter((filterColumnName) => !activeFilters[filterColumnName]),
    [activeFilters, columnsAsObject],
  )
  const handleFilterChange = (name, filter) => {
    if (!filter) {
      const { [name]: _, ...rest } = activeFilters
      setActiveFilters(rest)
      return
    }
    setActiveFilters({ ...activeFilters, [name]: filter })
  }

  return (
    <div className="mb-2">
      {Object.entries(activeFilters).map(([name, filter]) => (
        <FilterWrap
          key={name}
          filter={filter}
          onChange={handleFilterChange}
          columns={columnsAsObject}
          allColumns={columns}
          possibleFilters={allPossibleFilters}
          listAvailableFilters={listAvailableFilters}
        />
      ))}
      {listAvailableFilters.length > 0 && (
        <FilterWrap
          key="add-bew-button"
          isAddingNew
          onChange={handleFilterChange}
          columns={columnsAsObject}
          allColumns={columns}
          possibleFilters={allPossibleFilters}
          listAvailableFilters={listAvailableFilters}
        />
      )}
    </div>
  )
}

FilterBar.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      filterOperators: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
}
