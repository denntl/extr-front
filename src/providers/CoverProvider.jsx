import React from 'react'
import PropTypes from 'prop-types'
import { CContainer, CSpinner } from '@coreui/react-pro'
import './CoverProviderStyle.scss'

const CoverProvider = ({ isLoading, hideWhileLoading = false, children }) => {
  return (
    <>
      {isLoading && (
        <CContainer className="m-0 position-absolute w-100 h-100 p-0 d-flex justify-content-center align-items-center bg-preloader z-index-1">
          <CSpinner color="primary" variant="grow" />
        </CContainer>
      )}
      {hideWhileLoading && isLoading ? null : children}
    </>
  )
}

CoverProvider.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  hideWhileLoading: PropTypes.bool,
}

export default CoverProvider
