import React, { useEffect, useState } from 'react'
import { CPagination, CPaginationItem } from '@coreui/react-pro'
import PropTypes from 'prop-types'

export const Pagination = ({ currentPage, maxPages, onPageChange, ...rest }) => {
  const [pages, setPages] = useState()

  useEffect(() => {
    let newPages = []
    const changePage = (event) => {
      const dataset = event.currentTarget.dataset
      event.stopPropagation()
      if (dataset.id) {
        onPageChange(parseInt(dataset.id))
      }
    }
    newPages.push(
      <CPaginationItem
        key="pagination-prev"
        aria-label="Previous"
        disabled={currentPage <= 1}
        data-id={1}
        onClick={changePage}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>,
    )

    let current = currentPage - 2
    if (current < 1) {
      current = 1
    }
    while (current !== currentPage) {
      newPages.push(
        <CPaginationItem key={`pagination-${current}`} data-id={current} onClick={changePage}>
          {current}
        </CPaginationItem>,
      )
      current++
    }

    newPages.push(
      <CPaginationItem key="pagination-current" active>
        {currentPage}
      </CPaginationItem>,
    )
    current = currentPage + 1
    while (current <= maxPages) {
      newPages.push(
        <CPaginationItem key={`pagination-${current}`} data-id={current} onClick={changePage}>
          {current}
        </CPaginationItem>,
      )
      current++
    }
    newPages.push(
      <CPaginationItem
        key="pagination-next"
        aria-label="Next"
        disabled={currentPage >= maxPages}
        data-id={maxPages}
        onClick={changePage}
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>,
    )
    setPages(newPages)
  }, [currentPage, maxPages])

  return (
    <>
      <CPagination {...rest}>{pages}</CPagination>
    </>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPages: PropTypes.number,
  onPageChange: PropTypes.func,
}
