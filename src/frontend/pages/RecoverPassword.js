import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {removeWhiteSpace, validateEmail} from "../../backend/Util";
import {sendPasswordCode} from "../../backend/UserAccount";


const RecoverPassword = (props) => {
    const {history} = props;
    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(prev => !prev);
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
        });

        let entEmail = removeWhiteSpace(data.get("email"))
        let errDialog = document.getElementById("invalidCredentialsRecoverPass")

        if (entEmail === "") {
            errDialog.hidden = false
            errDialog.textContent = "Please enter your email"
        }
        else if (validateEmail(entEmail) === null) {
            errDialog.hidden = false
            errDialog.textContent = "Invalid email address!"
        } else {
            // disable button
            handleLoading();

            const result = await sendPasswordCode(entEmail)

            if (result.emailSent) {
                // pass the generated passcode to the /ResetPassword page
                const genPassCode = result.emailJSData.templateParams.passcode
                console.log("RecoverPassword.state.passcode: " + genPassCode)
                history.push({
                    pathname: "/ResetPassword",
                    state: {
                        userEmail: entEmail,
                        passcode: genPassCode
                    }
                })
            } else {
                if (!result.validEmail) {
                    errDialog.hidden = false
                    errDialog.textContent = "Invalid email address!"
                    // enable button
                    handleLoading();
                } else {
                    errDialog.hidden = false
                    errDialog.textContent = "Server error. Please try again later."
                    // enable button
                    handleLoading();
                }
            }
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
                    <Typography
                        variant="h3"
                        color="#e4b109"
                    >
                        Koi
                    </Typography>
                    <br/>
                    <br/>
                    <Avatar sx={{m: 1, bgcolor: '#e4b109'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Recover Password
                    </Typography>
                    <Container component="form" noValidate onSubmit={handleButtonClick} sx={{mt: 1}} maxWidth="sm">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <Typography id={"invalidCredentialsRecoverPass"} fontSize={12} color={"red"} paddingTop={1.5}
                                    textAlign={"center"} hidden={true}>

                        </Typography>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            loadingPosition="center"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send Code
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    variant="body2"
                                    onClick={() => {
                                        history.push("/SignIn");
                                    }}
                                >
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    );
}

export default RecoverPassword;
