import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from "react";
import CalendarForm from "./CalendarForm";
import { useNavigate } from "react-router-dom";

const locales = { 
    es: es,
 };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});






  const mensajes = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  showMore: (total) => `+ Ver más (${total})`,
}; 


function CalendarioTurnos({ role }) {
  const [fecha, setFecha] = useState(new Date());
  const [ view, setView ] = useState('month');
  const navigate = useNavigate();
  const [ turnos, setTurnos ] = useState([]);




  async function fetchAppointment() {
    
    
    try { 
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/appointment`, {
        credentials: "include",
      });

      if (response.status === 401) {
        alert("Tu sesión expiró. Iniciá sesión nuevamente.");
        navigate("/");
        return;
      }



      const data = await response.json();

      if (response.ok) {
        const mapped = data.payload.map((appt) => {  
         
          const localDate = new Date(appt.date);
         
         return {
         id: appt.id,
         title: role === "admin" ? `${appt.userId?.first_name || ""} ${appt.userId?.last_name || "" }` : "Turno reservado",
          start: localDate, // ✅ se guarda y se usa en UTC
          end: new Date(localDate.getTime() + 30 * 60000),
          status: appt.status,
          userId: appt.userId,

         }
          
        });





        setTurnos(mapped);
      } else {
        console.error("Error al traer turnos:", data.message);
      }
    } catch (err) {
      console.error("Error de conexión", err);
    }


     

  }



useEffect(() => {
  

  fetchAppointment();

  
}, [role]);









 const CustomTimeSlotWrapper = ({ children, value }) => {
    const hora = value.getHours();
    const minutos = value.getMinutes();

   const dentroDeManana = hora > 9 && (hora < 12 || (hora === 12 && minutos <= 30));
   const dentroDeTarde = hora >= 16 && minutos < 19

   const valido = dentroDeManana || dentroDeTarde;

   return (
    <div>
      {children}
    </div>
   )
  };



  const eventos = turnos.map(appt => {
  const date = new Date(appt.start);

  return {
    id: appt.id,
    title:
      role === "admin"
        ? `${appt.userId?.first_name || ""} ${appt.userId?.last_name || ""}`
        : "Turno reservado",
    start: date,
    end: new Date(date.getTime() + 30 * 60000),
    status: appt.status,
  };
});
  




return (


    <div style={{ height: 500 }}>
        <Calendar
          onSelectEvent={(event) => {
            console.log("Evento clickeado:", event);
            navigate(`/turno/${event.id}`)

          }}

          localizer={localizer}
          events={ eventos }
          startAccessor="start"
          endAccessor="end"
          messages={mensajes}
          culture="es"
          view={view}
          onView={(newView) => setView(newView)}
          date={fecha}
          onDrillDown={(date, view) => {
             console.log("Celda clickeada:", date);
             }}
          
          onNavigate={(newDate) => setFecha(newDate)} //  esto habilita navegación
          defaultView="month"                  //  vista inicial
          views={["month", "week", "day", "agenda"]} //  habilita todas las vistas
          toolbar={true}                       //  muestra la barra con botones
          selectable={true}
          step={30}
          timeslots={2}
          min={new Date(1970, 0, 1, 9, 0)}
          max={new Date(1970, 0, 1, 19, 30)}
          onSelectSlot={(slotInfo) => {  

           const hora = slotInfo.start.getHours();
            const minutos = slotInfo.start.getMinutes();

            const dentroDeManana = hora >= 9 && (hora < 12 || (hora === 12 && minutos <= 30));
            const dentroDeTarde = hora >= 16 && hora < 19;

            if (dentroDeManana || dentroDeTarde) {
              console.log("Turno válido:", slotInfo.start);
              // acá guardás en Mongo
            } else {
              alert("Ese horario no está disponible.");
            }


          console.log("Turno seleccionado:", slotInfo.start);
         
          }}


     

           components={{ 
            timeSlotWrapper: CustomTimeSlotWrapper,
          }}

           
        
        />
 
 
     <CalendarForm actualizarTurnos={fetchAppointment}/>
 
 
    </div>


 

)

}

export default CalendarioTurnos;