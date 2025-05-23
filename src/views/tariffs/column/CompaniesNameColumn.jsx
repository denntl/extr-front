import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ListingContext } from 'src/components/listing/Listing'
import { CPopover } from '@coreui/react-pro'

export const getCompaniesName = (row, settings) => {
  if (row?.companies && settings?.data?.listItems?.companies) {
    return row?.companies
      .split(',')
      .map((id) => {
        return (
          settings?.data?.listItems?.companies.find((item) => item.value === parseInt(id))?.label ||
          ''
        )
      })
      .join(', ')
  }

  return ''
}

export const getShortCompaniesName = (companiesNames) => {
  return companiesNames.length > 35 ? `${companiesNames.substring(0, 25)} ...` : companiesNames
}

const CompaniesNameColumn = ({ row }) => {
  const { settings } = useContext(ListingContext)
  const companiesNames = getCompaniesName(row, settings)

  return (
    <td style={{ width: '250px' }}>
      <CPopover content={companiesNames} placement="top" trigger="hover">
        <span>{getShortCompaniesName(companiesNames)}</span>
      </CPopover>
    </td>
  )
}

CompaniesNameColumn.propTypes = {
  row: PropTypes.shape({
    companies: PropTypes.string,
  }).isRequired,
}

export default CompaniesNameColumn
