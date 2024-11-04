import { Button } from "@mui/material";
import axios from "axios";

interface FuncProps {
    inputText: string;
    SetOutput: (value: string) => void;
    keyString: string;  
    encryptionmethod: string;
    alphabet?: string;
}

const GetOutputVigenere = (inputText :string , keyString: string, alphabet: string) =>
{
    return `Encrypted the plaintext ${inputText} with keyString=${keyString}, alphabet=${alphabet}`;
};

const GetOutputAffine = (inputText: string, keyString: string, alphabet: string) => {
    const [aValue, bValue] = keyString.split(",");  
    return `Encrypted the plaintext ${inputText} with A=${aValue}, B=${bValue}, alphabet=${alphabet}`;
};

const GetOutputMonoAlphabetic = async (inputText: string, keyString: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/encrypt/mono_alphabetic', {
            inputText,
            keyString,
            cipher: 'mono_alphabetic',
        });
        return response.data.encrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const GetOutputHill = (inputText: string, keyString: string, alphabet: string) => {
    return `Encrypted the plaintext ${inputText} with keyString=${keyString}, alphabet=${alphabet}`;
}

const GetOutputPlayfair = (inputText: string, keyString: string, alphabet: string) => {
    return `Encrypted the plaintext ${inputText} with keyString=${keyString}, alphabet=${alphabet}`;    
}


const EncryptButton = ({ inputText, SetOutput, keyString, encryptionmethod, alphabet }: FuncProps) => {
    const handleClick = async () => {
        let output = "";
        switch (encryptionmethod) {
            case "Affine":
                output = await GetOutputAffine(inputText, keyString, alphabet || "");
                break;
                case "Mono-Alphabetic":
                    output = await GetOutputMonoAlphabetic(inputText, keyString)                    
                    break;
                case "Vigenere":
                    output = await GetOutputVigenere(inputText, keyString, alphabet || "")
                    break;
                case "Hill":
                    output = await GetOutputHill(inputText, keyString, alphabet || "");
                    break;
                case "Playfair":
                    output = await GetOutputPlayfair(inputText, keyString, alphabet || "");
                    break;
                case "Extended GCD":
                    // Implement the decryption logic here
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
            Encrypt
        </Button>
    );
};

export default EncryptButton;