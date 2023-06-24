import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import React from 'react'

import one from '../../assets/1.avif'
import two from '../../assets/2.avif'
import three from '../../assets/3.avif'
import four from '../../assets/4.avif'


function Carousal() {
  return (
    <CCarousel controls indicators>
    <CCarouselItem>
      <CImage className="d-block w-100" src={one} alt="slide 1" />
    </CCarouselItem>
    <CCarouselItem>
      <CImage className="d-block w-100" src={two} alt="slide 2" />
    </CCarouselItem>
    <CCarouselItem>
      <CImage className="d-block w-100" src={three} alt="slide 3" />
    </CCarouselItem>
    <CCarouselItem>
      <CImage className="d-block w-100" src={four} alt="slide 3" />
    </CCarouselItem>
  </CCarousel>
  )
}

export default Carousal