import React, { useEffect, useState, useCallback } from 'react'
import useApi from 'src/hooks/useApi'
import CustomSelect from 'src/components/custom/CustomSelect'
import { useTranslation } from 'react-i18next'
import TiersForm from 'src/components/tariffForm/TiersForm'
import { TARIFF_TYPE_INSTALL } from 'src/enums/tariff-types'
import PropTypes from 'prop-types'
import { CFormLabel } from '@coreui/react-pro'

const InstallEdit = ({ updateDenied, setLoading }) => {
  const { t } = useTranslation('tariff')
  const { Tariffs } = useApi()

  const [currentTariffId, setCurrentTariffId] = useState(null)
  const [tariffList, setTariffList] = useState([])
  const [tariffData, setTariffData] = useState({})

  useEffect(() => {
    setLoading(true)
    Tariffs.getListInstall(TARIFF_TYPE_INSTALL)
      .then(({ data }) => {
        setTariffList(data)
        setCurrentTariffId(data[0]?.value || null)
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!currentTariffId) return
    setLoading(true)
    Tariffs.edit(currentTariffId)
      .then(({ data }) => setTariffData(data))
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [currentTariffId])

  const handleSave = useCallback(
    (data) => {
      setLoading(true)
      Tariffs.update(currentTariffId, data)
        .catch(console.log)
        .finally(() => setLoading(false))
    },
    [currentTariffId],
  )

  return (
    <>
      <CFormLabel className="mt-2">{t('label_tariff')}</CFormLabel>
      <CustomSelect
        name="tariff_list"
        options={tariffList}
        multiple={false}
        onChange={setCurrentTariffId}
        value={currentTariffId ? [currentTariffId] : []}
        optionsStyle="text"
        cleaner={false}
      />
      <TiersForm tariffData={tariffData} updateDenied={updateDenied} handleSave={handleSave} />
    </>
  )
}

InstallEdit.propTypes = {
  updateDenied: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default InstallEdit
