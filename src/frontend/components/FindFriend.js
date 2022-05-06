import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";


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

const CurrentFriend = (props) => {
    const handleAddFriend = () => {
        // todo - add friend to user
        console.log(props.username)
        props.onClick(props.username)
    };

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar {...shrinkUsername(props.username)}/>
                    }
                    action={
                        <IconButton disabled={props.disabled}>
                            <AddIcon onClick={handleAddFriend}/>
                        </IconButton>
                    }
                    title={props.username}
                />
            </Card>
        </ThemeProvider>
    );
}

export default CurrentFriend;
