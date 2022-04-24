import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ConfirmationDialog from "../components/ConfirmationDialog";


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = () => {
    const [anchorElOptions, setAnchorElOptions] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);

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
                <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                    <CardContent>
                        <Avatar
                            {...shrinkUsername("Username")}
                            sx={{width: 100, height: 100, bgcolor: "#e4b109"}}
                        />
                    </CardContent>

                    <Typography variant="h3">Username</Typography>

                    <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x friends</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x posts</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x comments</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <br/>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handelOpenDialog}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Container>

            <ConfirmationDialog
                isOpen={isOpen}
                handleClose={handelCloseDialog}
                handleAction={handelDialogAction}
                title="Delete Account?"
                message={"Are you sure you want to delete your account? All your data such as posts, comments, and likes will be permanently removed."}
                button1={"Cancel"}
                button2={"Delete"}
            />
        </div>
    );
};

export default Profile;
