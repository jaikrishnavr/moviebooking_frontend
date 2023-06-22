import { useNavigate } from "react-router-dom";
import { TOKEN, USER_TYPES, userTypes } from "../Utils/Constants";
import { useEffect } from "react";
import { signIn } from "../Api/Auth.api";

export const useAuth = () => {
    const initialStates = { userId: "", password: "" };


    const navigate = useNavigate();

    const redirect = () => {
        const userType = localStorage.getItem(USER_TYPES);
    
        const  token  = localStorage.getItem(TOKEN);

        if(!userType || !token){
            return;
          }
      
          if(userType === userTypes.ADMIN){
            navigate("/admin");
          }
          else if(userType === userTypes.CLIENT){
            navigate("/client");
          }
          else {
            navigate("/customer");
          }
        }
    

   /* useEffect(() => {
        redirect();
      },[])*/

      useEffect(() => {
        redirect();
      })

  const onLogin = async (values, { setSubmitting }) => {
      const userDetails = { userId: values.userId, password: values.password };
      const loginResponse = await signIn(userDetails);
      console.log(loginResponse)
      setSubmitting(false);
      redirect();
    }

    return {initialStates, onLogin};
}
  
   
