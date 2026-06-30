import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CalendarForm() {
 const [horarioSeleccionado, setHorarioSeleccionado] = useState('09:00');
 const [ fechaSeleccionada, setFechaSeleccionada ] = useState(null);
 const [error , setError] = useState(null);
 const [ message, setMessage ] = useState(null);


  
 const navigate = useNavigate();

   async function handleEnviar(e){

     e.preventDefault();


     if( !fechaSeleccionada || !horarioSeleccionado){
        setError('Tenes que elegir un horario');
        return;
     }

    const fechaCompleta = new Date( `${fechaSeleccionada}T${horarioSeleccionado}:00`);
    

    const diaSemana = fechaCompleta.getDay();
    if(diaSemana === 0 || diaSemana === 1 ) {
      setError("No se atiende domingos ni lunes")
      return; 
   }



    try {
        

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment/`, {

       method: "POST",

       headers: {

        'Content-Type': 'application/json',

       },

       credentials: "include",

       body: JSON.stringify({ date: fechaCompleta }) ,

     });

        if (response.status === 401) {
        alert("Tu sesión expiró. Iniciá sesión nuevamente.");  
        navigate("/");
        return;
      }


     const data = await response.json();


     if(!response.ok) {

      setError(data.message);
      setMessage(null);
      return;
    }



    setError(null);
    setMessage(data.message || "Turno creado correctamente");
    console.log('Turno creado:', data);
   

    } catch(err) {
      console.error('Error al crear turno:', err);

    }



    }

  return (

      <div>
         <form onSubmit={handleEnviar}>
          <label>Elegí el día</label>
          <input type="date" value={fechaSeleccionada || ""} onChange={(e) => setFechaSeleccionada(e.target.value)} />

          <label>Elegí un horario </label>  
          <select
          value={horarioSeleccionado}
          onChange={(e) => setHorarioSeleccionado(e.target.value)}
          >

                    {/* Mañana */}
            <option value="9:00">09:00</option>
            <option value="9:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>

            {/* Tarde */}
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            </select>

           <button>Enviar</button>

        </form>


        <div style={{ color: 'red' }}>{error}</div>
        <div >{message}</div>

      </div>

      
      )


      }



export default CalendarForm;