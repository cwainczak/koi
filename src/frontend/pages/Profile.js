import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Button from "@mui/material/Button";


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = () => {
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
        // todo - delete account
    }

    return (
        <div>
            <Container>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                {...shrinkUsername("Username")}
                                sx={{width: 100, height: 100, bgcolor: "#e4b109"}}
                            />
                        }
                        action={
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handelOpenDialog}
                            >
                                Delete Account
                            </Button>

                            // <IconButton>
                            //     <MoreVertIcon onClick={handleOpenOptionsMenu}/>
                            // </IconButton>
                        }
                        title={
                            <Typography variant="h3">Username</Typography>
                        }
                        subheader={
                            <Grid container spacing={2}>
                                <Grid item xs="auto">
                                    <Typography variant="subtitle1">10 friends</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Typography variant="subtitle1">-</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Typography variant="subtitle1">5 posts</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Typography variant="subtitle1">-</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Typography variant="subtitle1">15 comments</Typography>
                                </Grid>
                            </Grid>
                        }
                    />
                    <Menu
                        id="options-menu"
                        anchorEl={anchorElOptions}
                        open={Boolean(anchorElOptions)}
                        onClose={handleCloseOptionsMenu}
                    >
                        <MenuItem onClick={handelOpenDialog}>Delete Account</MenuItem>
                    </Menu>
                </Card>

                <ConfirmationDialog
                    isOpen={isOpen}
                    handleClose={handelCloseDialog}
                    handleAction={handelDialogAction}
                    title="Delete Account?"
                    message={"Are you sure you want to delete your account? All your data such as posts, comments, and likes will be permanently removed."}
                    button1={"Cancel"}
                    button2={"Delete"}
                />
            </Container>
        </div>
    );
};

export default Profile;
