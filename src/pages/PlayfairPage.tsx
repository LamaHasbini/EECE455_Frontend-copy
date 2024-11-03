import React, { useState } from 'react';
import { Grid, TextField, Tooltip } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EncryptButton from '../components/EncryptButton';
import DecryptButton from '../components/DecryptButton';

function PlayfairPage() {
	const [alphabet, setAlphabet] = useState<string>("ABCDEFGHIKLMNOPQRSTUVWXYZ"); // Default alphabet without 'J'
	const [matrixValues, setMatrixValues] = useState<string[][]>(generatePlayfairMatrix(alphabet));
	const [textValue, setTextValue] = useState<string>("");
	const [outputValue, setOutputValue] = useState<string>("");
	const method = "Playfair";
	
	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/[A-Z]/g, (char) => char.toLowerCase()); // Convert uppercase to lowercase
        setTextValue(value);
    };

	const handleAlphabetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, '');
		const uniqueLetters = Array.from(new Set(value.replace(/J/g, 'I')));
		const filteredAlphabet = uniqueLetters.join('');
		setAlphabet(filteredAlphabet);
		setMatrixValues(generatePlayfairMatrix(filteredAlphabet));
	};

	function generatePlayfairMatrix(alphabet: string): string[][] {
		const letters = alphabet.split('');
		const usedLetters = new Set(letters);
		const totalLetters = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // I/J combined

		for (const char of totalLetters) {
			if (!usedLetters.has(char)) {
				letters.push(char);
				usedLetters.add(char);
			}
		}

		const matrix: string[][] = [];
		for (let i = 0; i < 5; i++) {
			matrix.push(letters.slice(i * 5, i * 5 + 5));
		}

		return matrix;
	}

	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center', 
			flexDirection: 'column',
			boxSizing: 'border-box',
		}}>
			<div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
				<h1>Playfair Cipher</h1>
					<Tooltip 
					title="Instructions: Enter the key square for the Playfair cipher. The key square should be a 5x5 grid of letters, with each letter of the alphabet appearing exactly once (combine I and J)."
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
			
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '20px' }}>
				<TextField
					label="Enter Shuffled Alphabet"
					variant="filled"
					value={alphabet}
					onChange={handleAlphabetChange}
					sx={{
						backgroundColor: 'white',
						borderRadius: '0.4rem',
						width: '20rem',
					}}
				/>

				<div>
					<Grid container direction="column" spacing={0.4}>
						{matrixValues.map((row, rowIndex) => (
							<Grid item key={rowIndex}>
								<Grid container spacing={0.4}>
									{row.map((value, colIndex) => (
										<Grid item key={colIndex}>
											<TextField
												value={value === 'I' ? 'I/J' : value}
												variant="outlined"
												size="small"
												InputProps={{ readOnly: true }}
												sx={{ width: '44px', backgroundColor: 'white', borderRadius: "0.4rem" }}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
						))}
					</Grid>
				</div>
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
				<EncryptButton SetOutput={setOutputValue} inputText={textValue} keyString={alphabet} encryptionmethod={method} />
				<DecryptButton SetOutput={setOutputValue} inputText={textValue} keyString={alphabet} encryptionmethod={method} />
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

export default PlayfairPage;