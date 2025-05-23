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
import { useTranslation } from 'react-i18next'

const defaultData = {
  canUpdate: false,
  domain: '',
  users: [
    {
      value: null,
      label: '',
    },
  ],
  applications: [],
}
export default function ChangeStatusDialog({ onChange, values, errors }) {
  const { t } = useTranslation('my-company-users')
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
          {selectErrors.newApplicationsOwners && (
            <CTableRow>
              <CTableHeaderCell colSpan={3} color="danger" className="text-danger">
                {selectErrors.newApplicationsOwners}
              </CTableHeaderCell>
            </CTableRow>
          )}
          <CTableRow>
            <CTableHeaderCell>{t('applications')}</CTableHeaderCell>
            <CTableHeaderCell>{t('domain')}</CTableHeaderCell>
            <CTableHeaderCell>{t('user')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.applications.map((item) => {
            return (
              <CTableRow key={`comment-row-${item.applicationId}`}>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.domain}</CTableDataCell>
                <CTableDataCell>
                  <CustomSelect
                    options={data.users}
                    value={[]}
                    onChange={(selectedValues) =>
                      handleRolesSelect(selectedValues, item.applicationId)
                    }
                    virtualScroller
                    visibleItems={5}
                    placeholder={t('choose_user')}
                    multiple={false}
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

ChangeStatusDialog.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    applications: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
  }).isRequired,
  errors: PropTypes.object,
}
