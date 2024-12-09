import Adminheader from '../Components/Adminheader'
import Adminfooter from '../Components/Adminfooter'
import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Rfxcreation from './Admin/Rfxcreation'
import Admindash from './Admin/Admindash'
import RfxlistAdmin from './Admin/RfxlistAdmin'
import EvaluateRFx from './Admin/EvaluateRFx'
import AdminPrice from './Admin/AdminPrice'


export default function Adminlayout() {

  return (

    <div>
      <Adminheader />
      <Container maxWidth={'xl'} sx={{ minHeight: '80vh' }}>
        <Routes>
        <Route path='/' element={<Admindash />} />
          <Route path='/createrfx' element={<Rfxcreation />} />
          <Route path='/listadmin' element={<RfxlistAdmin />} />
          <Route path='/manageadmin' element={<EvaluateRFx />} />
          <Route path='/pricecreate' element={<AdminPrice />} />
        </Routes>
      </Container>
      <Adminfooter />     
          
    </div>
  );
}
