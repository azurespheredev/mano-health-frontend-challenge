import { Stepper } from "@mantine/core";
import React from "react";
import { observer } from "mobx-react-lite";
import { Claim } from "shared/src/types/claimsTypes";
import Step1UploadClaims from "~/components/claims/Step1UploadClaims";
import Step2ReviewClaims from "~/components/claims/Step2ReviewClaims";
import Step3ProcessClaims from "~/components/claims/Step3ProcessClaims";

interface StepConfigType {
  label: string;
  description: string;
  component: React.ReactNode;
}

const ClaimsPage: React.FC = observer(() => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [parsedData, setParsedData] = React.useState<Claim[]>([]);

  const handleNextStep = () => {
    if (activeStep < stepConfig.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const stepConfig: StepConfigType[] = [
    {
      label: "Upload",
      description: "Upload CSV File",
      component: <Step1UploadClaims selectedFile={selectedFile} onFileChange={setSelectedFile} onParsedDataChange={setParsedData} handleNextStep={handleNextStep} />,
    },
    {
      label: "Review",
      description: "Revision of Parsed Claims",
      component: <Step2ReviewClaims claimsData={parsedData} onChangeClaimsData={setParsedData} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />,
    },
  ];

  return (
    <Stepper active={activeStep} onStepClick={setActiveStep}>
      {stepConfig.map((step, index) => (
        <Stepper.Step key={index} label={step.label} description={step.description}>
          {step.component}
        </Stepper.Step>
      ))}
      <Stepper.Completed>
        <Step3ProcessClaims claimsData={parsedData} />
      </Stepper.Completed>
    </Stepper>
  );
});

export default ClaimsPage;
