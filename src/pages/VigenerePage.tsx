import React, { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';
import DecryptButton from '../components/DecryptButton';
import EncryptButton from '../components/EncryptButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

function VigenerePage() {
    const [alphabet, setAlphabetValue] = useState("abcdefghijklmnopqrstuvwxyz".toUpperCase());
    const [keyword, setKeywordValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const method = "Vigenere";

    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z]*$/.test(value)) { // Allow only alphabet letters
            setKeywordValue(value);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/[A-Z]/g, (char) => char.toLowerCase()); // Convert uppercase to lowercase
        setTextValue(value);
    };

    const handleAlphabetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z]*$/.test(value)) { // Allow only alphabet letters
            const uniqueLetters = Array.from(new Set(value.split(''))).join('');
            setAlphabetValue(uniqueLetters.toUpperCase());
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            flexDirection: 'column',
            // padding: '20px',
            boxSizing: 'border-box',
        }}>
            <div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
            <h1>Vigenere Cipher</h1>
            <Tooltip 
            title="Instructions: Enter the alphabet mapping for the mono-alphabetic cipher. Each letter should be unique."
            componentsProps={{
            tooltip: {
              sx: {
                fontSize: '1rem', // Adjust the font size as needed
              },
            },}}
            >
                <HelpOutlineOutlinedIcon fontSize='large'/>
            </Tooltip>
            </div>

            {/* Key Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '40px' }}>
                <span style={{ fontSize: '1.25rem' }}>Key:</span> 
                <TextField 
                    id="outlined-basic-a" 
                    label="Enter Keyword" 
                    variant="filled"
                    value={keyword}
                    onChange={handleKeywordChange}
                    sx={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        width: '350px',
                    }} 
                />

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
                <EncryptButton SetOutput={setOutputValue} inputText={textValue} keyString={keyword} encryptionmethod={method} alphabet={alphabet}/>
                <DecryptButton SetOutput={setOutputValue} inputText={textValue} keyString={keyword} encryptionmethod={method} alphabet={alphabet}/>
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
                <h2>History & Background Info</h2>
                <p>The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution. A polyalphabetic cipher uses multiple substitution alphabets to encrypt the data. The Vigenère cipher has been reinvented many times. The method was originally described by Giovan Battista Bellaso in his 1553 book La cifra del. Sig. Giovan Battista Bellaso; however, the scheme was later misattributed to Blaise de Vigenère in the 19th century, and is now widely known as the "Vigenère cipher".</p>
                <p>The Vigenère cipher is easy to understand and implement, but it resisted all attempts to break it for three centuries, earning it the description le chiffre indéchiffrable (French for 'the indecipherable cipher'). Many people have tried to implement the Vigenère cipher, but most of them failed to do so. The Vigenère cipher is simple to understand and implement, but it is also very difficult to break.</p>
            </div>
        </div>
    );
}

export default VigenerePage;