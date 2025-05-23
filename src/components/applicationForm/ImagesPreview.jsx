import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getStorageUrl } from 'src/tools/tools'
import './scss/imagesPreview.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { CButton } from '@coreui/react-pro'
import { useConfirmModal } from 'src/providers/ConfirmModalProvider'
import { useTranslation } from 'react-i18next'

const ImagesPreview = ({ items, onChange, ...rest }) => {
  const ConfirmModal = useConfirmModal()
  const { t } = useTranslation('application')

  const moveElement = (arr, from, to) => {
    const [element] = arr.splice(from, 1)
    arr.splice(to, 0, element)
  }

  const handleDragChange = (result) => {
    if (!result.destination) return
    const { source, destination } = result

    let updatedItems = items
    moveElement(updatedItems, source.index, destination.index)
    onChange(updatedItems)
  }

  const handleImageRemove = (index) => {
    ConfirmModal.initAndOpen({
      message: t('remove_image'),
      confirmCallback: () => {
        let updatedItems = items
        updatedItems.splice(index, 1)
        onChange(updatedItems)
      },
      rejectCallback: () => {},
    })
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragChange}>
        <div {...rest}>
          <Droppable droppableId="image-drop" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="images-preview-item"
              >
                {items.map((value, index) => (
                  <Draggable key={`dp-${index}`} draggableId={`dp-${index}`} index={index}>
                    {(provided) => (
                      <div
                        className="image-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="image-box">
                          <img
                            key={`${index}-img`}
                            src={value.url ? value.url : getStorageUrl(value.path)}
                          ></img>
                          <CButton
                            className="remove-image-btn"
                            onClick={() => handleImageRemove(index)}
                          >
                            <svg
                              width="80%"
                              height="80%"
                              viewBox="0 0 100 100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line x1="10" y1="10" x2="90" y2="90" strokeWidth="8" />
                              <line x1="90" y1="10" x2="10" y2="90" strokeWidth="8" />
                            </svg>
                          </CButton>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  )
}

ImagesPreview.propTypes = {
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ImagesPreview
