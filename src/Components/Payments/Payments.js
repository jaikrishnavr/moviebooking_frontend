import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GooglePayButton from "@google-pay/button-react";

const Payments = ({ show, setShow, theatresDetail, movieDetails, selectedSeats, confirmBooking, bookingDetails }) => {
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePaymentData = (paymentData) => {
    // Payment is successful, perform necessary actions here
    console.log("Payment successful:", paymentData);
    setPaymentStatus('success');
    setShowModal(true);
  };

  const disableButton = selectedSeats.length <= 0;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Order summary content */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!bookingDetails && !disableButton && (
            <GooglePayButton
              environment="TEST" // Set your desired environment (TEST or PRODUCTION)
              paymentRequest={{
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
                  totalPrice: (movieDetails.price * selectedSeats.length).toFixed(2),
                  currencyCode: "IND",
                  countryCode: "IN"
                }
              }}
              onLoadPaymentData={handlePaymentData}
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                borderRadius: 5,
                border: '1px solid #ccc',
                padding: '10px 15px',
                boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.2)',
                fontFamily: 'Arial, sans-serif',
                fontSize: 14,
                textAlign: 'center',
                minWidth: 150
              }}
            />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Payments;
