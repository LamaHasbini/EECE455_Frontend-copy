import { Tooltip } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

function PlayfairPage() {
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
		</div>
	);
}

export default PlayfairPage;