import React from 'react'
import UnAuthenticated from '../Components/UnAuthenticated/UnAuthenticated';

function AuthHoc(props) {
   //Authentication

   const user = localStorage.getItem("userId");
   const token  = localStorage.getItem("token");

   if(!token || !user){
       return <UnAuthenticated/>
   }

   return   <div>
   {props.children}
   </div>
}

export default AuthHoc