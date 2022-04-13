import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";


const PostDialog = (props) => {
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
            <DialogTitle>Create Post</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    fullWidth
                />

                <TextField
                    id="content"
                    label="Content"
                    multiline
                    rows={10}
                    fullWidth
                />

                <Typography
                    id={"invalidPostEntry"}
                    fontSize={12}
                    color={"red"}
                    paddingTop={1.5}
                    textAlign={"center"}
                    hidden={true}
                >
                    Title and content are required.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={props.handleAction}>Post</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PostDialog;
