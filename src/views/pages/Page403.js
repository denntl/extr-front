import React from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'

const Page403 = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">403</h1>
              <h4 className="pt-3">Страница не доступна</h4>
              <p className="text-body-secondary float-start">
                Если вы считаете что так не должно быть - обратитесь в службу поддержки
              </p>
              <CButton color="info" onClick={() => navigate('/')}>
                На главную
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page403
