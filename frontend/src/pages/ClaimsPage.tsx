import { Stepper } from "@mantine/core";
import React from "react";
import { observer } from "mobx-react-lite";
import Step1UploadClaims from "~/components/claims/Step1UploadClaims";
import Step2ReviewClaims from "~/components/claims/Step2ReviewClaims";
import Step3ProcessClaims from "~/components/claims/Step3ProcessClaims";

interface StepConfigType {
  label: string;
  description: string;
  component: React.ReactNode;
};

const ClaimsPage: React.FC = observer(() => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const stepConfig: StepConfigType[] = [
    {
      label: "Upload",
      description: "Upload CSV File",
      component: (
        <Step1UploadClaims />
      ),
    },
    {
      label: "Review",
      description: "Revision of Parsed Claims",
      component: (
        <Step2ReviewClaims />
      ),
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
        <Step3ProcessClaims />
      </Stepper.Completed>
    </Stepper>
  );
});

export default ClaimsPage;