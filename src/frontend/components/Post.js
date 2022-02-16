import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#e4b109"
        }
    }
});

const Post = (props) => {
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

                    <Typography variant="body2" component="h1">Likes {props.likes}</Typography>

                    <br/>
                    <Divider/>
                </CardContent>
                <CardActions>
                    <Button size="small">Like</Button>
                    <Button size="small">Comment</Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}

export default Post;
