import { useNavigate } from "react-router";


function LogoutButton(){


  const navigate = useNavigate();



 async function handleLogout(){



  try {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/logout`, {

 method: 'POST',
 credentials: "include"

 });

 const data = await res.json();

 
 if(data.status === 'success'){

    localStorage.removeItem('token');

   navigate('/');

 }

  } catch(err) {
    console.error("Error logout", err);

  }


 };



return(

<div>

 <button onClick={handleLogout}>Cerrar Cesión</button>

</div>

)


}

export default LogoutButton;