import React from "react";
import NavBar from "./components/NavBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";


const App = () => {
    return (
        <div>
            <NavBar/>
            // empty toolbar to push content away fom underneath the navbar
            <Toolbar/>

            <Typography variant="h1">Hello World</Typography>
        </div>
    );
}

export default App;
