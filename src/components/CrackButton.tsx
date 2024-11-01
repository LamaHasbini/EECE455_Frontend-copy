import { Button } from "@mui/material";

interface FuncProps {
    inputText: string;
    SetOutput: (value: string) => void;
    encryptionmethod: string;
}

const GetOutputAffine = (inputText: string) => {
    return `Cracked the ciphertext ${inputText}`;
};

const CrackButton = ({ inputText, SetOutput, encryptionmethod }: FuncProps) => {
    const handleClick = () => {
        let output = "";
        switch (encryptionmethod) {
            case "Affine":
                output = GetOutputAffine(inputText);
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