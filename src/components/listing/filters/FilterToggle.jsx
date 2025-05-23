import React, { forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { CButton, CButtonGroup } from '@coreui/react-pro'

import './FilterToggle.scss'
import {
  OPERATOR_BETWEEN,
  OPERATOR_CONTAINS,
  OPERATOR_EMPTY,
  OPERATOR_EQUAL,
  OPERATOR_GREATER_THAN_OR_EQUAL,
  OPERATOR_IN,
  OPERATOR_LESS_THAN_OR_EQUAL,
  OPERATOR_NOT_CONTAINS,
  OPERATOR_NOT_EMPTY,
  OPERATOR_NOT_EQUAL,
  OPERATOR_NOT_IN,
} from 'src/components/listing/constants'

const FilterToggle = forwardRef(
  (
    {
      onClick = () => {},
      onClear = () => {},
      name = null,
      operator = null,
      value = null,
      column = {},
    },
    ref,
  ) => {
    const label = useMemo(() => {
      if (
        !Boolean(name) ||
        !Boolean(operator) ||
        (!Boolean(value) && ![OPERATOR_EMPTY, OPERATOR_NOT_EMPTY].includes(operator))
      ) {
        return 'Добавить фильтр'
      }

      switch (operator) {
        case OPERATOR_EQUAL:
          return `${name} равно "${value}"`
        case OPERATOR_NOT_EQUAL:
          return `${name} не равно "${value}"`
        case OPERATOR_GREATER_THAN_OR_EQUAL:
          return `${name} больше "${value}"`
        case OPERATOR_LESS_THAN_OR_EQUAL:
          return `${name} меньше "${value}"`
        case OPERATOR_BETWEEN:
          return `${name} между "${value}"-`
        case OPERATOR_CONTAINS:
          return `${name} содержит "${value}"`
        case OPERATOR_NOT_CONTAINS:
          return `${name} не содержит "${value}"`
        case OPERATOR_IN:
          const listIn = column.list
            .filter((item) => value.includes(item.value))
            .map((item) => item.label)
            .join(', ')
          return `${name}: ${listIn}`
        case OPERATOR_NOT_IN:
          const listNotIn = column.list
            .filter((item) => value.includes(item.value))
            .map((item) => item.label)
            .join(', ')
          return `${name} не: ${listNotIn}`
        case OPERATOR_EMPTY:
          return `${name}: пусто`
        case OPERATOR_NOT_EMPTY:
          return `${name}: не пусто`
        default:
          return ''
      }
    }, [name, operator, value])

    return (
      <CButtonGroup className="me-2 mb-2 filter-toggle">
        <CButton
          ref={ref}
          color="secondary"
          className="text-truncate"
          variant="outline"
          onClick={onClick}
        >
          {label}
        </CButton>
        {Boolean(name) &&
          Boolean(operator) &&
          (Boolean(value) || [OPERATOR_EMPTY, OPERATOR_NOT_EMPTY].includes(operator)) && (
            <CButton onClick={onClear} color="secondary" variant="outline" className="close">
              &times;
            </CButton>
          )}
      </CButtonGroup>
    )
  },
)

FilterToggle.displayName = 'FilterToggle'

FilterToggle.propTypes = {
  name: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  column: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ),
  }),
}

export default FilterToggle
