import React from 'react'
import { CCarousel, CCarouselItem } from '@coreui/react-pro'

const AuthLeftSide = () => {
  return (
    <CCarousel controls indicators interval={false} className="min-vh-100 ">
      <CCarouselItem>
        <div className="d-block w-100 slide-item c-6" alt="slide 1" />
      </CCarouselItem>
      <CCarouselItem>
        <div className="d-block w-100 slide-item c-7" alt="slide 2" />
      </CCarouselItem>
    </CCarousel>
  )
}

export default AuthLeftSide
