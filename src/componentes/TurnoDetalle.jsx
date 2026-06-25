import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


function TurnoDetalle() {
const { id } = useParams();
const [ turno, setTurno ] = useState(null);
const [ loading, setLoading ] = useState(true);

useEffect(()  =>  {    


 async function fetchTurno() {

 try {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/admin/${id}`, {
  credentials: "include",
  });

  if(res.status === 403) {
    setTurno("forbidden");
    return;
  }

  if (res.status === 404) {
    setTurno(null)
    return;
  }

  const data = await res.json();
  setTurno(data.payload);

  } catch (err) {
    console.error("Error al traer el turno:", err);
  } finally {
    setLoading(false)
  }

 } 

  
   fetchTurno();

  }, [id])


  if (loading) return <p>Cargando turno...</p>;
  if (turno === "forbidden") return <p>No tienes acceso a esta información</p>
  if (!turno) return <p>No se encontró el turno.</p>;


const fechaUTC = new Date(turno.date);
const fechaLocal = new Date(fechaUTC.getTime() + (3 * 60 * 60 * 1000) );


return (

    <div>

       <h2>Detalle del turno</h2>
       <p><strong>Cliente</strong> {turno.userId?.first_name} -  {turno.userId?.last_name} </p>
       <p><strong>Email</strong> {turno.userId?.email} </p>
       <p><strong>Fecha</strong> {fechaLocal.toLocaleString("es-AR")} </p>
       <p><strong>Estado</strong>  {turno.status} </p>
       
    </div>

)
    
}


export default TurnoDetalle;