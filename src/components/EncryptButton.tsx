import { Button } from "@mui/material";

interface func {
    SetOutput? : string;
}

const EncryptButton = ({SetOutput} : func) => {
    return (
        <>
            <Button variant="contained" size="large">Encrypt</Button>
        </>
    )
}

export default EncryptButton;