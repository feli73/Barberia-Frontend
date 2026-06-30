import { useNavigate } from "react-router";


function LogoutButton(){


  const navigate = useNavigate();



 async function handleLogout(){



  try {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/logout`, {

 method: 'POST',
 credentials: "include"

 });


 
  
    navigate("/");
    


 

  } catch(err) {
    console.error("Error logout", err);
     navigate("/");
  }


 };



return(

<div>

 <button onClick={handleLogout}>Cerrar Cesión</button>

</div>

)


}

export default LogoutButton;