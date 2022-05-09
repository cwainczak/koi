import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";
import PostDialog from "../components/PostDialog";
import {doesContain, removeWhiteSpace, UserIDTEXTStrToArr, shuffleArray} from "../../backend/Util";
import {createUserPost, getPostComments, getUserFriendsPosts, likePost} from "../../backend/UserPost";
import {curUser} from "../../backend/UserObj";
import {Snackbar, Alert} from "@mui/material";


const Home = () => {
    // popup snackbar alert message
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleOpenSnackbar = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setIsSnackbarOpen(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpen(false);
    }

    // post dialog to create post
    const [isPostDialogOpen, setIsPostDialogOpen] = React.useState(false);
    const [postOBJs, setPostOBJs] = useState([]);

    useEffect(init, [])

    async function init(){
        await populateFeed()
    }

    async function populateFeed(){
        const posts = await getUserFriendsPosts(curUser.UserID)
        if (posts === -1) console.log("Something went wrong!") //error
        else if (posts.length === 0) setPostOBJs([])
        else {
            let stateUpdateArr = []
            for (let i = 0; i < posts.length; i++) {
                let curPost = posts[i];
                let comments = await getPostComments(curPost.PostID);
                let postIsLiked = doesContain(UserIDTEXTStrToArr(curPost.LikeIDs), curUser.UserID)
                console.log(curPost)
                let curPostOBJ = new PostObj(curPost.PostID, curPost.Username, curPost.Title, curPost.Content, curPost.Likes, comments, postIsLiked);
                stateUpdateArr.push(curPostOBJ);
            }
            setPostOBJs(stateUpdateArr);
        }
    }

    async function clickLike(postID) {
        const result = await likePost(postID, curUser.UserID)
        const finalResult = !result || !result.likeActionSucceeded
        finalResult ? console.log("Something went wrong!") : updateLikeCount(postID, result.likeCount)
    }

    function updateLikeCount(postID, likeCount){
        let stateUpdateArr = []
        for (let i = 0; i < postOBJs.length; i++){
            let curPost = postOBJs[i]
            if (curPost.postID === postID){
                curPost.likes = likeCount
                curPost.isLiked = !curPost.isLiked
            }
            stateUpdateArr.push(curPost)
        }
        setPostOBJs(stateUpdateArr)
    }

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
            } else {
                handleOpenSnackbar("warning", "Something went wrong! Your post was not created.");
                console.log("Something went wrong!");
            }
        }
    }

    return (
        <Container>
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
                        isLiked={postObj.isLiked}
                        disableOptionButton={true}
                    />
                    <br/>
                </>
            ))
            }

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
        </Container>
    );
};

export default Home;
