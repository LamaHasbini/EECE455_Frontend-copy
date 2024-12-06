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
          boxSizing: 'border-box'
      }}>
        <div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
          <h1 style={{ color: 'white' }}>Affine Cipher</h1>
          <Tooltip 
            title={`Instructions:\n 1. Enter A and B, the positive integer coefficients of the Affine Cipher, if you have them.\n 2. Enter a shuffled alphabet if desired. Otherwise, the default alphabet will be used.\n 3. Enter the text to be encrypted, decrypted, or cracked.`}
            componentsProps={{
                tooltip: {
                sx: {
                    fontSize: '1rem', 
                    whiteSpace: 'pre-line', 
                },
                },
            }}
            >
            <HelpOutlineOutlinedIcon fontSize='large' style={{ color: 'white' }}/>
            </Tooltip>
        </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '40px' }}>              
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
                      width: '20rem',
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
          {/* History & Background Info Section */}
          <div style={{ marginTop: '40px', color: 'white', width: '75%' }}>
                <h2>History & Background Information</h2>
                <p>The Affine Cipher is a classical encryption technique that dates back to the early days of cryptography. 
                    It is a type of substitution cipher, which means each letter in the plaintext is mapped to a single corresponding letter in the ciphertext. 
                    The most famous example of Affine Ciphers is the Caesar Cipher, named after Julius Caesar, who reportedly used it to protect military messages.
                    Building on the principles of the Caesar Cipher, the Affine Cipher uses a more complex mathematical formula to provide additional security. 
                    Specifically, it applies an encryption function of the form  C = (AP + B) mod M , where C represents the position of each ciphertext character in the alphabet, A  and  B  are key coefficients, P represents the position of each plaintext character, and  M  is the size of the alphabet (typically 26 in the English alphabet). 
                    For the cipher to be invertible, A  must be chosen such that it is coprime to  M , ensuring that the decryption process can uniquely reverse the transformation. 
                    Historically, the Affine Cipher offered increased protection against frequency analysis compared to simpler substitution ciphers, making it a favored choice before the development of more advanced ciphers. 
                    Although it is not secure by modern standards, the Affine Cipher remains an interesting example of early cryptographic methods and is widely used as a teaching tool in cryptography and mathematics.</p>
            </div>
      </div>
  );
}

export default AffineCipherPage;