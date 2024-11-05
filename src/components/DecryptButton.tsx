import { Button } from "@mui/material";
import axios from "axios";

interface FuncProps {
    inputText: string;
    SetOutput: (value: string) => void;
    keyString: string; 
    encryptionmethod: string;
    alphabet?: string;
}

const GetOutputVigenere = async (inputText :string , keyString: string, alphabet: string) =>
{
    try {
        const response = await axios.post('http://127.0.0.1:5000/decrypt/vigenere', {
            inputText,
            keyString,
            alphabet,
            cipher: 'vigenere',
        });
        return response.data.decrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const GetOutputAffine = async (inputText: string, keyString: string, alphabet: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/decrypt/affine', {
            inputText,
            keyString,
            alphabet,
            cipher: 'affine',
        });
        return response.data.decrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const GetOutputMonoAlphabetic = async (inputText: string, keyString: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/decrypt/mono_alphabetic', {
            inputText,
            keyString,
            cipher: 'mono_alphabetic',
        });
        return response.data.decrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const GetOutputHill = async (inputText: string, keyString: string, alphabet: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/decrypt/hill', {
            inputText,
            keyString,
            alphabet, 
            cipher: 'hill',
        });
        return response.data.decrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const GetOutputPlayfair = async (inputText: string, keyString: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/decrypt/playfair', {
            inputText,
            keyString,
            cipher: 'playfair',
        });
        return response.data.decrypted_text;
      } catch (err) {
        return "ERROR";
      }
};

const DecryptButton =  ({ inputText, SetOutput, keyString, encryptionmethod, alphabet }: FuncProps) => {
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
                output = await GetOutputPlayfair(inputText, keyString || "");
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
            Decrypt
        </Button>
    );
};

export default DecryptButton;