import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import CalendarioTurnos from './CalendarioTurnos';
import LogoutButton from './LogoutButton';

function DashboardAdmin() {
 const [ email, setEmail ] = useState(''); 
 const [ error, setError ] = useState('');
 const [name, setName] = useState('');
 const [lastName, setLastName] = useState('');
 const [users , setUsers] = useState([]);
 const[message, setMessage] = useState('');



  const location = useLocation();


 const { name: adminName } = location.state || {};





async function handleDeleteById(userId) {
  
try {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/${userId}`, {
   method: 'DELETE',
   credentials: 'include'
  });

  if(res.ok) {
     alert("Usuario eliminado correctamente");
      setUsers(users.filter(u => u._id !== userId));
  }

} catch (err) {
  console.error(err);
  setError("Error al eliminar");

}

}

// quita los acentos para busquedas
const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};




 async function handleFind() {
 
  const normalizedName = normalizeText(name);
  const normalizedLastName = normalizeText(lastName);


  

 try {
   const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/search?name=${normalizedName}&lastName=${normalizedLastName}`);
   const data = await res.json();
   console.log(data)

   setUsers(data.payload);

 } catch (err) {
   
  console.error(err);
  setError("Error en la operación");

 }

 }



 async function handlePromover(user) {

 

 try {

     const result = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/${user._id}/promote`, {

     method: 'PUT',
     credentials: 'include'

     });

    setMessage(`Se ah promovido el usuario ${user.first_name} - ${user.last_name} a administrador`)


 } catch(err) {

    setError('Error al promover al usuario')
 }


 }





 

  return (

   <div>

  <h1>Bienvenido {adminName }</h1>
  <p>Esta es tu página personal como administrador </p>
  <h3>Horarios de atención</h3>
  <p>Martes a Sábados de 9 a.m a 12:30 y de 16 p.m a 19 p.m</p>
  
   <CalendarioTurnos role='admin'/>
  <br />
  <br />

 <p>Buscar usuario</p>
 <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='nombre' />
 <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='apellido' />
 <button onClick={handleFind}>Buscar</button>
 

  <br />
  <br />
 
  <ul>{users.map(el => <li key={el._id}> {el.first_name} {el.last_name} - {el.email}   <button onClick={() => handleDeleteById(el._id)}>Eliminar</button>    <button onClick={() => handlePromover(el) } >Promover a administrador</button>   </li> )  }</ul>

  <br />
  <br />
  

   <p>{error}</p>

   <p>{message}</p>


   



   <LogoutButton />
   
   </div>



  )


}


export default DashboardAdmin;