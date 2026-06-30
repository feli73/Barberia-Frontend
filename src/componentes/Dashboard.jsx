import { useLocation } from 'react-router-dom';
import CalendarioTurnos from './CalendarioTurnos';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import LogoutButton from './LogoutButton';

function Dashboard() {
 const location = useLocation();
 const { name } = location.state || {} ;
 const [ eliminarTurnoMensaje, setEliminarTurnoMensaje ] = useState('');
 const [misTurnos, setMisTurnos] = useState([]);

useEffect(() => {
  
  const fetchTurnos = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/my/appointment`,
      { credentials: "include" }
    );

    const data = await res.json();
    setMisTurnos(data.payload || []);
  };

  fetchTurnos();
}, []);






const formatDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.toLocaleDateString("es-AR")} ${date.getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes()
    .toString()
    .padStart(2, "0")}`;
};



 const handleEliminarTurno = async (id) => {

  try {

    const result = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/${id}`, {
   credentials: 'include',

   method: 'DELETE'

  }); 

   if (!result.ok) throw new Error();

   } catch(err) {

   setEliminarTurnoMensaje('No tenes ningún turno reservado todavía');
    
  }
   
  if(result.ok) {
   
  setMisTurnos(prev => prev.filter(el => id !== el.id))  
  setEliminarTurnoMensaje('Tu turno fue eliminado, gracias!')

  }

 

 }



 return (

  <div>
  
  <h1>Bienvenido { name }</h1>
  <p>Esta es tu página personal y podés seleccionar un turno </p>
  <h3>Horarios de atención</h3>
  <p>Martes a Sábados de 9 a.m a 12:30 y de 16 p.m a 19 p.m</p>
  


 <CalendarioTurnos role='user'/>

 <br />
 <br />
 <br />
 

 <h3>Turnos Reservados</h3>

 {misTurnos.map(el => (   
 
  <div key={el.id} style={{ display:'flex' }}>
  <p>{formatDate(el.date)}</p>
  <p>{el.status}</p>
  <button onClick={() => handleEliminarTurno(el.id)}>Eliminar Turno</button>
  
  </div>


 ))}

 <p>{eliminarTurnoMensaje}</p>


  <LogoutButton />


  </div>





 )
}


export default Dashboard;