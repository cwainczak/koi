import React, {useState} from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {createTheme, ThemeProvider} from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';


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

const Post = (props) => {
    const [flag, setFlag] = useState(false);
    const [show, setShow] = useState(false);

    const handleLikeClick = () => {
        setFlag(!flag);
        // todo - increment like count for ths post
    };

    const handleCommentsClick = () => {
        setShow(prev => !prev)
    };

    const handleSubmitCommentClick = () => {
        // todo - add comment to the post
    };

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flexGrow: 1}}>
                    {/* user icon and name */}
                    <Grid container spacing={3}>
                        <Grid item xs="auto">
                            <Avatar {...shrinkUsername(props.username)}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body1" component="h1">{props.username}</Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    <Divider/>
                    <br/>
                    {/* post title and content */}
                    <Typography gutterBottom variant="h6" component="h2">{props.title}</Typography>
                    <Typography>{props.content}</Typography>
                    <br/>
                    <br/>
                    {/* like counter */}
                    <Typography variant="body2" component="h1">{props.likes} Likes</Typography>
                    <br/>
                    <Divider/>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color={flag ? "primary" : "secondary"}
                        onClick={handleLikeClick}
                    >
                        Like
                    </Button>
                    <Button
                        size="small"
                        color="secondary"
                        onClick={handleCommentsClick}
                    >
                        Comments
                    </Button>
                </CardActions>
                <Divider/>
                {/* comments section */}
                {show &&
                    <CardContent>
                        {/* comment text-field and button */}
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Add a comment!"
                                />
                            </Grid>
                            <Grid item alignItems="stretch" style={{display: "flex"}}>
                                <Button
                                    variant="contained"
                                    endIcon={<SendIcon/>}
                                    onClick={handleSubmitCommentClick}
                                >
                                    Comment
                                </Button>
                            </Grid>
                        </Grid>
                        {/* comments */}
                        {props.comments.map((comment) => (
                            <Grid>
                                <br/>
                                <Typography variant="body1" component="h1">
                                    {comment[0]}
                                </Typography>
                                <Typography variant="body2" component="h1">
                                    {comment[1]}
                                </Typography>
                            </Grid>
                        ))}
                    </CardContent>
                }
            </Card>
        </ThemeProvider>
    );
}

export default Post;
