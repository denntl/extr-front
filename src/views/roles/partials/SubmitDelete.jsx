import React, { useState, useEffect } from 'react'
import {
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTable,
} from '@coreui/react-pro'
import CustomSelect from 'src/components/custom/CustomSelect'
import PropTypes from 'prop-types'

const defaultData = {
  roles: [],
  users: [
    {
      id: 0,
      username: '',
      company: { id: 0, name: '' },
      roleIds: [],
    },
  ],
}
export default function SubmitDelete({ onChange, values, errors }) {
  const [data, setData] = useState(defaultData)
  const [selectErrors, setSelectError] = useState({})

  useEffect(() => {
    if (values) {
      setData(values)
    }
  }, [values])

  useEffect(() => {
    if (errors) {
      setSelectError(errors)
    }
  }, [errors])

  const handleRolesSelect = (selected, id) => {
    onChange(selected, id)
  }

  return (
    <>
      <CTable>
        <CTableHead>
          {selectErrors.roleId && (
            <CTableRow>
              <CTableHeaderCell colSpan={3} color="danger" className="text-danger">
                {selectErrors.roleId}
              </CTableHeaderCell>
            </CTableRow>
          )}
          <CTableRow>
            <CTableHeaderCell>User</CTableHeaderCell>
            <CTableHeaderCell>Company</CTableHeaderCell>
            <CTableHeaderCell>Role</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.users.map((item) => {
            return (
              <CTableRow key={`comment-row-${item.id}`}>
                <CTableDataCell>{item.username}</CTableDataCell>
                <CTableDataCell>{item.company_name}</CTableDataCell>
                <CTableDataCell>
                  <CustomSelect
                    options={data.roles}
                    value={item.roleIds}
                    onChange={(selectedValues) => handleRolesSelect(selectedValues, item.id)}
                    virtualScroller
                    visibleItems={5}
                    aria-describedby="roles"
                    placeholder="Роли"
                    multiple={true}
                  />
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

SubmitDelete.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
}
