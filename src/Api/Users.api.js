import axios from "axios"
import { TOKEN } from "../Utils/Constants";

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_URL;

export const getAllUsers = async () => { 

    try{
        const res= await axios.get(`${BASE_URL}/mba/api/v1/users`,{headers:{
            'x-access-token':localStorage.getItem(TOKEN)
        }})
        return res;
       }
       catch(err){
        console.log(err);
       }
    }

    export const updateUsers = async (userId , updatedData) => { 

        try{
            const res= await axios.put(`${BASE_URL}/mba/api/v1/users/${userId}`,updatedData,{headers:{
                'x-access-token':localStorage.getItem(TOKEN)
            }})
            return res;
           }
           catch(err){
            console.log(err);
           }
        }