import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react-pro'

const Page500 = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Неизвестная ошибка!</h4>
              <p className="text-body-secondary float-start">Обратитесь в службу поддержки</p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
