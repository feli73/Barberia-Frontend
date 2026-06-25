import { useState } from "react";

function MailDeRecuperacionDePassword() {
  const [email, setEmail ] = useState('');
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

 async function handleSend(e){

   e.preventDefault();


   try {
         const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/forgot-password`, {

        method: "POST",

        headers: {

         'Content-Type': 'application/json'

        },

        body: JSON.stringify({ email })

         });

         if(!response.ok) {
          const data = await response.json();
          setError(data.message || 'Mail inválido')
          return
         }


         if(response.ok){
            setSuccess('Te enviamos un email para cambiar tu contraseña')
              
        }


   }  catch(err){
      setError('Error de conexión con el servidor');

   }

   setEmail('');

  }

  return (

     <div>
        <form onSubmit={handleSend}>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }}  placeholder="Email" />
            <button>Enviar</button>
        </form>
        { error && <p style={{color: 'red'}}>{error}</p> }
        { success }
        
     </div>

  )

}



export default MailDeRecuperacionDePassword;