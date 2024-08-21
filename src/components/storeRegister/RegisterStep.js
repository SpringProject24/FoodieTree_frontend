import React, {useState} from 'react';
import styles from './RegisterStep.module.scss';
import StoreRegister from "./StoreRegister";
import ProductRegisterForm from "./ProductRegisterForm";
import WaitingApproval from "./WaitingApproval";

const RegisterStep = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StoreRegister />; // Show StoreRegisterForm at step 1
      case 2:
        return <ProductRegisterForm />; // Show another component at step 2
      default:
        return <WaitingApproval />; // Default to StoreRegisterForm
    }
  };

  return (
    <div className={styles.register}>
      <button onClick={() => setCurrentStep(1)}>Step 1</button>
      <button onClick={() => setCurrentStep(2)}>Step 2</button>
      {renderStep()}
    </div>
  );
};

export default RegisterStep;