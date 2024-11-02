// HillCipherPage.tsx
import React, { useState, useEffect } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Grid, TextField, Tooltip, Button } from '@mui/material';
import EncryptButton from '../components/EncryptButton';
import DecryptButton from '../components/DecryptButton';

interface MatrixProps {
  size: number;
  onMatrixChange: (matrix: string[][]) => void;
}

const Matrix: React.FC<MatrixProps> = ({ size, onMatrixChange }) => {
    const [values, setValues] = useState<string[][]>(
        Array.from({ length: size }, () => Array(size).fill("0"))
    );

    useEffect(() => {
        const initialValues = Array.from({ length: size }, () => Array(size).fill("0"));
        setValues(initialValues);
        onMatrixChange(initialValues);
    }, [size]); // Removed onMatrixChange from dependencies

    const handleChange = (row: number, col: number, value: string) => {
        const regex = /^-?\d*$/; // Regex for optional negative sign followed by digits

        if (regex.test(value) || value === "") {
            const updatedValues = values.map((r, rIdx) =>
                r.map((c, cIdx) => (rIdx === row && cIdx === col ? value : c))
            );
            setValues(updatedValues);
            onMatrixChange(updatedValues);
        }
    };

    return (
        <Grid container direction="column" spacing={2} style={{ marginLeft: "7rem" }}>
            {values.map((row, rowIndex) => (
                <Grid
                    container
                    item
                    key={rowIndex}
                    spacing={2}
                    justifyContent="center"
                >
                    {row.map((value, colIndex) => (
                        <Grid item key={colIndex}>
                            <TextField
                                variant="outlined"
                                size="small"
                                style={{ width: '90px', backgroundColor: 'white' }}
                                value={value}
                                onChange={(e) =>
                                    handleChange(rowIndex, colIndex, e.target.value)
                                }
                                inputProps={{
                                    type: "text",
                                }}
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};




function HillCipherPage() {
	const [matrixSize, setMatrixSize] = useState<number>(2);
	const [textValue, setTextValue] = useState("");
	const [outputValue, setOutputValue] = useState("");
	const [combinedKey, setCombinedKey] = useState<string>("");
	const [alphabet, setalphabet] = useState<string>("abcdefghijklmnopqrstuvwxyz".toUpperCase());
	const method = "Hill";

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		value = value.replace(/[A-Z]/g, (char) => char.toLowerCase()); // Convert uppercase to lowercase
		setTextValue(value);
	}
	const handleMatrixChange = (matrix: string[][]) => {
		console.log('Updated Matrix:', matrix);
		const newKey = matrix.flat().join(",");
		setCombinedKey(() => newKey);
	};

	const toggleMatrixSize = () => {
		setMatrixSize((prevSize) => (prevSize === 2 ? 3 : 2));
	};


	return (
		<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
			boxSizing: 'border-box',
		}}
		>
		<div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
			<h1>Hill Cipher</h1>
			<Tooltip
			title="Instructions: Enter the key matrix for the Hill Cipher. The matrix should be invertible and its size should match the block size of the plaintext."
			componentsProps={{
				tooltip: {
				sx: {
					fontSize: '1rem',
				},
				},
			}}
			>
			<HelpOutlineOutlinedIcon fontSize="large" />
			</Tooltip>
		</div>

		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Matrix size={matrixSize} onMatrixChange={handleMatrixChange}/>
			<Button
			variant="contained"
			onClick={toggleMatrixSize}
			style={{ marginLeft: '2rem' }}
			>
			Switch to {matrixSize === 2 ? '3x3' : '2x2'}
			</Button>
		</div>

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

export default HillCipherPage;
