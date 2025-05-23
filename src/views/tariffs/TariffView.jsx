import React, { useEffect, useState } from 'react'
import CoverProvider from 'src/providers/CoverProvider'
import useApi from 'src/hooks/useApi'
import InstallView from 'src/views/tariffs/InstallView'
import { useAuth } from 'src/providers/AuthProvider'

const TariffView = () => {
  const { Tariff } = useApi()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = useAuth()
  const tariffTypeId = auth.params?.tariff_type_id

  useEffect(() => {
    Tariff.show()
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  switch (tariffTypeId) {
    case 1:
    case undefined:
      return (
        <CoverProvider isLoading={loading}>{!!data && <InstallView data={data} />}</CoverProvider>
      )
    default:
      return (
        <CoverProvider isLoading={false}>
          <p>Error: Unknown tariff type ID: {tariffTypeId}</p>
        </CoverProvider>
      )
  }
}

export default TariffView
