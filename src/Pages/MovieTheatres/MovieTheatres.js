import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { getTheatresForAMovie } from "../../Api/Theatres.api";
import { getMovieById } from "../../Api/Movie.api";
import { Spinner } from "react-bootstrap";
import TheatersDetails from "../../Components/TheatresDetails/TheatersDetails";


const MovieTheatres = () => {
  const { movieId: selectedMovie } = useParams();
  const [theatresDetail, setTheatersDetails] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTheatres = async () => {
    const theatresData = await getTheatresForAMovie(selectedMovie);
    setTheatersDetails(theatresData.data);
    
  };

  const getMovieDetails = async () => {
    const movieDetails = await getMovieById(selectedMovie);
    console.log(movieDetails);
    setMovieDetails(movieDetails.data);
    

  };

const init=async ()=> { 
   await Promise.all([getTheatres(), getMovieDetails()]);
   setIsLoading(false);
}

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Navbar />

      {isLoading && <Spinner />}

      {!isLoading && <div style={{minHeight:"100vh"}} className="bg-black text-center pt-4">

         <h2 className="fw-bolder text-white"> {movieDetails.name} </h2>

          <div className="text-white">
            <span> {movieDetails.description} </span>

            <div className="text-white">
              <span className="badge text-bg-danger rounded-pill m-2 text-white">
              
                {movieDetails.language}
              </span>
              <span className="badge text-bg-success rounded-pill m-2 text-white">
             
                {movieDetails.releaseStatus}
              </span>
            </div>

            <hr />
            <h6 className="text-justify">
             
              Directed by {movieDetails.director}
            </h6>
            <h6 className="text-justify">
           
              Released On {movieDetails.releaseDate}
            </h6>

            <br />
          </div>

          <div style={{width:"80vw" , margin: "0 auto"}} className='bg-white'>
         
         <TheatersDetails theatersDetail={theatresDetail} selectedMovie={selectedMovie}/>
           
        </div> 
        </div>
      }
      <div></div>
    </div>
  );
};

export default MovieTheatres;
