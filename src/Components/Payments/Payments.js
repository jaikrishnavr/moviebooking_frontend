import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const Payments = ({show , setShow, theatresDetail, movieDetails, selectedSeats, confirmBooking , bookingDetails}) => {

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row '>
            <div className='col my-2'>
              
              <h3>{movieDetails.name}</h3>
              <small>{movieDetails.language}</small>
              <br/>
              <small className='fw-bolder'>{theatresDetail.name}</small>
              <br/>
              <small className='text-success'> m- ticket</small>
            </div>
            <div className='col-5 my-2'>
              <h5><span>Tickets : </span>{selectedSeats.length}</h5> 
              <br/>
            </div>
            
            <hr/>

            <div className='row'>
              <div className='col'>
                <p> Total</p>
                </div>
                <div className='col-4'>
                <p className='fw-bolder'>Rs. {movieDetails.price*selectedSeats.length}</p>
              </div>
                </div>

          </div>

          {

            bookingDetails&&

<div> 
  {
    bookingDetails.status === "SUCCESS" ? (
      <div className='d-flex flex-column justify-content-between align-items-center'>

        <img src={movieDetails.posterUrl} height={100} width={100} /> 
        <h5>Booking CONFIRMED !</h5>
        <small>booking Id :</small>
        <p>  {bookingDetails._id}</p>
      </div>
    ): 
    <div className='d-flex flex-column justify-content-between align-items-center'>

    <img src={movieDetails.posterUrl} height={100} width={100} /> 
    <h5>Booking FAILED !</h5>
    <small>Please Retry</small>

  </div>
  }


</div>

          }


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      { !bookingDetails &&
          <Button variant="primary" onClick={confirmBooking}>
            Confirm Payment
          </Button>

      }

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Payments;