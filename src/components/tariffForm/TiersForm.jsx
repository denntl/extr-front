import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import TierColumnEdit from 'src/views/tariffs/column/TierColumnEdit'
import PropTypes from 'prop-types'

const TiersForm = ({ tariffData, updateDenied, handleSave }) => {
  const { t } = useTranslation('tariff')
  const [tiersData, setTiersData] = useState({})
  const defaultErrors = {}
  const [formErrors, setErrors] = useState(defaultErrors)

  useEffect(() => {
    setTiersData(tariffData.tiers)
  }, [tariffData])

  const validateForm = (formTiersData) => {
    setErrors(defaultErrors)
    for (const key in formTiersData) {
      if (formTiersData.hasOwnProperty(key)) {
        const tier = formTiersData[key]
        if (tier.price === '' || tier.price < 0.01 || tier.price > 1) {
          setErrors((prev) => ({
            ...prev,
            [key]: `${t('validation_price_error', { from: 0.01, to: 1 })}`,
          }))
          return false
        }
      }
    }

    return true
  }

  const handlePriceChange = (id, value) => {
    if (value !== '') {
      let numericValue = parseFloat(value)
      if (!isNaN(numericValue)) {
        value = parseFloat(numericValue.toFixed(2))
      }
    }
    setTiersData((prevTiers) => ({
      ...prevTiers,
      [id]: {
        ...prevTiers[id],
        price: value,
      },
    }))
  }

  const onDragEnd = (result) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = tiersData[source.droppableId]
      const destColumn = tiersData[destination.droppableId]
      const sourceItems = [...sourceColumn.countries]
      const destItems = [...destColumn.countries]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setTiersData((prevTiers) => {
        const updatedTiers = {
          ...prevTiers,
          [source.droppableId]: { ...sourceColumn, countries: sourceItems },
          [destination.droppableId]: { ...destColumn, countries: destItems },
        }
        update(updatedTiers)
        return updatedTiers
      })
    } else {
      const column = tiersData[parseInt(source.droppableId)]
      const copiedItems = [...column.countries]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setTiersData({
        ...tiersData,
        [source.droppableId]: { ...column, countries: copiedItems },
      })
    }
  }

  const handleBlur = () => {
    update()
  }

  const update = (updatedTiers = null) => {
    updatedTiers = updatedTiers || tiersData
    const validationResult = validateForm(updatedTiers)
    if (!validationResult) {
      return
    }
    handleSave({ tiers: updatedTiers })
  }

  return (
    <div className={'d-flex justify-content-around mt-5'}>
      {tiersData && (
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(tiersData).map(([tierId, tierData]) => (
            <TierColumnEdit
              key={tierId}
              tierData={tierData}
              tierId={tierId}
              formErrors={formErrors}
              handlePriceChange={handlePriceChange}
              handleBlur={handleBlur}
              updateDenied={updateDenied}
            />
          ))}
        </DragDropContext>
      )}
    </div>
  )
}

TiersForm.propTypes = {
  tariffData: PropTypes.object.isRequired,
  updateDenied: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
}

export default TiersForm
