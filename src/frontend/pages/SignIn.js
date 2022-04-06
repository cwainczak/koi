import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login } from "./../../backend/User"
import { removeWhiteSpace } from "../../backend/Util";


const SignIn = (props) => {
    const {history} = props;
    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(prev => !prev);
    }

    let sucPassReset = false

    try {
        sucPassReset = history.location.state.passReset
    } catch(e) {
        console.log(e)
    }

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // logic for checking entered credentials
        let entUser = removeWhiteSpace(data.get("username"))
        let entPass = removeWhiteSpace(data.get("password"))
        let errDialog = document.getElementById("invalidCredentialsLogin")
        if (entUser === "" || entPass === ""){
            errDialog.hidden = false
            errDialog.textContent = "Please fill in all fields"
        }
        else {
            // login returns -1 if user doesn't exist, and UserID if user does exist
            const curUserID = await login(entUser, entPass)
            console.log(curUserID)
            if (curUserID !== -1){
                // disable button
                handleLoading();

                history.push("/Home")
            }
            else {
                errDialog.hidden = false
                errDialog.textContent = "Invalid Username or Password"
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
                        Sign In
                    </Typography>
                    <Container component="form" noValidate onSubmit={handleButtonClick} sx={{mt: 1}} maxWidth="sm">
                        <Typography id={"passResetMessage"} fontSize={12} color={"green"} paddingTop={1.5} textAlign={"center"} hidden={!sucPassReset}>
                            Your password has been reset!
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
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
                        <Typography id={"invalidCredentialsLogin"} fontSize={12} color={"red"} paddingTop={1.5} textAlign={"center"} hidden={true}>

                        </Typography>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            loadingPosition="center"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    variant="body2"
                                    onClick={() => {
                                        history.push("/RecoverPassword");
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    variant="body2"
                                    onClick={() => {
                                        history.push("/SignUp");
                                    }}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    );
}

export default SignIn;
