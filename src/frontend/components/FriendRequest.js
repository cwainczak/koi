import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


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

const FriendRequest = (props) => {
    const [anchorElOptions, setAnchorElOptions] = React.useState(null);

    const handleOpenOptionsMenu = (event) => {
        setAnchorElOptions(event.currentTarget);
    };

    const handleCloseOptionsMenu = () => {
        setAnchorElOptions(null);
    };

    const handleAccept = () => {
        setAnchorElOptions(null);
        // todo - add friend to user and remove from list of requests
        props.onAcceptFR(props.username)
    };

    const handleDeny = () => {
        setAnchorElOptions(null);
        // todo - remove friend from lists of requests
        props.onDenyFR(props.username)
    };

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar {...shrinkUsername(props.username)}/>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon onClick={handleOpenOptionsMenu}/>
                        </IconButton>
                    }
                    title={props.username}
                />
                <Menu
                    id="options-menu"
                    anchorEl={anchorElOptions}
                    open={Boolean(anchorElOptions)}
                    onClose={handleCloseOptionsMenu}
                >
                    <MenuItem onClick={handleAccept}>Accept</MenuItem>
                    <MenuItem onClick={handleDeny}>Deny</MenuItem>
                </Menu>
            </Card>
        </ThemeProvider>
    );
}

export default FriendRequest;
