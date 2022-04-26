import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";


const PostDialog = (props) => {

    const handleClick = () => {
        let entTitle = document.getElementById("title").value;
        let entContent = document.getElementById("content").value;
        let errDialog = document.getElementById("invalidPostEntry");

        props.handleAction(entTitle, entContent, errDialog);
    }

    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    fullWidth
                    defaultValue={props.postTitle}
                />

                <TextField
                    id="content"
                    label="Content"
                    multiline
                    rows={10}
                    fullWidth
                    defaultValue={props.postContent}
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
                <Button onClick={props.handleClose}>{props.button1}</Button>
                <Button onClick={handleClick}>{props.button2}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PostDialog;
