import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react-pro'
import React from 'react'
import PropTypes from 'prop-types'

export const ConfirmModal = ({
  visible,
  title,
  text,
  onClose,
  onConfirm,
  onCancel,
  confirmDisabled = false,
  ...rest
}) => {
  const handleReject = () => {
    onCancel()
    onClose()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <>
      <CModal visible={visible} onClose={onClose} alignment="center" {...rest}>
        <CModalBody>{text}</CModalBody>
        <CModalFooter>
          <CButton color="cancel" className="px-4-5 rounded-pill" onClick={handleReject}>
            Нет
          </CButton>
          <CButton
            color="confirm"
            className="px-4-5 rounded-pill"
            onClick={handleConfirm}
            disabled={confirmDisabled}
          >
            Да
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmDisabled: PropTypes.bool,
}
