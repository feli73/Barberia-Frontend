import { useLocation } from 'react-router-dom';
import CalendarioTurnos from './CalendarioTurnos';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';




function Dashboard() {

  const navigate = useNavigate();


 const location = useLocation();
 const { name } = location.state || {} ;
 const [ eliminarTurnoMensaje, setEliminarTurnoMensaje ] = useState('');
 const [misTurnos, setMisTurnos] = useState([]);


  const fetchTurnos = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/my/appointment`,
      { credentials: "include" }
    );

    if (res.status === 401) {
        alert("Tu sesión expiró. Iniciá sesión nuevamente.");
        navigate("/");
        return;
      }

    const data = await res.json();
    setMisTurnos(data.payload || []);
  };


useEffect(() => {
  
 

  fetchTurnos();

  
}, [navigate]);






const formatDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.toLocaleDateString("es-AR")} ${date.getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes()
    .toString()
    .padStart(2, "0")}`;
};



 const handleEliminarTurno = async (id) => {

    let result = null;


  try {

     result = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/${id}`, {
   credentials: 'include',

   method: 'DELETE'

  }); 

   if (!result.ok) throw new Error();

   } catch(err) {

   setEliminarTurnoMensaje('No tenes ningún turno reservado todavía');
    
  }
   
  if(result && result.ok) {
   
    await fetchTurnos();
    setEliminarTurnoMensaje('Tu turno fue eliminado, gracias!')

  }

 

 }






 return (

  <div>
  
  <h1>Bienvenido { name }</h1>
  <p>Esta es tu página personal y podés seleccionar un turno </p>
  <h3>Horarios de atención</h3>
  <p>Martes a Sábados de 9 a.m a 12:30 y de 16 p.m a 19 p.m</p>
  


 <CalendarioTurnos role='user'  onTurnoChange={fetchTurnos}/>

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