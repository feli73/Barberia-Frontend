import { useState } from "react"
import { useSearchParams } from "react-router-dom";

function NuevoPassword(){
const [ password, setPassword ] = useState('');
const [ searchParams ] = useSearchParams();
const [ error, setError ] = useState(null);
const [ success, setSuccess ] = useState(null);
const token = searchParams.get("token");

async function handleSend(e){

 e.preventDefault();


try {

const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/reset-password`, { 

 method: 'POST',

 headers: {

   'Content-Type': 'application/json'

 },


 body: JSON.stringify({ token, newPassword: password })


 });



const data = await response.json();


if(!response.ok){
 setError(data.error || "Error al actualizar contraseña" );
 return
}


setSuccess(data.message || 'Contraseña actualizada correctamente')
setError(null);
setPassword('');

  } catch(err) {
    setError('Error de conexión con el servidor');
}

 


 }


return(

  <div>
   <form onSubmit={handleSend}>
    <label style={{ display: "block" }}>Ingrese su nuevo password</label>
    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Nuevo password" />
    <button style={{ display: "block" }}>Enviar</button>
   </form>
   {error && <p style={{ color: 'red' }}>{error}</p>}
   {success && <p style={{ color: 'green' }}>{success}</p>}
  </div>


)


}



export default NuevoPassword;