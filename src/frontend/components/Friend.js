import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
    const [anchorElOptions, setAnchorElOptions] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenOptionsMenu = (event) => {
        setAnchorElOptions(event.currentTarget);
    };

    const handleCloseOptionsMenu = () => {
        setAnchorElOptions(null);
    };

    const handelOpenDialog = () => {
        setAnchorElOptions(null);
        setIsOpen(true);
    }

    const handelCloseDialog = () => {
        setIsOpen(false);
    }

    const handelDialogAction = () => {
        setIsOpen(false);
        // todo - remove friend from user
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
                    subheader={props.friends + " mutual friends"}
                />
                <Menu
                    id="options-menu"
                    anchorEl={anchorElOptions}
                    open={Boolean(anchorElOptions)}
                    onClose={handleCloseOptionsMenu}
                >
                    <MenuItem onClick={handleCloseOptionsMenu}>View Profile</MenuItem>
                    <MenuItem onClick={handelOpenDialog}>Remove Friend</MenuItem>
                </Menu>
            </Card>

            <Confirmation
                isOpen={isOpen}
                handleClose={handelCloseDialog}
                handleAction={handelDialogAction}
                title="Remove Friend?"
                message={"Are you sure you want to remove " + props.username + " from being your friend?"}
                button1={"Cancel"}
                button2={"Remove"}
            />
        </ThemeProvider>
    );
}

export default Friend;
