import React from "react";
import NavBar from "./frontend/components/NavBar";
import Toolbar from "@mui/material/Toolbar";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Redirect, Route, Switch} from "react-router-dom";
import SignUp from "./frontend/pages/SignUp";
import SignIn from "./frontend/pages/SignIn";
import RecoverPassword from "./frontend/pages/RecoverPassword";
import ResetPassword from "./frontend/pages/ResetPassword";
import Home from "./frontend/pages/Home";
import Friends from "./frontend/pages/Friends";
import Profile from "./frontend/pages/Profile";


const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#e4b109"
        },
        background: {
            default: "#4b5059"
        }
    }
});

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                {/* starting at the sign-in in page */}
                <Route exact from="/" render={props => <SignIn {...props} />}>
                    <Redirect to="/SignIn"/>
                </Route>

                <Switch>
                    <Route exact from="/SignIn" render={props => <SignIn {...props} />}/>
                    <Route exact from="/SignUp" render={props => <SignUp {...props} />}/>
                    <Route exact from="/RecoverPassword" render={props => <RecoverPassword {...props} />}/>
                    <Route exact from="/ResetPassword" render={props => <ResetPassword {...props} />}/>

                    <div>
                        <NavBar/>
                        {/* empty toolbar to push content away fom underneath the navbar */}
                        <Toolbar/>
                        <br/>

                        <Switch>
                            <Route exact from="/Home" render={props => <Home {...props} />}/>
                            <Route exact from="/Friends" render={props => <Friends {...props} />}/>
                            <Route exact path="/Profile" render={props => <Profile {...props} />}/>
                        </Switch>
                    </div>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

export default App;
