import React from "react";
import NavBar from "./components/NavBar";
import Toolbar from "@mui/material/Toolbar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";


const App = () => {
    return (
        <div>
            <NavBar/>
            {/* empty toolbar to push content away fom underneath the navbar */}
            <Toolbar/>
            <br/>

            <Switch>
                <Route exact from="/Home" render={props => <Home {...props} />} />
                <Route exact from="/Friends" render={props => <Friends {...props} />} />
                <Route exact path="/chats" render={props => <Chats {...props} />} />
                <Route exact path="/Profile" render={props => <Profile {...props} />} />
            </Switch>
        </div>
    );
}

export default App;
