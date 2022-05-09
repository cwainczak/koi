import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Post from "../components/Post";
import PostObj from "../../backend/PostObj";
import PostDialog from "../components/PostDialog";
import {doesContain, removeWhiteSpace, UserIDTEXTStrToArr, shuffleArray} from "../../backend/Util";
import {createUserPost, getPostComments, getUserFriendsPosts, likePost} from "../../backend/UserPost";
import {curUser} from "../../backend/UserObj";
import Typography from "@mui/material/Typography";


let posts = [new PostObj("operatingoracle", "On it differed", "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.", 18, [["username1", "comment1 - Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest."], ["username2", "comment2 - Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh."]]),
    new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3 - Far concluded not his something extremity. Want four we face an he gate. On he of played he ladies answer little though nature. Blessing oh do pleasure as so formerly."], ["username4", "comment4 - Took four spot soon led size you. Outlived it received he material. Him yourself joy moderate off repeated laughter outweigh screened."]]),
    new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4 - Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an."], ["username5", "comment5 - She projection advantages resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was outlived peculiar rendered led six."]])];


const Home = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const [successfulPostCreationHidden, setSuccessfulPostCreationHidden] = React.useState(true)

    const [postOBJs, setPostOBJs] = useState([]);

    useEffect(init, [])

    async function init(){
        setSuccessfulPostCreationHidden(true)
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

    const handleOpenDialog = () => {
        setIsOpen(true);
    }

    const handleCloseDialog = () => {
        setIsOpen(false);
    }

    const handleDialogAction = async (title, content, errDialog) => {
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
                setIsOpen(false);
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
                onClick={handleOpenDialog}
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
                    />
                    <br/>
                </>
            ))
            }

            <PostDialog
                title="Create Post"
                button1="Cancel"
                button2="Post"
                isOpen={isOpen}
                handleClose={handleCloseDialog}
                handleAction={handleDialogAction}
            />
        </Container>
    );
};

export default Home;
