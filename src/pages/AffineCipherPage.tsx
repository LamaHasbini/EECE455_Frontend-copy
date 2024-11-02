import React, { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import DecryptButton from '../components/DecryptButton';
import EncryptButton from '../components/EncryptButton';
import CrackButton from '../components/CrackButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

function AffineCipherPage() {
    const [aValue, setAValue] = useState("0");
    const [bValue, setBValue] = useState("0");
    const [textValue, setTextValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const [alphabet, setAlphabetValue] = useState("abcdefghijklmnopqrstuvwxyz".toUpperCase());
    const method = "Affine";
    const combinedKey = `${aValue},${bValue}`;


    const handleAlphabetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (/^[a-zA-Z]*$/.test(value)) { // Allow only alphabet letters
            const uniqueLetters = Array.from(new Set(value.split(''))).join('');
            setAlphabetValue(uniqueLetters.toUpperCase());
        }
    };

    const handleAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { // Allow only digits
            setAValue(value);
        }
    };

    const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setBValue(value);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/[A-Z]/g, (char) => char.toLowerCase()); // Convert uppercase to lowercase
        setTextValue(value);
    };

    return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
          boxSizing: 'border-box'
      }}>
        <div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
          <h1>Affine Cipher</h1>
          <Tooltip 
          title="Instructions: Enter positive integers for A and B. Ensure that A and the length of the alphabet are coprime. Enter a shuffled alphabet if desired. Enter the text to be encrypted or decrypted."
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: '1rem', // Adjust the font size as needed
              },
            },
          }}
          >
                <HelpOutlineOutlinedIcon fontSize='large'/>
            </Tooltip>
        </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '40px' }}>
              {/* <span style={{ fontSize: '1.25rem' }}>Keys:</span>  */}
              
              <TextField 
                  id="outlined-basic-a" 
                  label="Enter Positive Integer A" 
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
                  id="outlined-basic-b" 
                  label="Enter Positive Integer B" 
                  variant="filled" 
                  value={bValue}
                  onChange={handleBChange}
                  sx={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      width: '200px',
                  }} 
              />
          </div>

          <TextField 
                  id="outlined-basic-a" 
                  label="Enter Shuffled Alphabet" 
                  variant="filled"
                  value={alphabet}
                  onChange={handleAlphabetChange}
                  sx={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      width: '28rem',
                    //   height: '4rem'
                  }} 
                  
              />

          <div style={{ marginTop: '20px', fontSize: 26, width: '75%' }}>
              <label htmlFor="plaintext-input" style={{ marginBottom: '5px', display: 'block', color: 'white' }}>Enter Text</label>
              <TextField  
                  id="plaintext-input" 
                  variant="filled"
                  multiline
                  rows={6}
                  sx={{
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      width: '100%'
                  }}
                  onChange={handleTextChange}
                  value={textValue}
              />
          </div>

          {/* Button Section */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10rem' }}>
              <EncryptButton SetOutput={setOutputValue} inputText={textValue} keyString={combinedKey} encryptionmethod={method} alphabet={alphabet}/>
              <DecryptButton SetOutput={setOutputValue} inputText={textValue} keyString={combinedKey} encryptionmethod={method} alphabet={alphabet}/>
              <CrackButton SetOutput={setOutputValue} inputText={textValue} encryptionmethod={method}/>
          </div>
          
          {/* Output Section */}
          <div style={{ marginTop: '60px', fontSize: 26, width: '75%' }}>
              <label htmlFor="output-input" style={{ marginBottom: '5px', display: 'block', color: 'white' }}>Output</label>
              <TextField  
                  id="output-input" 
                  variant="filled"
                  multiline
                  rows={6}
                  disabled
                  sx={{
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      width: '100%'
                  }}
                  value={outputValue}
              />
          </div>  
      </div>
  );
}

export default AffineCipherPage;