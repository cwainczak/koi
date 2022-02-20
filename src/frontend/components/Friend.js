import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Confirmation from "../components/Confirmation";


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#e4b109"
        },
        secondary: {
            main: "#b1b3b9"
        }
    }
});

const Friend = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar {...shrinkUsername(props.username)}/>
                    }
                    action={
                        <Confirmation
                            title="Remove Friend?"
                            text={"Are you sure you want to remove " + props.username + " from being your friend?"}
                        />
                    }
                    title={props.username}
                    subheader={props.friends + " mutual friends"}
                />
            </Card>
        </ThemeProvider>
    );
}

export default Friend;
