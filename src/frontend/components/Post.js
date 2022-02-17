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

    const handleLikeClick = () => {
        setFlag(!flag);
        // todo - increment like count for ths post
    };

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flexGrow: 1}}>
                    {/* user icon and name */}
                    <Grid container spacing={3}>
                        <Grid item xs="auto">
                            <Avatar alt={props.username} src="/static/images/avatar/2.jpg"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body1" component="h1">{props.username}</Typography>
                        </Grid>
                    </Grid>

                    <br/>
                    <Divider/>
                    <br/>

                    <Typography gutterBottom variant="h6" component="h2">{props.title}</Typography>
                    <Typography>{props.content}</Typography>

                    <br/>
                    <br/>

                    <Typography variant="body2" component="h1">{props.likes} Likes</Typography>

                    <br/>
                    <Divider/>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={handleLikeClick}
                        color={flag ? "primary" : "secondary"}
                    >
                        Like</Button>
                    <Button
                        size="small"
                        color="secondary"
                    >
                        Comment</Button>
                </CardActions>

                <Divider/>

                {/* comments */}
                <CardContent>
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
            </Card>
        </ThemeProvider>
    );
}

export default Post;
