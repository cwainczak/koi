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
import MyPost from "../components/MyPost";
import PostDialog from "../components/PostDialog";
import {removeWhiteSpace} from "../../backend/Util";
import {createUserPost, getUserPosts, getPostComments} from "../../backend/UserPost";
import {deleteUserAcc} from "../../backend/UserAccount";
import {curUser} from "../../backend/UserObj";


let samplePosts = [new PostObj("post username", "post title", "post content", 18, [["comment_username_1", "comment1 "], ["comment_username_2", "comment2"]]),
    new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3 - Far concluded not his something extremity. Want four we face an he gate. On he of played he ladies answer little though nature. Blessing oh do pleasure as so formerly."], ["username4", "comment4 - Took four spot soon led size you. Outlived it received he material. Him yourself joy moderate off repeated laughter outweigh screened."]]),
    new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4 - Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an."], ["username5", "comment5 - She projection advantages resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was outlived peculiar rendered led six."]])];


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = (props) => {
    const {history} = props;

    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        let posts = await getUserPosts(curUser.UserID);
        console.log(posts);
        setPosts(posts);

        // let comments = await getPostComments(posts[0].PostID);
        // console.log(comments);
        // setComments(comments);

        // for (let i = 0; i < posts.length; i++) {
        //     let comments = await getPostComments(posts[i].PostID);
        //     console.log(comments);
        //     setComments(comments);
        // }
    }

    useEffect(fetchPosts, [])

    // const [comments, setComments] = useState([]);

    async function fetchComments(postID) {
        let comments = await getPostComments(postID);
        console.log(comments);
        return comments;
        // setComments(comments);
    }

    // useEffect(fetchComments, [])

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
            let isSuccess = await createUserPost(curUser.UserID, entTitle, entContent);

            if (isSuccess) {
                setIsPostDialogOpen(false);
            } else {
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
                            sx={{width: 100, height: 100, bgcolor: "#e4b109"}}
                        />
                    </CardContent>

                    <Typography variant="h3">{curUser.Username}</Typography>

                    <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x friends</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">{posts.length} posts</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x comments</Typography>
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

                {posts.map((post, index) => (
                    <>
                        <MyPost
                            key={index}
                            username={curUser.Username}
                            title={post.Title}
                            content={post.Content}
                            likes={post.Likes}
                            // comments={comments}
                            comments={fetchComments(post.PostID)}
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
        </div>
    );
};

export default Profile;
