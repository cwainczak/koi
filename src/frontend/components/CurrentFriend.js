import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ConfirmationDialog from "./ConfirmationDialog";


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
    const [anchorElOptions, setAnchorElOptions] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenOptionsMenu = (event) => {
        setAnchorElOptions(event.currentTarget);
    };

    const handleCloseOptionsMenu = () => {
        setAnchorElOptions(null);
    };

    const handleOpenDialog = () => {
        setAnchorElOptions(null);
        setIsOpen(true);
    }

    const handleCloseDialog = () => {
        setIsOpen(false);
    }

    const handleDialogAction = () => {
        setIsOpen(false);
        // todo - remove friend from user
        props.removeFriend(props.username)
    }

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
                    <MenuItem onClick={handleOpenDialog}>Remove Friend</MenuItem>
                </Menu>
            </Card>

            <ConfirmationDialog
                isOpen={isOpen}
                handleClose={handleCloseDialog}
                handleAction={handleDialogAction}
                title="Remove Friend?"
                message={"Are you sure you want to remove " + props.username + " from being your friend?"}
                button1={"Cancel"}
                button2={"Remove"}
            />
        </ThemeProvider>
    );
}

export default CurrentFriend;
