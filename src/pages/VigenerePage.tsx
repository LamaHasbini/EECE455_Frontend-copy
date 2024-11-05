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
            boxSizing: 'border-box',
        }}>
            <div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
            <h1>Vigenere Cipher</h1>
            <Tooltip 
                    title={'Instructions:\n 1. Enter the key word to be used for the Vigenere Cipher.\n 2. Enter the text that you wish to encrypt or decrypt.\n You can optionally define the alphabet to be used, otherwise the default will be applied.'}
                    componentsProps={{
                        tooltip: {
                            sx: {
                                fontSize: '1rem',
                                whiteSpace: 'pre-line', 
                            },
                        },
                    }}
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
                      width: '20rem',
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
                <p>The Vigenère Cipher, named after the 16th-century French diplomat Blaise de Vigenère, is a method of encrypting alphabetic text through a simple form of polyalphabetic substitution. 
                    Unlike monoalphabetic ciphers, which replace each letter consistently, the Vigenère Cipher employs a keyword to dictate the shift applied to each letter in the plaintext. 
                    The technique involves creating a table, known as the Vigenère tableau, where the rows represent the alphabet shifted by different positions based on the keyword. 
                    This innovative approach significantly enhances security by obscuring the frequency patterns common in simpler ciphers, making it more resistant to frequency analysis. 
                    Although the cipher was described in Vigenère's 1586 work, “Traicté des chiffres,” its effectiveness was not fully appreciated until it was used by various military organizations in the centuries that followed. 
                    The Vigenère Cipher became a popular method of encryption in the 19th century and was considered secure until the advent of more sophisticated cryptanalysis techniques. 
                    Its vulnerabilities were eventually exposed, particularly by the mathematician Charles Babbage in the 19th century, leading to its decline in serious use. 
                    Despite this, the Vigenère Cipher remains a prominent historical example of encryption and is frequently studied in the context of cryptography education, showcasing the evolution of encryption techniques and the ongoing battle between cryptographers and cryptanalysts.</p>
            </div>
        </div>
    );
}

export default VigenerePage;