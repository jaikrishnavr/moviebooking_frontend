import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTheatresById } from '../../Api/Theatres.api';
import { getMovieById } from '../../Api/Movie.api';
import Navbar from '../../Components/Navbar/Navbar';
import { CSpinner } from '@coreui/react';
import './Booking.css'
import Cinema from '../../Components/Cinema/Cinema';
import { Button } from 'react-bootstrap';
import Payments from '../../Components/Payments/Payments';
import { createBooking } from '../../Api/Booking.api';





const Booking = () => {

    const { movieId, theatreId } = useParams();

    console.log(movieId)

    console.log(theatreId)

   
    const [movieDetails, setMovieDetails] = useState(null);
    const [theatersDetail, setTheatersDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSeats, setSelectedSeat] = useState([]);
    const [showPaymentModel, setShowPaymentModel] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null )


    const getTheatresDetails = async () => {
        const theatresData = await getTheatresById(theatreId);
        setTheatersDetails(theatresData.data);

    };

    const getMovieDetails = async () => {
        const movieDetails = await getMovieById(movieId);
        console.log(movieDetails);
        setMovieDetails(movieDetails.data);


    };

    const init = async () => {
        await Promise.all([getTheatresDetails(), getMovieDetails()]);
        setIsLoading(false);
    }

    useEffect(() => {
        init();
    }, []);

const proccedPayment =()=>{
setShowPaymentModel(true);
}


const confirmBooking = async () => {
    const timingSelect = document.getElementById('Timing');
    const timing = timingSelect.options[timingSelect.selectedIndex].value;
    const data ={
        theatreId:theatreId,
        movieId:movieId,
        userId:localStorage.getItem('id'), 
        noOfSeats:selectedSeats.length,
        totalCost:selectedSeats.length*movieDetails.price,
        timing: timing
    };

    const booking = await createBooking(data)

//const payment = await makePayment();

const paymentSuccess=true;

if(paymentSuccess){
  booking.data.status = "SUCCESS";
}else{
  booking.data.status = "FAILED";
}

setBookingDetails(booking.data);

}



    return <div>

        <Navbar />

        <div className='bg-black text-center fullView' >
            {
                isLoading && <CSpinner color="danger" variant="grow" />
            }

            {
                !isLoading && <div className='py-5'>

                    <h2 className='fw-bold text-light'>{movieDetails.name}</h2>

                    <ShowCase />
                    <Cinema movieDetails={movieDetails} selectedSeats={selectedSeats} setSelectedSeat={setSelectedSeat} />

                

                    <select id='Timing' className='form-select text-center fw-bold mb-3' >
                        <option disabled selected hidden> select the timing</option>
                        <option value={"MORNING - 7:30 AM"}> MORNING - 7:30 AM</option>
                        <option value={"MORNING - 11:30 AM"}> MORNING -11:30 AM</option>
                        <option value={"AFTERNOON - 1:30 PM"}> AFTERNOON - 1:30 PM</option>
                        <option value={"EVENING - 4:30 PM"}> EVENING - 4:30 PM</option>
                        <option value={"NIGHT - 6:30 PM"}> NIGHT - 6:30 PM</option>
                    </select>

                    <p className="info">
                        You have selected <span className="count">{selectedSeats.length}</span>{' '}
                        seats for the price of{' '}
                        <span className="total"> {' '}
                            {selectedSeats.length * movieDetails.price}{' '}₹
                        </span>
                    </p>

                    <Button variant='success' size='lg' onClick={proccedPayment}>
                        Process to payment
                    </Button>



                </div>


            }
        </div>
{
    !isLoading&& 

        <Payments show={showPaymentModel} setShow={setShowPaymentModel} theatresDetail={theatersDetail} movieDetails={movieDetails} selectedSeats={selectedSeats} confirmBooking={confirmBooking} bookingDetails={bookingDetails} />
    
}

    </div>




}




function ShowCase() {
    return (
        <ul className="ShowCase">
            <li>
                <span className="seat" /> <small>Not Occupied</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
        </ul>
    )
}


export default Booking;