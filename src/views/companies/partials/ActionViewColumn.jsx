import React, { useState } from 'react'
import { CButton, CButtonGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import TransactionModal from 'src/views/companies/modal/TransactionModal'
import { cilWindowMaximize } from '@coreui/icons'
import PropTypes from 'prop-types'

const ActionViewColumn = ({ row }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const handleCloseOpen = () => {
    setModalVisible(true)
  }

  return (
    <td className="text-center">
      <CButtonGroup>
        <CButton color="warning" className="btn-action" size="sm" onClick={handleCloseOpen}>
          <CIcon icon={cilWindowMaximize} />
        </CButton>
        {modalVisible && <TransactionModal handleCloseModal={handleCloseModal} row={row} />}
      </CButtonGroup>
    </td>
  )
}

ActionViewColumn.propTypes = {
  row: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    balance_after: PropTypes.number.isRequired,
    balance_type: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    user_id: PropTypes.number,
    comment: PropTypes.string,
    processor_id: PropTypes.number,
  }).isRequired,
}
export default ActionViewColumn
