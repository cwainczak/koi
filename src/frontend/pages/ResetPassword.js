import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {removeWhiteSpace} from "../../backend/Util";
import {resetPassword} from "../../backend/UserLogin";


const ResetPassword = (props) => {
    const {history} = props;
    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(prev => !prev);
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const entCode = removeWhiteSpace(data.get("code"))
        const entPass = removeWhiteSpace(data.get("newPassword"))
        const entConfPass = removeWhiteSpace(data.get("confirmPassword"))

        console.log({
            code: entCode,
            password: entPass,
            confirmPassword: entConfPass,
        })

        let errDialog = document.getElementById("invalidCredentialsRecoverPass")

        const recPassState = history.location.state
        const userEmail = recPassState.userEmail
        const genPassCode = recPassState.passcode.toString()

        if (entCode === "" || entPass === "" || entConfPass === "") {
            errDialog.hidden = false
            errDialog.textContent = "Please fill in all fields"
        } else if (entCode !== genPassCode) {
            errDialog.hidden = false
            errDialog.textContent = "Invalid passcode!"
        } else if (entPass !== entConfPass) {
            errDialog.hidden = false
            errDialog.textContent = "Passwords don't match"
        } else {
            // disable button
            handleLoading();

            console.log("Correct passcode and passwords match!")
            const passResetRes = await resetPassword(userEmail, entPass)

            // if there is an error fetching, display error message and immediately return
            if (!passResetRes) {
                errDialog.hidden = false
                errDialog.textContent = "Server error. Please try again later!"
                return
            }
            history.push({
                pathname: "/SignIn",
                state: {
                    passReset: passResetRes
                }
            })
        }
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/koi-fishes-minimal-4k-vh.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#e4b109'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Container component="form" noValidate onSubmit={handleButtonClick} sx={{mt: 1}} maxWidth="sm">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="Code"
                            name="code"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="New Password"
                            type="password"
                            name="newPassword"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                        />
                        <Typography id={"invalidCredentialsRecoverPass"} fontSize={12} color={"red"} paddingTop={1.5}
                                    textAlign={"center"} hidden={true}>
                            Invalid Something
                        </Typography>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            loadingPosition="center"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Reset Password
                        </LoadingButton>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ResetPassword;
