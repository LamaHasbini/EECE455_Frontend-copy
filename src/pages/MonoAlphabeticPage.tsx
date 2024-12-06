import React, { useState } from 'react';
import { TextField, Box, Typography, Tooltip } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EncryptButton from '../components/EncryptButton';
import DecryptButton from '../components/DecryptButton';

function MonoAlphabeticPage() {
    const [alphabet, setAlphabetValue] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [textValue, setTextValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const method = "Mono-Alphabetic";

    interface AlphabetChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

    const handleAlphabetChange = (event: AlphabetChangeEvent): void => {
        const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        const uniqueLetters = Array.from(new Set(value));
        const filteredAlphabet = uniqueLetters.join('');
        setAlphabetValue(filteredAlphabet);
    };

    interface TextChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

    const handleTextChange = (event: TextChangeEvent): void => {
        let value = event.target.value;
        value = value.replace(/[A-Z]/g, (char) => char.toLowerCase());
        setTextValue(value);
        console.log("Input Text set to:", value);
    };

    // Compute substitutionLetters
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const usedLetters = alphabet.split('');
    const remainingLetters = allLetters.filter(letter => !usedLetters.includes(letter)).sort();
    const substitutionLetters = usedLetters.concat(remainingLetters);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
        }}>
            {/* Title Section */}
            <div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
            <h1 style={{ color: 'white' }}>Mono-Alphabetic Cipher</h1>
                <Tooltip 
                title="Instructions: Enter the alphabet mapping for the mono-alphabetic cipher. Each letter should be unique."
                componentsProps={{
                tooltip: {
                sx: {
                    fontSize: '1rem', // Adjust the font size as needed
                },
                },}}
                >
                    <HelpOutlineOutlinedIcon fontSize='large' style={{ color: 'white' }}/>
                </Tooltip>
            </div>

            {/* Plain Text Input */}
            <div style={{ width: '100%', marginBottom: '20px' }}>
                <Typography variant="h6" style={{  marginBottom: '5px', color: 'white'}}>Input Text:</Typography>
                <TextField  
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={handleTextChange}
                    value={textValue}
                    style={{
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                    }}
                />
            </div>


            {/* Key Display */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="body1" style={{ marginRight: '10px', fontWeight: 'bold', color: 'white' }}>Key:</Typography>
                <TextField
                    variant="outlined"
                    value={alphabet}
                    onChange={handleAlphabetChange}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        width: '60%',
                    }}
                />
            </div>

            {/* Alphabet Mapping Display */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '20px'
            }}>
                {substitutionLetters.map((letter, index) => (
                    // Letter Column
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Original Alphabet Letter */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '6px',
                            width: '32px',
                            height: '40px',
                            backgroundColor: '#d9eaf2',
                            outline: '3px solid #000000',
                        }}>
                            <Typography variant="body2" style={{ color: '#2c5c7f', fontWeight: 'bold' }}>{allLetters[index]}</Typography>
                        </Box>

                        {/* Substituted Alphabet Letter */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '6px',
                            width: '32px',
                            height: '40px',
                            marginTop: '5px',
                            outline: '3px solid #000000',
                        }}>
                            <Typography variant="body1" style={{ color: '#ffffff' }}>
                                {letter}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </div>

            {/* Button Section */}
			<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10rem' }}>
				<EncryptButton SetOutput={setOutputValue} inputText={textValue} keyString={substitutionLetters.join('')} encryptionmethod={method}/>
				<DecryptButton SetOutput={setOutputValue} inputText={textValue} keyString={substitutionLetters.join('')} encryptionmethod={method}/>          
			</div>

            {/* Cipher Text Output */}
            <div style={{ width: '100%', marginTop: '20px' }}>
                <Typography variant="h6" style={{ marginBottom: '5px', color: 'white' }}>Output Text:</Typography>
                <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    disabled
                    value={outputValue}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                    }}
                />
            </div>
        </div>
    );
}

export default MonoAlphabeticPage;
