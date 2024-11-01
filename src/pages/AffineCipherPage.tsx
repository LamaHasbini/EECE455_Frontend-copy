import { TextField } from "@mui/material";
import { useState } from "react";
import EncryptButton from "../components/EncryptButton";
import DecryptButton from "../components/DecryptButton";

function AffineCipherPage() {
    const [aValue, setAValue] = useState("");
    const [bValue, setBValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const method = "Affine";

    const handleAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { // Allow only digits
            setAValue(value);
        }
    };

    const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) { // Allow only digits
            setBValue(value);
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/[A-Z]/g, (char) => char.toLowerCase()); // Convert uppercase to lowercase
        setTextValue(value);
    };

    return (
        <>
            <h1>Affine Cipher</h1>
            <TextField 
                id="outlined-basic-a" 
                label="Enter Positive Integer A" 
                variant="filled"
                value={aValue}
                onChange={handleAChange}
                sx={{ 
                    backgroundColor: 'white', 
                    marginRight: '10rem', 
                    borderRadius: '8px',
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
                    borderRadius: '8px' 
                }} 
            />
            
            <div style={{ marginTop: '60px', fontSize: 26 }}>
                <label htmlFor="plaintext-input" style={{ color: 'white', marginBottom: '5px', display: 'block' }}>Enter Text</label>
                <TextField  
                    id="plaintext-input" 
                    variant="filled"
                    multiline
                    rows={6}
                    sx={{
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        width: '75%' 
                    }}
                    onChange={handleTextChange}
                    value={textValue}
                />
            </div>

            <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '10rem' }}>
                <DecryptButton SetOutput={setOutputValue} cipherText={textValue} key={aValue + ',' + bValue} encryptionmethod={method}/>
                <EncryptButton />
            </div>
            
            <div style={{ marginTop: '60px', fontSize: 26 }}>
                <label htmlFor="plaintext-input" style={{ color: 'white', marginBottom: '5px', display: 'block' }}>Output</label>
                <TextField  
                    id="plaintext-input" 
                    variant="filled"
                    multiline
                    rows={6}
                    disabled
                    sx={{
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        width: '75%' 
                    }}
                    value={outputValue}
                />
            </div>  
        </>
    );
}

export default AffineCipherPage;