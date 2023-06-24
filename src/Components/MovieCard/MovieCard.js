import React from 'react'

function MovieCard({MovieDetail}) {

    const {name,description,posterUrl, language, casts, director,_id} = MovieDetail;
  return (
    <div>

       <img src={posterUrl} height={100} width={100}/>

        <p> {name} </p>
        <p> {description} </p>
        
    </div>
  )
}

export default MovieCard