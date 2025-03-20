import {Button, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CipherForm = () => {
    return (
        <form>
            <Grid container direction="column" spacing={3} sx={{width: 400, margin: "0 auto"}}>
                <Grid>
                    <TextField
                        label="Enter Decoded Message"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{marginBottom: 2}}
                    />
                </Grid>

                <Grid container justifyContent="center" alignItems="center" spacing={1}>
                    <Grid>
                        <TextField
                            label="Enter Password"
                            fullWidth
                            variant="outlined"
                            sx={{marginBottom: 2}}
                        />
                    </Grid>
                    <Grid>
                        <Button variant="contained" color="primary" sx={{marginLeft: 1}}>
                            <ArrowUpwardIcon/>
                        </Button>
                    </Grid>
                    <Grid>
                        <Button variant="contained" color="secondary" sx={{marginLeft: 1}}>
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
                            variant="outlined"
                            sx={{marginBottom: 2}}
                        />
                    </div>
                </Grid>

                <Grid container justifyContent="center">
                    <Button variant="contained" color="primary" sx={{width: "100%"}}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CipherForm;