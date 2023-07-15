import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GooglePayButton from "@google-pay/button-react";

const Payments = ({ show, setShow, theatresDetail, movieDetails, selectedSeats, confirmBooking, bookingDetails }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [buttonColor, setButtonColor] = useState("default");
  const [buttonSizeMode, setButtonSizeMode] = useState("static");
  const [buttonWidth, setButtonWidth] = useState(240);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [buttonHeight, setButtonHeight] = useState(40);
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example"
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant"
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "IND",
      countryCode: "IN"
    }
  };

  const handlePaymentData = (paymentData) => {
    // Payment is successful, perform necessary actions here
    console.log("Payment successful:", paymentData);
    setPaymentStatus('success');
    setShowModal(true);
  };

  const disableButton = selectedSeats.length <= 0;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = windowWidth <= 344;
  const shouldRenderPaymentButton = !bookingDetails && !disableButton && !isSmallScreen;

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
              <br />
              <small className='fw-bolder'>{theatresDetail.name}</small>
              <br />
              <small className='text-success'>m-ticket</small>
            </div>
            <div className='col-5 my-2'>
              <h5><span>Tickets:</span> {selectedSeats.length}</h5>
              <br />
            </div>
            <hr />
            <div className='row'>
              <div className='col'>
                <p>Total</p>
              </div>
              <div className='col-4'>
                <p className='fw-bolder'>Rs. {movieDetails.price * selectedSeats.length}</p>
              </div>
            </div>
          </div>
          {bookingDetails && paymentStatus === 'success' && (
            <div>
              {bookingDetails.status === "SUCCESS" ? (
                <div className='d-flex flex-column justify-content-between align-items-center'>
                  <img src={movieDetails.posterUrl} height={100} width={100} alt="Movie Poster" />
                  <h5>Booking CONFIRMED!</h5>
                  <small>Booking Id:</small>
                  <p>{bookingDetails._id}</p>
                </div>
              ) : (
                <div className='d-flex flex-column justify-content-between align-items-center'>
                  <img src={movieDetails.posterUrl} height={100} width={100} alt="Movie Poster" />
                  <h5>Booking FAILED!</h5>
                  <small>Please Retry</small>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {shouldRenderPaymentButton && (
            <GooglePayButton
              environment="TEST" // Set your desired environment (TEST or PRODUCTION)
              buttonColor={buttonColor}
              buttonType="book"
              buttonSizeMode={buttonSizeMode}
              paymentRequest={paymentRequest}
              onLoadPaymentData={handlePaymentData}
              style={{ width: buttonWidth, height: buttonHeight }}
              onClick={confirmBooking}
            />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Payments;
