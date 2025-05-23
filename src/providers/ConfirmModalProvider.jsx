import { useContext, useState } from 'react'
import { ConfirmModal } from 'src/components/custom/ConfirmModal'
import * as React from 'react'
import PropTypes from 'prop-types'

const ConfirmModalContext = React.createContext()

export default function ConfirmModalProvider({ children }) {
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    message: '',
    confirmCallback: () => {},
    rejectCallback: () => {},
  })

  const initAndOpen = (params) => {
    setModalProps({
      message: 'Вы подтверждаете действие?',
      confirmCallback: () => {},
      rejectCallback: () => {},
      ...params,
      isOpen: true,
    })
  }

  const setConfirmCallback = (callback = () => {}) => {
    setModalProps((prev) => ({ ...prev, confirmCallback: callback }))
  }

  const setErrorCallback = (error = {}) => {
    setModalProps((prev) => ({
      ...prev,
      errors: error,
    }))
  }

  const setMessageCallback = (message = '') => {
    setModalProps((prev) => ({
      ...prev,
      message: message,
    }))
  }
  const setConfirmDisabled = (disabled = false) => {
    setModalProps((prev) => ({
      ...prev,
      confirmDisabled: disabled,
    }))
  }

  const handleConfirm = async () => {
    const confirm = await modalProps.confirmCallback()
    if (confirm?.errors) {
      console.log(confirm.getErrors())
    } else {
      clearState()
    }
  }

  const handleCancel = async () => {
    await modalProps.rejectCallback()
    clearState()
  }

  const clearState = () => {
    setModalProps({
      message: '',
      confirmCallback: () => {},
      rejectCallback: () => {},
      isOpen: false,
      errors: {},
    })
  }

  const closeModal = () => {
    clearState()
  }

  return (
    <ConfirmModalContext.Provider
      value={{
        initAndOpen,
        setConfirmCallback,
        setErrorCallback,
        setMessageCallback,
        setConfirmDisabled,
      }}
    >
      {children}
      <ConfirmModal
        size={modalProps.size}
        visible={modalProps.isOpen}
        title="Подтверждение"
        text={modalProps.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={closeModal}
        backdrop={modalProps.backdrop}
        confirmDisabled={modalProps.confirmDisabled}
      />
    </ConfirmModalContext.Provider>
  )
}

ConfirmModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useConfirmModal() {
  return useContext(ConfirmModalContext)
}
