import {Button, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {submitMessageForEncryption, submitMessageForTranscription} from "../../store/Cipher/CipherThunks.ts";
import {IData} from "../../types";
import {
    selectDecodedMessage,
    selectEncodeMessage,
    selectLoading
} from "../../store/Cipher/CipherSlice.ts";

const initialState: IData = {
    password: "",
    message: "",
}

const CipherForm = () => {
    const [form, setForm] = useState(initialState);
    const [encodeMessage, setEncodeMessage] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();

    const encryptedMessage = useAppSelector(selectEncodeMessage);
    const decryptedMessage = useAppSelector(selectDecodedMessage);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        setEncodeMessage(encryptedMessage);
    }, [encryptedMessage]);

    useEffect(() => {
        setForm({password: "", message: decryptedMessage});
    }, [decryptedMessage]);

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForm(initialState);
    };

    const encryptMessage = async () => {
        if(form.message.trim().length === 0 || form.password.trim().length === 0){
            alert("Please, enter both message and password");
            return;
        }
        await dispatch(submitMessageForEncryption(form));
        setPassword(form.password);
        setForm(initialState);
    };

    const messageDecoding = async () => {
        if (!encryptedMessage) {
            alert("No encoded message available.");
            return;
        }

        if (password !== form.password) {
            alert("Incorrect password");
            return;
        }

        if(encodeMessage.trim() === ""){
            alert("Please enter a coded message");
            return;
        }

        await dispatch(submitMessageForTranscription({...form, message: encodeMessage}));
        setEncodeMessage("");
        setPassword("");
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
        if(name === "encodeMessage") {
           setEncodeMessage(value);
        }
    };

    return (
        <form onSubmit={onSubmitForm}>
            <Grid container direction="column" spacing={3} sx={{width: 400, margin: "0 auto"}}>
                <Grid>
                    <TextField
                        label="Enter Decoded Message"
                        fullWidth
                        multiline
                        onChange={onChangeInput}
                        rows={4}
                        value={form.message}
                        required
                        disabled={loading}
                        name="message"
                        variant="outlined"
                        sx={{marginBottom: 2}}
                    />
                </Grid>

                <Grid container justifyContent="center" alignItems="center" spacing={1}>
                    <Grid>
                        <TextField
                            label="Enter Password"
                            fullWidth
                            onChange={onChangeInput}
                            name="password"
                            required
                            disabled={loading}
                            value={form.password}
                            variant="outlined"
                            sx={{marginBottom: 2}}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={messageDecoding}
                            sx={{marginLeft: 1}}
                        ><ArrowUpwardIcon/>
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={encryptMessage}
                            sx={{marginLeft: 1}}>
                            <ArrowDownwardIcon/>
                        </Button>
                    </Grid>
                </Grid>

                <Grid>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <TextField
                            label="Enter Encoded Message"
                            fullWidth
                            multiline
                            rows={4}
                            disabled={loading}
                            value={encodeMessage}
                            onChange={onChangeInput}
                            name="encodeMessage"
                            variant="outlined"
                            sx={{marginBottom: 2}}
                        />
                    </div>
                </Grid>
            </Grid>
        </form>
    );
};

export default CipherForm;