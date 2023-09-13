import React from 'react'
import { CFooter, CLink } from '@coreui/react';



const Foorter = () => {
  return (
    <CFooter position='fixed' className='d-flex justify-content-center'>
   
    <div >
      <span >Developed by</span>
      <CLink style={{color:'red'}} href="https://jaikrishnavr.com"> Jai krishna</CLink>
    </div>
  </CFooter>
  )
}

export default Foorter