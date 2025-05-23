import { CButton, CButtonGroup, CPopover } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import useApi from 'src/hooks/useApi'
import { pen, trashBin } from 'src/assets/icons/icons'

const ActionColumn = ({ row, onRefreshListingData }) => {
  const navigate = useNavigate()
  const ConfirmModal = useConfirmModal()
  const { Tariffs } = useApi()

  const handleNavigateToUpdate = () => {
    navigate(`/tariffs/subscriptions/update/${row.id}`)
  }

  const handleDelete = () => {
    ConfirmModal.initAndOpen({
      message: 'Вы действительно хотите удалить?',
      confirmCallback: async () => {
        console.log(row)
        const response = await Tariffs.delete(row.id)
        if (response.isSuccess()) {
          onRefreshListingData()
        }
      },
    })
  }

  return (
    <td>
      <CButtonGroup className="listing-actions">
        <CButton
          color="primary-pwa"
          className="btn-action"
          size="sm"
          onClick={handleNavigateToUpdate}
        >
          <CIcon icon={pen} />
        </CButton>
        {row.status === 0 && (
          <CButton color="danger" className="btn-action" size="sm" onClick={handleDelete}>
            <CIcon icon={trashBin} />
          </CButton>
        )}
      </CButtonGroup>
    </td>
  )
}

ActionColumn.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.number,
  }).isRequired,
  onRefreshListingData: PropTypes.func,
}
export default ActionColumn
