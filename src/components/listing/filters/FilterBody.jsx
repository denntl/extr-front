import React, { useMemo } from 'react'
import { CCard, CCardBody } from '@coreui/react-pro'
import CustomSelect from 'src/components/custom/CustomSelect'
import FilterValueWrap from 'src/components/listing/filters/FilterValueWrap'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

export default function FilterBody({ isAddingNew, filter, onChange, columns, column }) {
  const { t } = useTranslation('listing')

  const operatorOptions = useMemo(
    () =>
      column?.filterOperators
        ? column.filterOperators.map((item) => ({ value: item, label: t(item) }))
        : [],
    [column],
  )

  const handleSelectName = (value) => {
    onChange({ name: value, operator: null, value: null })
  }

  const handleSelectOperator = (value) => {
    onChange({ ...filter, operator: value, value: value === filter.operator ? filter.value : null })
  }

  const handleChangeValue = (value) => {
    onChange({ ...filter, value })
  }

  return (
    <CCard style={{ width: '18rem' }}>
      <CCardBody>
        {Boolean(isAddingNew) && (
          <div className="mb-2">
            <CustomSelect
              options={columns}
              multiple={false}
              placeholder="Column"
              onChange={handleSelectName}
              value={filter?.name ? [filter?.name] : []}
              optionsStyle={'text'}
              cleaner={false}
            />
          </div>
        )}
        <div className="mb-2">
          <CustomSelect
            options={operatorOptions}
            multiple={false}
            placeholder="Operator"
            onChange={handleSelectOperator}
            value={filter?.operator ? [filter?.operator] : []}
            optionsStyle={'text'}
            cleaner={false}
          />
        </div>
        {Boolean(filter?.operator) && (
          <FilterValueWrap
            column={column}
            onChange={handleChangeValue}
            operator={filter.operator}
            value={filter.value}
          />
        )}
      </CCardBody>
    </CCard>
  )
}

FilterBody.propTypes = {
  isAddingNew: PropTypes.bool,
  filter: PropTypes.shape({
    name: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.any,
  }),
  onChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  column: PropTypes.shape({
    filterOperators: PropTypes.arrayOf(PropTypes.string),
  }),
}
