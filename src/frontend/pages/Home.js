import React, {useEffect} from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";
import PostDialog from "../components/PostDialog";
import {removeWhiteSpace} from "../../backend/Util";
import {createUserPost} from "../../backend/UserPost";
import {curUser} from "../../backend/UserObj";
import Typography from "@mui/material/Typography";


let posts = [new PostObj(1,"username 1", "title 1", "content 1", 1, [["username 1", "comment 1"], ["username 2", "comment 2"]]),
    new PostObj(2,"username 2", "title 2", "content 2", 1, [["username 1", "comment 1"], ["username 2", "comment 2"]])]


const Home = () => {
    const [successfulPostCreationHidden, setSuccessfulPostCreationHidden] = React.useState(true)

    useEffect(() => {
        setSuccessfulPostCreationHidden(true)
    }, [])

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
            let isSuccess = await createUserPost(curUser.UserID, entTitle, entContent);

            if (isSuccess) {
                setIsPostDialogOpen(false);
                setSuccessfulPostCreationHidden(false)
            } else {
                console.log("Something went wrong!");
            }
        }
    }

    return (
        <Container>
            <Typography
                id={"newPostMsg"}
                fontSize={12}
                color={"darkorange"}
                textAlign={"center"}
                hidden={successfulPostCreationHidden}
            >
                Your post has been created!
            </Typography>

            <Button
                fullWidth
                variant="contained"
                onClick={handleOpenPostDialog}
            >
                Create New Post
            </Button>

            <br/>
            <br/>

            {posts.map((post,index) => (
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
        </Container>
    );
};

export default Home;
