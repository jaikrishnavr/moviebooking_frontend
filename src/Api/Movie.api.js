import axios from "axios"
import { TOKEN } from "../Utils/Constants";

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_URL;

export const getAllMovies = async () => { 

    try{
        const res= await axios.get(`${BASE_URL}/mba/api/v1/movies`,{headers:{
            'x-access-token':localStorage.getItem(TOKEN)
        }})
        return res;
       }
       catch(err){
        console.log(err);
       }
    }

    export const getMovieById = async (id)=>{

        try{
        const res= await axios.get(`${BASE_URL}/mba/api/v1/movies/${id}`,{headers:{
            'x-access-token':localStorage.getItem(TOKEN)
        }})
    
        return res;
    
       }
       catch(err){
        console.log(err);
        throw new Error("internal Error")
      
       }
        }


        export const updateMovieById = async (movieId, updatedData)=>{

            try{
         const res= await axios.put(`${BASE_URL}/mba/api/v1/movies/${movieId}`,updatedData, {headers:{
             'x-access-token':localStorage.getItem(TOKEN)
         }})
     
         return res;
     
        }
        catch(err){
         console.log(err);
        }
    
    }


    export const deleteMovieById = async (movieId)=>{
        try{
     const res= await axios.delete(`${BASE_URL}/mba/api/v1/movies/${movieId}`, {headers:{
         'x-access-token':localStorage.getItem(TOKEN)
     }})
    
     return res;
    
    }
    catch(err){
     console.log(err);
    }
    }


    export const createMovies = async (movieData)=>{
        try{
     const res= await axios.post(`${BASE_URL}/mba/api/v1/movies`, movieData, {headers:{
         'x-access-token':localStorage.getItem(TOKEN)
     }})
    
     return res;
    
    }
    catch(err){
     console.log(err);
    }
    }


