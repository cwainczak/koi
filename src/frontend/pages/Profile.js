import React from "react";
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


let posts = [new PostObj("operatingoracle", "On it differed", "On it differed repeated wandered required in. Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter. In me he at collecting affronting principles apartments. Has visitor law attacks pretend you calling own excited painted. Contented attending smallness it oh ye unwilling. Turned favour man two but lovers. Suffer should if waited common person little oh. Improved civility graceful sex few smallest screened settling. Likely active her warmly has.", 18, [["username1", "comment1 - Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest."], ["username2", "comment2 - Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh."]]),
    new PostObj("treatycisco", "Now residence dashwoods", "Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.", 48, [["username3", "comment3 - Far concluded not his something extremity. Want four we face an he gate. On he of played he ladies answer little though nature. Blessing oh do pleasure as so formerly."], ["username4", "comment4 - Took four spot soon led size you. Outlived it received he material. Him yourself joy moderate off repeated laughter outweigh screened."]]),
    new PostObj("modifiedmicrosoft", "Insipidity the sufficient discretion", "Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.", 21, [["username4", "comment4 - Advantage old had otherwise sincerity dependent additions. It in adapted natural hastily is justice. Six draw you him full not mean evil. Prepare garrets it expense windows shewing do an."], ["username5", "comment5 - She projection advantages resolution son indulgence. Part sure on no long life am at ever. In songs above he as drawn to. Gay was outlived peculiar rendered led six."]])];


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = () => {
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);

    const handelOpenConfirmationDialog = () => {
        setIsConfirmationDialogOpen(true);
    }

    const handelCloseConfirmationDialog = () => {
        setIsConfirmationDialogOpen(false);
    }

    const handelConfirmationDialogAction = () => {
        setIsConfirmationDialogOpen(false);
        // todo - delete account
    }

    return (
        <div>
            <Container>
                <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                    <CardContent>
                        <Avatar
                            {...shrinkUsername("Username")}
                            sx={{width: 100, height: 100, bgcolor: "#e4b109"}}
                        />
                    </CardContent>

                    <Typography variant="h3">Username</Typography>

                    <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x friends</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x posts</Typography>
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

                {posts.map((post) => (
                    <>
                        <MyPost
                            username={post.username}
                            title={post.title}
                            content={post.content}
                            likes={post.likes}
                            comments={post.comments}
                        />
                        <br/>
                    </>
                ))}

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
        </div>
    );
};

export default Profile;
