import React from "react";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ConfirmationDialog from "./ConfirmationDialog";
import PostDialog from "./PostDialog";
import {removeWhiteSpace} from "../../backend/Util";
import {curUser} from "../../backend/UserObj";
import {createPostComment, deletePost} from "../../backend/UserPost";


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
    // likes
    const [isLiked, setIsLiked] = React.useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        // todo - increment like count for post
        props.likePost(props.postID)
    }

    // comments
    const [showComments, setShowComments] = React.useState(false);

    const handleCommentsClick = () => {
        setShowComments(prev => !prev)
    }

    const handleSubmitCommentClick = async () => {
        let entContent = removeWhiteSpace(document.getElementById(props.contentID).value);
        let errDialog = document.getElementById(props.errDialogID);

        console.log({
            postID: props.postID,
            commenterID: curUser.UserID,
            content: entContent
        });

        if (entContent === "") {
            errDialog.textContent = "Comment is required.";
            errDialog.hidden = false;
        } else if (entContent.length > 1000) {
            errDialog.textContent = "Comment is too long. (max: 1000 characters)";
            errDialog.hidden = false;
        } else {
            let isSuccess = await createPostComment(props.postID, curUser.UserID, entContent);

            if (isSuccess) {
                errDialog.hidden = true;
                document.getElementById(props.contentID).value = "";
                props.init();
            } else {
                console.log("Something went wrong!")
            }
        }
    }

    // options menu (update/delete post)
    const [anchorElOptions, setAnchorElOptions] = React.useState(false);

    const handleOpenOptionsMenu = (event) => {
        setAnchorElOptions(event.currentTarget);
    }

    const handleCloseOptionsMenu = () => {
        setAnchorElOptions(false);
    }

    // confirmation dialog to delete post
    const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = React.useState(false);

    const handelOpenConfirmationDialog = () => {
        setAnchorElOptions(false);
        setConfirmationDialogIsOpen(true);
    }

    const handelCloseConfirmationDialog = () => {
        setConfirmationDialogIsOpen(false);
    }

    const handelConfirmationDialogAction = async () => {
        setConfirmationDialogIsOpen(false);
        let isSuccess = await deletePost(props.postID);

        if (isSuccess) {
            props.showDeletionDialog("success", "Your post has been deleted!");
            props.init();
        } else {
            props.showDeletionDialog("warning", "Something went wrong! Your post was not deleted.");
            console.log("Something went wrong!");
        }
    }

    // post dialog to update post
    const [isPostDialogOpen, setIsPostDialogOpen] = React.useState(false);

    const handleOpenPostDialog = () => {
        setAnchorElOptions(false);
        setIsPostDialogOpen(true);
        // todo - fill post dialog with data from the post (ie. title and content)
    }

    const handleClosePostDialog = () => {
        setIsPostDialogOpen(false);
    }

    const handlePostDialogAction = async (title, content, errDialog) => {
        let entTitle = removeWhiteSpace(title);
        let entContent = removeWhiteSpace(content);
        setIsPostDialogOpen(false);
        // todo - update post
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardHeader
                    avatar={
                        <Avatar {...shrinkUsername(props.username)}/>
                    }
                    action={
                        <div hidden={props.disableOptionButton}>
                            <IconButton>
                                <MoreVertIcon onClick={handleOpenOptionsMenu}/>
                            </IconButton>
                        </div>
                    }
                    title={
                        <Typography gutterBottom variant="body1" component="h1">
                            {props.username}
                        </Typography>
                    }
                />

                <CardContent sx={{flexGrow: 1}}>
                    <Divider/>
                    <br/>
                    {/* post title and content */}
                    <Typography gutterBottom variant="h6" component="h2">{props.title}</Typography>
                    <Typography>{props.content}</Typography>
                    <br/>
                    <br/>
                    {/* like counter */}
                    <Typography variant="body2" component="h1">{props.likes} Like(s)</Typography>
                    <br/>
                    <Divider/>
                </CardContent>

                <CardActions>
                    <Button
                        size="small"
                        color={props.isLiked ? "primary" : "secondary"}
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
                {showComments &&
                    <CardContent>
                        {/* error message */}
                        <Typography
                            id={props.errDialogID}
                            fontSize={12}
                            color={"red"}
                            paddingTop={1.5}
                            textAlign={"center"}
                            hidden={true}
                        >
                            Comment is required.
                        </Typography>
                        {/* comment text-field and button */}
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TextField
                                    //id="commentField"
                                    id={props.contentID}
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
                        {props.comments.map((comment, index) => (
                            <Grid key={index}>
                                <br/>
                                <Typography variant="body1" component="h1">
                                    {comment.Username}
                                </Typography>
                                <Typography variant="body2" component="h1">
                                    {comment.Content}
                                </Typography>
                            </Grid>
                        ))}
                    </CardContent>
                }
            </Card>

            <Menu
                id="options-menu"
                anchorEl={anchorElOptions}
                open={Boolean(anchorElOptions)}
                onClose={handleCloseOptionsMenu}
            >
                {/*<MenuItem onClick={handleOpenPostDialog}>Update</MenuItem>*/}
                <MenuItem onClick={handelOpenConfirmationDialog}>Delete</MenuItem>
            </Menu>

            {/* todo - change sample title and content to the title and content from the post being updated */}
            <PostDialog
                title="Update Post"
                postTitle="This is my title"
                postContent="This is my content"
                button1="Cancel"
                button2="Update"
                isOpen={isPostDialogOpen}
                handleClose={handleClosePostDialog}
                handleAction={handlePostDialogAction}
            />

            <ConfirmationDialog
                isOpen={confirmationDialogIsOpen}
                handleClose={handelCloseConfirmationDialog}
                handleAction={handelConfirmationDialogAction}
                title="Delete Post?"
                message="Are you sure you want to delete this post? Comments and likes related to this post will also be deleted."
                button1="Cancel"
                button2="Delete"
            />
        </ThemeProvider>
    );
}

export default Post;
