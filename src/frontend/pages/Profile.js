import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PostObj from "../../backend/PostObj";
import Post from "../components/Post";
import PostDialog from "../components/PostDialog";
import {removeWhiteSpace, doesContain, UserIDTEXTStrToArr} from "../../backend/Util";
import {
    createUserPost,
    getUserPosts,
    getPostComments,
    likePost,
    getNumUserComments,
    getNumUserFriends
} from "../../backend/UserPost";
import {deleteUserAcc} from "../../backend/UserAccount";
import {curUser} from "../../backend/UserObj";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = (props) => {
    const {history} = props;

    // popup snackbar alert message
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleOpenSnackbar = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setIsSnackbarOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpen(false);
    };

    const [postOBJs, setPostOBJs] = useState([]);
    const [numFriends, setNumFriends] = useState([]);
    const [numComments, setNumComments] = useState([]);

    function updateLikeCount(postID, likeCount) {
        let stateUpdateArr = []
        for (let i = 0; i < postOBJs.length; i++) {
            let curPost = postOBJs[i]
            if (curPost.postID === postID) {
                curPost.likes = likeCount
                curPost.isLiked = !curPost.isLiked
            }
            stateUpdateArr.push(curPost)
        }
        setPostOBJs(stateUpdateArr)
    }

    async function init() {
        let stateUpdateArr = [];
        const posts = await fetchPosts();

        console.log(posts);

        for (let i = posts.length - 1; i >= 0; i--) {
            let curPost = posts[i];
            let comments = await fetchComments(curPost.PostID);
            console.log(comments);

            let postIsLiked = doesContain(UserIDTEXTStrToArr(curPost.LikeIDs), curUser.UserID)

            let curPostOBJ = new PostObj(curPost.PostID, curUser.Username, curPost.Title, curPost.Content, curPost.Likes, comments, postIsLiked);

            stateUpdateArr.push(curPostOBJ);
        }
        setPostOBJs(stateUpdateArr);

        let numFriendsRes = await getNumUserFriends(curUser.UserID);
        setNumFriends(numFriendsRes.numFriends);

        let numComments = await getNumUserComments(curUser.UserID);
        setNumComments(numComments);
    }

    async function fetchPosts() {
        return await getUserPosts(curUser.UserID);
    }

    async function fetchComments(postID) {
        return await getPostComments(postID);
    }

    useEffect(init, [])

    async function clickLike(postID) {
        const result = await likePost(postID, curUser.UserID)
        const finalResult = !result || !result.likeActionSucceeded
        finalResult ? console.log("Something went wrong!") : updateLikeCount(postID, result.likeCount)
    }

    // confirmation dialog to delete account
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);

    const handelOpenConfirmationDialog = () => {
        setIsConfirmationDialogOpen(true);
    }

    const handelCloseConfirmationDialog = () => {
        setIsConfirmationDialogOpen(false);
    }

    const handelConfirmationDialogAction = async () => {
        let isSuccess = await deleteUserAcc(curUser.UserID);

        if (isSuccess) {
            setIsConfirmationDialogOpen(false);
            history.push("/SignIn")
        } else {
            console.log("Something went wrong!");
        }
    }

    // post dialog to create post
    const [isPostDialogOpen, setIsPostDialogOpen] = React.useState(false);

    const handleOpenPostDialog = () => {
        setIsPostDialogOpen(true);
    }

    const handleClosePostDialog = () => {
        setIsPostDialogOpen(false);
    }

    const handlePostDialogAction = async (title, content, errDialog) => {
        let entTitle = removeWhiteSpace(title);
        let entContent = removeWhiteSpace(content);

        console.log({
            title: entTitle,
            content: entContent
        });

        if (entTitle === "" || entContent === "") {
            errDialog.textContent = "Title and content are required.";
            errDialog.hidden = false;
        } else if (entTitle.length > 45) {
            errDialog.textContent = "Title is too long. (max: 45 characters)";
            errDialog.hidden = false;
        } else if (entContent.length > 1000) {
            errDialog.textContent = "Content is too long. (max: 1000 characters)";
            errDialog.hidden = false;
        } else {
            setIsPostDialogOpen(false);
            let isSuccess = await createUserPost(curUser.UserID, entTitle, entContent);

            if (isSuccess) {
                handleOpenSnackbar("success", "Your post has been created!");
                await init();
            } else {
                handleOpenSnackbar("warning", "Something went wrong! Your post was not created.");
                console.log("Something went wrong!");
            }
        }
    }

    return (
        <div>
            <Container>
                <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                    <CardContent>
                        <Avatar
                            {...shrinkUsername(curUser.Username)}
                            sx={{width: 100, height: 100, bgcolor: "#e4b109", fontSize: "45px"}}
                        />
                    </CardContent>

                    <Typography variant="h3">{curUser.Username}</Typography>

                    <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">{numFriends} friend(s)</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">{postOBJs.length} post(s)</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">{numComments.length} comment(s)</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <br/>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handelOpenConfirmationDialog}
                    >
                        Delete Account
                    </Button>
                </Box>

                <br/>
                <br/>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleOpenPostDialog}
                >
                    Create New Post
                </Button>

                <br/>
                <br/>

                {postOBJs.map((postObj, index) => (
                    <>
                        <Post
                            key={index}
                            contentID={`commentContent${index}`}
                            errDialogID={`errDialog${index}`}
                            postID={postObj.postID}
                            username={postObj.username}
                            title={postObj.title}
                            content={postObj.content}
                            likes={postObj.likes}
                            comments={postObj.comments}
                            likePost={clickLike}
                            init={init}
                            showDeletionDialog={handleOpenSnackbar}
                            isLiked={postObj.isLiked}
                        />
                        <br/>
                    </>
                ))
                }

            </Container>

            <ConfirmationDialog
                isOpen={isConfirmationDialogOpen}
                handleClose={handelCloseConfirmationDialog}
                handleAction={handelConfirmationDialogAction}
                title="Delete Account?"
                message={"Are you sure you want to delete your account? All your data such as posts, comments, and likes will be permanently removed."}
                button1={"Cancel"}
                button2={"Delete"}
            />

            <PostDialog
                title="Create Post"
                button1="Cancel"
                button2="Post"
                isOpen={isPostDialogOpen}
                handleClose={handleClosePostDialog}
                handleAction={handlePostDialogAction}
            />

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: "center"}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    variant="filled"
                    severity={alertSeverity}
                    sx={{width: '100%'}}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;
