import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';


const PaymentInformation = ({ handleClick, currentStep, steps }) => {

  
  const formik = useFormik({
    initialValues: {
      CardNumber: '',
      Cvv: '',
      Expiry: '',
    },
    validationSchema: Yup.object({
      CardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Card number must be 16 digits')
        .required('Card number is required'),
      Cvv: Yup.string()
        .matches(/^\d{3}$/, 'CVV must be 3 digits')
        .required('CVV is required'),
      Expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date')
        .required('Expiry date is required (MM/YY)')
        .test(
          'futureDate',
          'Expiry date must be in the future',
          (value) => {
            if (!value) return false;
            const [month, year] = value.split('/');
            const today = new Date();
            const expiryDate = new Date(`20${year}`, month - 1);
            return expiryDate > today;
          }
        ),
    }),

    onSubmit: async (values) => {
      try {
        handleClick('next');
      } catch (error) {
        console.log(error);
      }
    },
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
          <Form.Label style={{ fontWeight: "bolder" }}>Card Number</Form.Label>
          <Form.Control type="text" placeholder="Enter your Card Number" id="CardNumber" name="CardNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.CardNumber} />
          {formik.touched.CardNumber && formik.errors.CardNumber ? (<div className='text-red-500'>{formik.errors.CardNumber}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bolder" }}>CVV</Form.Label>
          <Form.Control type="text" placeholder='Enter your CVV' id="Cvv" name="Cvv" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Cvv} />
          {formik.touched.Cvv && formik.errors.Cvv ? (<div className='text-red-500'>{formik.errors.Cvv}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bolder" }}>Expiry (MM/YY)</Form.Label>
          <Form.Control type="text" placeholder='Enter expiry date (MM/YY)' id="Expiry" name="Expiry" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Expiry} />
          {formik.touched.Expiry && formik.errors.Expiry ? (<div className='text-red-500'>{formik.errors.Expiry}</div>) : null}
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
            className="uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
            disabled={!isFormValid()}
          >
            {currentStep === steps.length - 1 ? "Confirm" : "Next"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PaymentInformation;
