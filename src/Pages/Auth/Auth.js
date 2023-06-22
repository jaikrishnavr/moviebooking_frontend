
import { Formik, Form , Field, ErrorMessage } from "formik";
import { useAuth } from "../../hooks/auth.hooks";
import { fromValidator } from "../../validators/auth.form.validator";


const Auth = () => {

  const {initialStates, onLogin} = useAuth();

  return <div className='vh-100 d-flex justify-content-center align-items-center text-center'
    style={{
      background: 'url("https://static.standard.co.uk/2022/11/16/10/netflix-s.jpg?width=1024&auto=webp&quality=50&crop=968%3A645%2Csmart")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>

    <div className='p-5' style={{ border: "3px solid white", borderRadius: "50px", backdropFilter: "blur(70px)" }} >

      <div className='row ' >

        <h3 className='text-white font-weight-bold' >Login</h3>
        <div >

          <Formik initialValues={initialStates}
            validate={fromValidator}
            onSubmit={onLogin}
          >

            {({ isSubmitting }) => (
              <Form className='d-flex  flex-column justify-content-center align-items-center'>
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

                <button className='btn btn-primary form-control m-2' type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>

        </div>




      </div>


    </div>

  </div>
}

export default Auth