import React, { useState } from 'react'
import { CButton, CFormInput } from '@coreui/react-pro'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const ListingSearch = ({ onChange }) => {
  const [query, setQuery] = useState('')
  const { t } = useTranslation('listing')

  const handleChangeQuery = ({ target }) => {
    setQuery(target.value)
  }

  const handleSearch = () => {
    onChange(query)
  }

  return (
    <div className="d-flex">
      <CFormInput
        type="search"
        value={query}
        className="me-2"
        placeholder={t('search_placeholder')}
        onChange={handleChangeQuery}
      />
      <CButton type="submit" color="success" variant="outline" onClick={handleSearch}>
        {t('search_button')}
      </CButton>
    </div>
  )
}

ListingSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default ListingSearch
