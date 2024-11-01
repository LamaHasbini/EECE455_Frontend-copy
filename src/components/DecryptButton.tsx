import { Button } from "@mui/material";

interface FuncProps {
    cipherText: string;
    SetOutput: (value: string) => void;
    key?: string;
    encryptionmethod: string;
}

const GetOutputAffine = (cipherText: string, key: string) => {
    // Implement the decryption logic here
    return "Decrypted Output";
};

const DecryptButton = ({ cipherText, SetOutput, key, encryptionmethod }: FuncProps) => {
    const handleClick = () => {
        switch (encryptionmethod) {
            case "Affine":
                const output = GetOutputAffine(cipherText, key || "");
                SetOutput(output);
                break;
            case "Mono-Alphabetic":
                // Implement the decryption logic here
                break;
            case "Vigenere":
                // Implement the decryption logic here
                break;
            case "Hill":
                // Implement the decryption logic here
                break;
            case "Playfair":
                // Implement the decryption logic here
                break;
            case "Extended GCD":
                // Implement the decryption logic here
                break;
            default:
                
        }
    };

    return (
        <Button variant="contained" size="large" onClick={handleClick}>
            Decrypt
        </Button>
    );
};

export default DecryptButton;