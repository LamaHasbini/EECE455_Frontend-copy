import React, { useState, useEffect } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Tooltip, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Step {
  quotient: string | number; // Modified to allow string 'NA'
  A1: number;
  A2: number;
  A3: number;
  B1: number;
  B2: number;
  B3: number;
}

function EuclidPage() {
  const [aValue, setAValue] = useState("0");
  const [bValue, setBValue] = useState("0");
  const [outputValue, setOutputValue] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [displayedSteps, setDisplayedSteps] = useState<Step[]>([]);

  const handleAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^-?\d*$/.test(value)) { // Allow negative integers
      setAValue(value);
    }
  };

  const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^-?\d*$/.test(value)) { // Allow negative integers
      setBValue(value);
    }
  };

	const computeExtendedGCD = () => {
	const a = parseInt(aValue, 10);
	const b = parseInt(bValue, 10);

	// Initial step (quotient 'NA')
	const initialStep: Step = {
		quotient: 'NA',
		A1: 1,
		A2: 0,
		A3: a,
		B1: 0,
		B2: 1,
		B3: b,
	};

	// Calculate extended GCD steps
	const result = extendedGCD(a, b, [initialStep]);
	setOutputValue(`GCD: ${result.gcd}, x: ${result.x}, y: ${result.y}`);
	setSteps(result.steps);
	setDisplayedSteps([]); // Reset for animation
	};

	const extendedGCD = (
		a: number,
		b: number,
		stepsAcc: Step[] = []
	): { gcd: number; x: number; y: number; steps: Step[] } => {
		let x0 = 1, y0 = 0, x1 = 0, y1 = 1;
		let aCurr = a, bCurr = b;
	
	while (bCurr !== 0) {
	  const quotient = Math.floor(aCurr / bCurr);
  
	  // Update a and b as per the Euclidean algorithm
	  const tempA = aCurr;
	  aCurr = bCurr;
	  bCurr = tempA % bCurr;
  
	  // Update coefficients
	  const tempX = x0, tempY = y0;
	  x0 = x1;
	  y0 = y1;
	  x1 = tempX - quotient * x1;
	  y1 = tempY - quotient * y1;
  
	  // Record each step
	  stepsAcc.push({
		quotient,
		A1: x0,
		A2: y0,
		A3: aCurr,
		B1: x1,
		B2: y1,
		B3: bCurr,
	  });
	}
  
	return { gcd: aCurr, x: x0, y: y0, steps: stepsAcc };
  };

  useEffect(() => {
    if (steps.length > 0) {
      console.log('Animating steps:', steps);
      let index = 0;
      const interval = setInterval(() => {
        if (index < steps.length) {
          console.log('Adding step:', steps[index]);
          setDisplayedSteps(prev => [...prev, steps[index]]);
          index++;
        } else {
          clearInterval(interval);
          console.log('Completed animating all steps');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [steps]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      <div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
        <h1>Extended GCD</h1>
        <Tooltip
          title="Instructions: Enter two integers to compute their greatest common divisor (GCD) along with the coefficients of Bézout's identity."
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '1rem',
              },
            },
          }}
        >
          <HelpOutlineOutlinedIcon fontSize='large' />
        </Tooltip>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
        <TextField
          label="Enter Integer A"
          variant="filled"
          value={aValue}
          onChange={handleAChange}
          sx={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '200px',
          }}
        />
        <TextField
          label="Enter Integer B"
          variant="filled"
          value={bValue}
          onChange={handleBChange}
          sx={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '200px',
          }}
        />
        <Button
          variant="contained"
          onClick={computeExtendedGCD}
          sx={{ height: '56px' }}
        >
          Compute
        </Button>
      </div>

      <TextField
        label="Output"
        variant="filled"
        multiline
        rows={1}
        disabled
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '20rem',
          marginTop: '20px'
        }}
        value={outputValue}
      />

      {/* Steps Table */}
      {displayedSteps.length > 0 && (
        <TableContainer component={Paper} sx={{ width: '60rem', marginTop: '40px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quotient</TableCell>
                <TableCell>A1</TableCell>
                <TableCell>A2</TableCell>
                <TableCell>A3</TableCell>
                <TableCell>B1</TableCell>
                <TableCell>B2</TableCell>
                <TableCell>B3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedSteps.map((step, index) => (
                <TableRow key={index}>
                  <TableCell>{step.quotient}</TableCell>
                  <TableCell>{step.A1}</TableCell>
                  <TableCell>{step.A2}</TableCell>
                  <TableCell>{step.A3}</TableCell>
                  <TableCell>{step.B1}</TableCell>
                  <TableCell>{step.B2}</TableCell>
                  <TableCell>{step.B3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default EuclidPage;