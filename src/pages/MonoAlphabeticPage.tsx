import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DecryptButton from '../components/DecryptButton';
import EncryptButton from '../components/EncryptButton';

function MonoAlphabeticPage() {
    const [alphabet, setAlphabetValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const method = "Mono-Alphabetic";

    const handleAlphabetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z]*$/.test(value)) { // Allow only alphabet letters
          setAlphabetValue(value);
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
          height: '100vh',
          padding: '20px',
          boxSizing: 'border-box'
      }}>
          <h1>Mono-Alphabetic Cipher</h1>
          {/* Key Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '40px' }}>
              <span style={{ fontSize: '1.25rem' }}>Key:</span> 
              
              <TextField 
                  id="outlined-basic-a" 
                  label="Enter Shuffled Alphabet" 
                  variant="filled"
                  value={alphabet}
                  onChange={handleAlphabetChange}
                  sx={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      width: '350px',
                  }} 
              />
          </div>

          {/* Text Input */}
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
              <EncryptButton SetOutput={setOutputValue} inputText={textValue} keyString={alphabet} encryptionmethod={method}/>
              <DecryptButton SetOutput={setOutputValue} inputText={textValue} keyString={alphabet} encryptionmethod={method}/>
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

export default MonoAlphabeticPage;