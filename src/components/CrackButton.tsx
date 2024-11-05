import { Button } from "@mui/material";
import axios from "axios";

interface FuncProps {
    inputText: string;
    SetOutput: (value: string) => void;
    encryptionmethod: string;
}

const GetOutputAffine = async (inputText: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/crack/affine', {
            inputText,
            cipher: 'affine',
        });
        return response.data.encrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const CrackButton = ({ inputText, SetOutput, encryptionmethod }: FuncProps) => {
    const handleClick = async () => {
        let output = "";
        switch (encryptionmethod) {
            case "Affine":
                output = await GetOutputAffine(inputText);
                break;
            default:
                break;
        }
        SetOutput(output);
    };

    return (
        <Button 
            variant="contained" 
            size="large" 
            onClick={handleClick}
            sx={{
                backgroundColor: '#111B20',   
                color: 'white',       
                '&:hover': {
                    backgroundColor: 'black',  
                },
            }}
        >
            Crack
        </Button>
    );
};

export default CrackButton;