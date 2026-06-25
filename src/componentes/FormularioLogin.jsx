import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FormularioLogin(){
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [ error, setError ] = useState(null);
const navigate = useNavigate();


  async function handleSend(e) {

   e.preventDefault();


   try{

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/login`, {

   method: 'POST',
   credentials: "include",

   headers: {
    
    'Content-Type': 'application/json'

   },

   body: JSON.stringify({ email, password })

   });

  // response.ok es una propiedad de la respuesta de fetch devuelve true o false

      const data = await response.json();


  if(!response.ok) {
     setError(data.message || "Credenciales incorrectas");
     return;
  }


 if(data.payload.role === 'admin'){


  console.log("Login exitoso:", data);

  navigate("/dashboardadmin/", { state: { name: data.payload.first_name } });



 } else {


  console.log("Login exitoso:", data);

  navigate("/dashboard/", { state: { name: data.payload.first_name } });
  

 }

 
 


   } catch(err){
      console.error(err)
    setError("Error de conexión con el servidor");

   }


  
   setEmail('');
   setPassword('')

  }


return (

    

   <div>

    <form onSubmit={handleSend}>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)  } placeholder="Email"/>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
    <button>Enviar</button>
    <Link to='/recuperaciondePassword'>¿Olvidaste tu contraseña?</Link>
    <Link to='/registro'>Crear un nuevo usuario</Link>
    </form>
    {error && <p style={{ color: 'red' }} >{error}</p>}
   </div>

)


}

export default FormularioLogin;