import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormularioDeRegistro(){
const [ first_name, setFirst_Name ] = useState('');
const [  last_name, setLast_Name ] = useState('');
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('') 
const [ error, setError ] = useState('');
const navigate = useNavigate();
const [success, setSuccess] = useState('');


async function  handleSend(e) {
    
 e.preventDefault();

 try {

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/register`, {

     method: 'POST',


     headers: {
        'Content-Type' : 'application/json'

     },

    body: JSON.stringify({ first_name, last_name, email, password })

    });


    const data = await response.json();


  if(!response.ok) {
     setError(data.message || "Error en el llenado de los campos");
     setSuccess('');
     return;
  }

 

  console.log("Registro exitoso:", data);
  setSuccess("Usuario registrado con éxito. Ahora puede iniciar sesión.");
  setError('');
  
  navigate("/");

  
   } catch(err){
    console.error(err);
    setError("Error de conexión con el servidor");

   }

 
  
   setEmail('');
   setPassword('')
   setFirst_Name('');
   setLast_Name('');

  }
   








return (

  <div>
    <h3>Complete el formulario para crear su Usuario</h3>
    <form onSubmit={handleSend}>
      <input type="text" onChange={(e) => setFirst_Name(e.target.value)}  placeholder="Nombre"/>
      <input type="text" onChange={(e) => setLast_Name(e.target.value)} placeholder="Apellido" />
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Enviar</button>
    </form>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success}
  </div>

)


}

export default FormularioDeRegistro;