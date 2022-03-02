import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


const ConfirmationDialog = (props) => {
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>{props.button1}</Button>
                <Button onClick={props.handleAction}>{props.button2}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
