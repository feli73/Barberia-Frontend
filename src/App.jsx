import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioLogin from './componentes/FormularioLogin';
import NuevoPassword from './componentes/NuevoPassword';
import MailDeRecuperacionDePassword from './componentes/MailDeRecuperacionDePassword';
import Dashboard from './componentes/Dashboard';
import FormularioDeRegistro from './componentes/FormularioDeRegistro';
import DashboardAdmin from './componentes/DashboardAdmin';
import TurnoDetalle from './componentes/TurnoDetalle';

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<FormularioLogin />} />
      <Route path="/recuperaciondepassword" element={<MailDeRecuperacionDePassword />} />
      <Route path="/nuevopassword" element={<NuevoPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboardadmin" element={<DashboardAdmin />} />
      <Route path="/turno/:id" element={<TurnoDetalle />} />
      <Route path="/registro" element={<FormularioDeRegistro />} />
     </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
