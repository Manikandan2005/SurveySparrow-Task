import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { StepperContext } from '../../context/StepperContext';

const BasicInformation = ({ handleClick, currentStep, steps }) => {
  const { userData, setUserData } = useContext(StepperContext);

  // Initializing Formik with form values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      address: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Enter your Name').max(40, 'Cannot exceed more than 40 characters').min(3, 'Cannot be less than 3 characters'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phoneNumber: Yup.string().matches(/^[6-9]\d{9}$/, 'Phone number is not valid'),
      address: Yup.string()
    }),

    onSubmit: async (values) => {
      try {
        setUserData({ ...userData, ...values });
        handleClick('next');
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Function to check if the form is valid
  const isFormValid = () => {
    const isTouched = Object.keys(formik.touched).length > 0;
    return isTouched && formik.isValid;
  };

  return (
    <div className='flex flex-col'>
      <Form className='form' onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bolder" }}>Name *</Form.Label>
          <Form.Control type="text" placeholder="Enter your Name" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name ? (<div className='text-red-500'>{formik.errors.name}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bolder" }}>Email *</Form.Label>
          <Form.Control type="text" placeholder='Enter your MailID' id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? (<div className='text-red-500'>{formik.errors.email}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bolder" }}>Mobile Number</Form.Label>
          <Form.Control type="text" rows={5} placeholder='Enter your Mobile Number' id="phoneNumber" name="phoneNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNumber} />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<div>{formik.errors.phoneNumber}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bolder" }}>Address</Form.Label>
          <Form.Control type="text" rows={5} placeholder='Enter your address' id="address" name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
          {formik.touched.address && formik.errors.address ? (<div>{formik.errors.address}</div>) : null}
        </Form.Group>

        <div className="flex justify-between ml-5 mr-5 mt-10">
          <Button
            onClick={() => handleClick()}
            variant='success'
            className="uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant='success'
            className="uppercase py-2 px-4 rounded-2xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
            disabled={!isFormValid()}
          >
            {currentStep === steps.length - 1 ? "Confirm" : "Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default BasicInformation;
