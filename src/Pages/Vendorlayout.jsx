import React from 'react'
import Vendorheader from '../Components/Vendorheader'
import Vendordash from '../Pages/Vendor/Vendordash'
import Rfxsub from '../Pages/Vendor/Rfxsub'
import { Route, Routes } from 'react-router-dom'
import VendorrfxStatus from '../Pages/Vendor/VendorrfxStatus'
import { Container } from '@mui/material'
import Adminfooter from '../Components/Adminfooter'
import Rfxlist from './Rfxlist'
import Rfxdetail from './Rfxdetail'

export default function Vendorlayout() {
  return (
    <div>
      <Vendorheader />
      <Container maxWidth={'xl'} sx={{ minHeight: '80vh' }}>
        <Routes>
          <Route path='/' element={<Vendordash />} />
          <Route path='/listrfx' element={<Rfxlist />} />
          <Route path='/rfxSubmit' element={<Rfxsub />} />
          <Route path='/rfxstatus' element={<VendorrfxStatus />} />
          <Route path='/number/:rfxNumber' element={<Rfxdetail />} />
        </Routes>
      </Container>
      <Adminfooter />

    </div>
  )
}
