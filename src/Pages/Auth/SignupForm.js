import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterfromValidator } from "../../validators/auth.form.validator";
import { Link } from "react-router-dom";
import { useRegister } from '../../hooks/auth.hooks';

function SignupForm() {

    const { initialStates, onRegister } = useRegister();

    return <div className='vh-100 d-flex justify-content-center align-items-center text-center'
        style={{
            background: 'url("https://static.standard.co.uk/2022/11/16/10/netflix-s.jpg?width=1024&auto=webp&quality=50&crop=968%3A645%2Csmart")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>

        <div className='p-5 ' style={{  border: "3px solid gray", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.9)" }} >

            <div className='row ' >

                <h3 className='text-white font-weight-bold' >Register</h3>
                <div >

                    <Formik 
                   
                   initialValues={initialStates}
                   validate={RegisterfromValidator}
                   onSubmit={onRegister}
                    >

                        {({ isSubmitting }) => (
                            <Form className='d-flex  flex-column justify-content-center align-items-center'>

                                <Field
                                    type="text"
                                    name="name"
                                    className="form-control m-2"
                                    placeholder="Enter the name"
                                />
                                <ErrorMessage name="name" component="div" />

                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control m-2"
                                    placeholder="Enter the email"
                                />
                                <ErrorMessage name="email" component="div" />

                                <Field
                                    type="text"
                                    name="userId"
                                    className="form-control m-2"
                                    placeholder="Enter userId"
                                />
                                <ErrorMessage name="userId" component="div" />

                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control m-2"
                                    placeholder="Enter password"
                                />
                                <ErrorMessage name="password" component="div" />


                                <Field name="userType" as="select" className="form-control bg-white m-2" >
                                    <option disabled>Select Usertype</option>
                                    <option value="CLIENT">Client</option>
                                    <option value="CUSTOMER">Customer</option>
                                    
                                </Field>

                               

                                <button className='btn btn-primary form-control m-2' type="submit" disabled={isSubmitting}>
                                    signup
                                </button>
                            </Form>
                        )}
                    </Formik>

                </div>

            </div>

            <br />

            <Link to="/login" className="text-decoration-none text-white">

                <p className="fw-bolder"> Back to login </p>
            </Link >



        </div>

    </div>
}

export default SignupForm