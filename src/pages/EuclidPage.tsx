import React, { useState, useEffect } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Tooltip, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Step {
  quotient: string | number;
  A1: number;
  A2: number;
  A3: number;
  B1: number;
  B2: number;
  B3: number;
}

function EuclidPage() { // inverse of b mod m
  const [mValue, setMValue] = useState("0");
  const [bValue, setBValue] = useState("0");
  const [outputValue, setOutputValue] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [displayedSteps, setDisplayedSteps] = useState<Step[]>([]);

  const handleMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^-?\d*$/.test(value)) { // Allow negative integers
      setMValue(value);
    }
  };

  const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^-?\d*$/.test(value)) { // Allow negative integers
      setBValue(value);
    }
  };

  const computeExtendedGCD = () => {
    const m = parseInt(mValue, 10);
    const b = parseInt(bValue, 10);
  
    // Initial step (quotient 'NA')
    const initialStep: Step = {
      quotient: 'NA',
      A1: 1,
      A2: 0,
      A3: m,
      B1: 0,
      B2: 1,
      B3: b,
    };
  
    // Calculate extended GCD steps
    const result = extendedGCD(m, b, [initialStep]);
  
    // Check if an inverse was found
    if (result.gcd === 1 && result.inverse !== undefined) {
      // Adjust inverse to be positive mod m
      const positiveInverse = ((result.inverse % m) + m) % m;
      setOutputValue(`${positiveInverse}`);
    } else {
      setOutputValue("No inverse exists");
    }
  
    setSteps(result.steps);
    setDisplayedSteps([]); // Reset for animation
  };
  
  const extendedGCD = (
    m: number,
    b: number,
    stepsAcc: Step[] = []
  ): { gcd: number; x: number; y: number; inverse?: number; steps: Step[] } => {
    let x0 = 1, y0 = 0, x1 = 0, y1 = 1;
    let mCurr = m, bCurr = b;
  
    while (bCurr !== 0) {
      const quotient = Math.floor(mCurr / bCurr);
  
      // Update m and b as per the Euclidean algorithm
      const tempM = mCurr;
      mCurr = bCurr;
      bCurr = tempM % bCurr;
  
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
        A3: mCurr,
        B1: x1,
        B2: y1,
        B3: bCurr,
      });
  
      // Check if B3 reached 1, meaning B2 is the modular inverse
      if (bCurr === 1) {
        return { gcd: 1, x: x0, y: y0, inverse: y1, steps: stepsAcc };
      }
    }
  
    // If we exit the loop and B3 is not 1, there is no inverse
    return { gcd: mCurr, x: x0, y: y0, steps: stepsAcc };
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
        <h1 style={{ color: 'white' }}>Extended GCD</h1>
        <Tooltip
          title={`Instructions:\n Enter two integers M and B to compute the inverse of B mod M.`}
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '1rem',
                whiteSpace: 'pre-line'
              },
            },
          }}
        >
          <HelpOutlineOutlinedIcon fontSize='large' style={{ color: 'white' }}/>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
        <TextField
          label="Enter Integer M"
          variant="filled"
          value={mValue}
          onChange={handleMChange}
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
          sx={{
            height: '56px',
            backgroundColor: '#334C58', 
            color: 'white',            
            '&:hover': {
              backgroundColor: 'black', 
            },
          }}
        >
          Compute
        </Button>
      </div>

      <TextField
        label="Inverse"
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
      <div style={{ marginTop: '40px', color: 'white', width: '75%' }}>
                <h2>History & Background Information</h2>
                <p>The Extended Euclidean Algorithm is a fundamental algorithm in number theory that extends the classical Euclidean Algorithm, which dates back to ancient Greece, attributed to the mathematician Euclid around 300 BCE. 
                  The original Euclidean Algorithm efficiently computes the greatest common divisor (GCD) of two integers (a and b) through a series of division steps, while the Extended Euclidean Algorithm builds on this foundation by not only determining the GCD but also finding integer coefficients (often referred to as x and y) such that  ax + by = gcd(a, b). 
                  This capability is particularly useful in applications such as solving linear Diophantine equations, cryptography (notably in the computation of modular inverses), and in algorithm design. 
                  The Extended Euclidean Algorithm has been widely studied and utilized across various fields, from computer science to coding theory, due to its efficiency and the insights it provides into the structure of the integers. 
                  Its historical significance and practical applications have solidified its place as a cornerstone in both theoretical and applied mathematics.</p>
        </div>
    </div>
  );
}

export default EuclidPage;