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
import {createUserAcc, registrationCheck} from "../../backend/UserLogin"
import {validateEmail, removeWhiteSpace} from "../../backend/Util"


const SignUp = (props) => {
    const {history} = props;
    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(prev => !prev);
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let entEmail = removeWhiteSpace(data.get("email"))
        let entUser = removeWhiteSpace(data.get("username"))
        let entPass = removeWhiteSpace(data.get("password"))
        let entConfPass = removeWhiteSpace(data.get("confirm password"))

        console.log({
            email: entEmail,
            username: entUser,
            password: entPass,
            confirmpassword: entConfPass
        });

        let errDialog = document.getElementById("invalidCredentialsRegister")

        // if any of the fields are empty/have whitespace
        if (entEmail === "" || entUser === "" || entPass === "" || entConfPass === "") {
            errDialog.hidden = false
            errDialog.textContent = "Please fill in all fields"
        } else if (entPass !== entConfPass) {
            errDialog.hidden = false
            errDialog.textContent = "Passwords don't match"
        } else if (validateEmail(entEmail) === null) {
            errDialog.hidden = false
            errDialog.textContent = "Invalid email address"
        } else {
            let regCheckRes = await registrationCheck(entEmail, entUser)
            let isEmailTaken = regCheckRes.emailTaken
            let isUsernameTaken = regCheckRes.usernameTaken

            if (isEmailTaken) {
                errDialog.hidden = false
                errDialog.textContent = "Email already in use. Please reset password."
            } else if (isUsernameTaken) {
                errDialog.hidden = false
                errDialog.textContent = "Username already taken"
            } else {
                let isSuccess = await createUserAcc(entEmail, entUser, entPass);

                if (isSuccess) {
                    // disabling button
                    handleLoading();

                    history.push("/Home")
                } else {
                    console.log("Something went wrong!")
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
                    <Avatar sx={{m: 1, bgcolor: '#e4b109'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                        />
                        <Typography id={"invalidCredentialsRegister"} fontSize={12} color={"red"} paddingTop={1.5}
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
                            Sign Up
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

export default SignUp;
