import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";


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
                        <IconButton>
                            <PersonRemoveIcon style={{color: "#b1b3b9"}}/>
                        </IconButton>
                    }
                    title={props.username}
                    subheader={props.friends + " mutual friends"}
                />
            </Card>
        </ThemeProvider>
    );
}

export default Friend;
