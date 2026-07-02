import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


function TurnoDetalle() {
const { id } = useParams();
const [ turno, setTurno ] = useState(null);
const [ loading, setLoading ] = useState(true);
const [error, setError] = useState("");

const navigate = useNavigate();


useEffect(()  =>  {    


 async function fetchTurno() {

 try {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/admin/${id}`, {
  credentials: "include",
  });

    if (res.status === 401) {
      navigate("/");
      return;
    }


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


const fecha = new Date(turno.date);



async function handleDelete(){

  if (!window.confirm("¿Seguro que querés eliminar este turno?")) {
  return;  // Muestra automaticamente la opción de Aceptar o Cancelar
}


 try {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/${id}`, {

    method: 'DELETE',
    credentials: 'include'

  });


 if (res.status === 401) {
      navigate("/");
      return;
    }


  if(res.status === 403) {
    setTurno("forbidden");
    return;
  }

  if (res.status === 404) {
    navigate("/dashboardadmin")
    return;
  }


 if(res.ok){

    navigate("/dashboardadmin");
  }

 }catch(err){

   console.error("Error al eliminar el turno:", err );
    setError("No se pudo eliminar el turno. Intentá nuevamente.");

 }



}



return (

    <div>

       <h2>Detalle del turno</h2>
       <p><strong>Cliente</strong> {turno.userId?.first_name} -  {turno.userId?.last_name} </p>
       <p><strong>Email</strong> {turno.userId?.email} </p>
       <p><strong>Fecha</strong> {fecha.toLocaleString("es-AR")} </p>
       <p><strong>Estado</strong>  {turno.status} </p>
       <button onClick={handleDelete}>Eliminar Turno</button>      
       {error && <p style={{ color: "red" }}>{error}</p>}
    </div>

)
    
}


export default TurnoDetalle;