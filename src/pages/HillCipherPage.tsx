import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Tooltip } from '@mui/material';

function HillCipherPage()
{
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
            <h1>Hill Cipher</h1>
                <Tooltip 
                title="Instructions: Enter the key matrix for the Hill Cipher. The matrix should be invertible and its size should match the block size of the plaintext."
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

export default HillCipherPage;