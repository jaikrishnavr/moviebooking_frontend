import React from 'react'
import { Link } from 'react-router-dom'

function TheatreComponent(theatre, selectedMovie) {

    return <>
  <Link to={`/buyTickets/${selectedMovie}/${theatre._id}`} className=' text-decoration-none '>
        <div style={{ border: "1px solid gray", cursor: "pointer" }} className='row p-4'>
        <div className='col '>
            <h5>{theatre.name}</h5>
        </div>
        <div className='col'>
            <div className='p-2 text-dark fw-bold '>
                <i className='bi bi-phone-fill text-success'></i>
                m-ticket </div>
        </div>

        <div className='col'>
            <div className='p-2 text-danger fw-bold '>
                <i className='bi bi-cup-straw text-dark '></i>
                food and Beverages </div>
        </div>
    </div>

</Link >
</>




}

function TheatersDetails({ theatersDetail, selectedMovie }) {
    return <div >
        {
            theatersDetail.map((theatre) => TheatreComponent(theatre, selectedMovie))
        }
    </div>


}

export default TheatersDetails