



export  const fromValidator = (values) => {
    const errors = {};
    if (!values.userId) {
      errors.userId = <h6 className='text-warning'>UserId is Required</h6>;
    }
    if (!values.password) {
      errors.password = <h6 className='text-warning'>Password is Required</h6>;
    } else if (values.password.length < 5) {
      errors.password = <h6 className='text-warning'>password should not be lessthan 5 characters </h6>;
    }
    return errors;
  };