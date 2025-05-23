import React, { useState } from 'react'
import { CFormCheck, CButton } from '@coreui/react-pro'
import PropTypes from 'prop-types'
import AutoClosePopover from 'src/components/custom/AutoClosePopover'

const DropdownSelect = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleItemClick = (itemValue) => {
    const newSelectedItems = value.includes(itemValue)
      ? value.filter((i) => i !== itemValue)
      : [...value, itemValue]
    onChange(newSelectedItems)
  }

  return (
    <AutoClosePopover
      onHide={() => setIsOpen(false)}
      content={
        <div style={{ maxHeight: '14rem', overflowY: 'auto' }} className="p-3">
          {options.map((item) => (
            <div
              className="cursor-pointer"
              key={`dropdown-item-${item.value}`}
              onClick={() => {
                handleItemClick(item.value)
              }}
            >
              <CFormCheck
                className="cursor-pointer"
                id={`checkbox-${item.value}`}
                label={item.label}
                checked={value.includes(item.value)}
                onChange={() => {
                  handleItemClick(item.value)
                }}
              />
            </div>
          ))}
          {options.length === 0 && <p>Нет колонок</p>}
        </div>
      }
    >
      <CButton color="primary" variant={isOpen ? 'ghost' : 'outline'}>
        Колонки
      </CButton>
    </AutoClosePopover>
  )
}

DropdownSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default DropdownSelect
