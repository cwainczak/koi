import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";
import PostDialog from "../components/PostDialog";
import {removeWhiteSpace} from "../../backend/Util";
import {createUserPost} from "../../backend/UserPost";
import {curUser} from "../../backend/UserObj";
import {Snackbar, Alert} from "@mui/material";


let posts = [new PostObj(1, "username 1", "title 1", "content 1", 1, [["username 1", "comment 1"], ["username 2", "comment 2"]]),
    new PostObj(2, "username 2", "title 2", "content 2", 1, [["username 1", "comment 1"], ["username 2", "comment 2"]])]


const Home = () => {
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

            {posts.map((post, index) => (
                <>
                    <Post
                        key={index}
                        username={post.username}
                        title={post.title}
                        content={post.content}
                        likes={post.likes}
                        comments={post.comments}
                        disableOptionButton={true}
                    />
                    <br/>
                </>
            ))}

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
