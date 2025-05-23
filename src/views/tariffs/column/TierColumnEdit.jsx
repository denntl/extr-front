import React from 'react'
import { CFormInput } from '@coreui/react-pro'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const TierColumnEdit = ({
  tierData,
  tierId,
  formErrors,
  handlePriceChange,
  handleBlur,
  updateDenied,
}) => {
  const { t } = useTranslation('tariff')
  const { t: tCountries } = useTranslation('countries')

  return (
    <Droppable key={tierId} droppableId={tierId}>
      {(provided) => (
        <div className="col-2">
          <div className="mb-4">
            <h3>{tierData.name}</h3>
            <CFormInput
              key={tierId}
              placeholder={`${t('placeholder_tier_name')} ${tierData.name}`}
              type="number"
              value={tierData.price}
              min="0.01"
              max="1"
              step="0.1"
              onBlur={handleBlur}
              feedbackInvalid={formErrors[tierId]}
              invalid={!!formErrors[tierId]}
              disabled={updateDenied}
              onChange={(e) => handlePriceChange(tierId, e.target.value)}
            />
          </div>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="border rounded p-3 text-white"
          >
            {Array.isArray(tierData.countries) &&
              tierData.countries.map((item, index) => (
                <Draggable
                  key={item}
                  draggableId={item}
                  index={index}
                  isDragDisabled={updateDenied}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 mb-2 bg-secondary text-white rounded"
                    >
                      {tCountries(item)}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

TierColumnEdit.propTypes = {
  tierData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tierId: PropTypes.string.isRequired,
  formErrors: PropTypes.object.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  updateDenied: PropTypes.bool.isRequired,
}

export default TierColumnEdit
