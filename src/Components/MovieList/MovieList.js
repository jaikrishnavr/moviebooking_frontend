import React from "react";
import MovieCard from "../MovieCard/MovieCard";

function MovieList(props) {
    const renderMovies = (movies)=>{
        return  moviesData.map((movie)=>{
            return <MovieCard movie={movie} />
           });
    }

    const { moviesData } = props;

    return<div className="bg-light py-3 ">
          <h2> Recomended Movies</h2>
 
    <div style={{flexWrap:"wrap" }} className= "bg-light d-flex justify-content-center  ">
       
        {renderMovies()}
        </div>
        </div> 
}


export default MovieList;
