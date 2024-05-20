import React, { useState } from "react"
import { StepperContext } from "./context/StepperContext";
import Stepper from "./components/Stepper";
import BasicInformation from "./components/Pages/BasicInformation";
import PaymentInformation from "./components/Pages/PaymentInformation";
import ThankYouPage from "./components/Pages/ThankYouPage";


function App() {

  const [currentStep, setCurrenStep] = useState(1);
  const [userData, setUserData]= useState('');
  const [finalData, setFinalData] = useState([]);
  const [formState,setFormState] = useState(false);
  const steps = [
    "Basic Information",
    "Payment Information",
    "Thank you!"
  ];
  
  const displayStep = (step)=>{
    switch(step){
      case 1:
        return <BasicInformation 
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}/>
      case 2:
        return <PaymentInformation 
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}/>
      case 3:
        return <ThankYouPage/>
      default:
    }
  }

  const handleClick = (direction)=>{
      let newStep = currentStep;
      direction === 'next'? newStep++ : newStep--;

      if (direction === "next") {
        newStep > 0 && newStep <= steps.length && setCurrenStep(newStep);
      } else if (direction !== "next") {
        newStep > 0 && newStep <= steps.length && setCurrenStep(newStep);
      }
  }



  return (
    <div className="md:w-1/2 mx-auto shadow-xl  rounded-2xl pb-2 bg-white mt-10 p-4">
      {/* stepper */}
      <div>
        <Stepper steps={steps} currentStep={currentStep}/>
        <div className="my-10 p-10">
          <StepperContext.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData,
            formState,
            setFormState
          }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App
