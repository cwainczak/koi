import React from "react";
import Paper from "@mui/material/Paper";
import {InputBase} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const SearchField = (props) => {
    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={props.promptText}
            />
            <IconButton sx={{p: '10px'}} aria-label="search">
                <SearchIcon style={{color: "#b1b3b9"}}/>
            </IconButton>
        </Paper>
    );
}

export default SearchField;