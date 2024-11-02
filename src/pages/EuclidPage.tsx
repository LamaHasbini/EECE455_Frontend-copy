import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Tooltip } from '@mui/material';


function ExtendedGCD() {
  return (
	<div style={{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	  //   minHeight: '100vh',
		padding: '20px',
		boxSizing: 'border-box'
	}}>
		<div style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
			<h1>Extended GCD</h1>
			<Tooltip 
			title="Instructions: Enter two integers to compute their greatest common divisor (GCD) along with the coefficients of Bézout's identity."
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
  )
}

export default ExtendedGCD;