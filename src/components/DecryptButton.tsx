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
        if (encryptionmethod === "Affine") {
            const output = GetOutputAffine(cipherText, key || "");
            SetOutput(output);
        }
    };

    return (
        <Button variant="contained" size="large" onClick={handleClick}>
            Decrypt
        </Button>
    );
};

export default DecryptButton;