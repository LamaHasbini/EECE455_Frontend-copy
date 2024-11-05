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
					title={'Instructions:\n 1. Enter the key to be used in the Playfair cipher. The coresponding 5x5 matrix will be displayed with each letter of the alphabet appearing exactly once (combining I and J into the same cell).\n 2. Enter the text which you wish to encrypt or decrypt.'}
					componentsProps={{
					tooltip: {
						sx: {
							fontSize: '1rem', 
							whiteSpace: 'pre-line', 
						},
					},}}
					>
							<HelpOutlineOutlinedIcon fontSize='large'/>
					</Tooltip>
			</div>
			
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '20px' }}>
				<TextField
					label="Enter Key"
					variant="filled"
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
			<div style={{ marginTop: '40px', color: 'white', width: '75%' }}>
			<h2>History & Background Information</h2>
			<p>The Playfair Cipher, invented by Charles Wheatstone in 1854 and popularized by Baron Playfair, is a digraph substitution cipher that enhances the security of traditional monoalphabetic ciphers by encrypting pairs of letters instead of single letters. 
				The Playfair Cipher operates on a 5x5 grid constructed from a keyword or phrase, which is used to generate a substitution alphabet while omitting duplicate letters and typically combining I and J into a single cell to accommodate the 25-letter grid. 
				This grid is central to the encryption process, as it dictates how pairs of letters in the plaintext are transformed into ciphertext. 
				When encrypting a pair of letters, the cipher employs specific rules based on their positions in the grid: if both letters are in the same row, they are replaced by the letters immediately to their right; if they are in the same column, they are replaced by the letters directly below; and if they form a rectangle, they are replaced by the letters on the same row but at the opposite corners. 
				The Playfair Cipher was widely used during the late 19th and early 20th centuries, particularly by the military, due to its improved resistance to frequency analysis compared to simpler ciphers. 
				However, as cryptanalysis techniques advanced, the vulnerabilities of the Playfair Cipher were revealed, leading to its decline in favor of more secure systems. 
				Despite this, the Playfair Cipher remains an important historical method of encryption and is often studied to illustrate the concepts of digraph substitution and the evolution of encryption techniques.</p>
			</div>
		</div>
	);
}

export default PlayfairPage;