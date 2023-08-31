import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function RecruitmentStepper(props) {
    console.log(props);

    const steps = ['Select Candidate', 'Ready to recruit','Interview sheduled', 'Offer Letter Send'];
    

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

  

    return (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={2} >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      );

}

export default RecruitmentStepper


