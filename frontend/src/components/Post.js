import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import {Divider, Grid} from "@mui/material";


const Post = () => {
    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1}}>
                {/* user icon and name */}
                <Grid container spacing={3}>
                    <Grid item xs="auto">
                        <Avatar alt="Amir Elrahep" src="/static/images/avatar/2.jpg"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="body1" component="h1">User Name</Typography>
                    </Grid>
                </Grid>

                <br/>
                <Divider/>
                <br/>

                {/* post title */}
                <Typography gutterBottom variant="h6" component="h2">Post Title</Typography>
                {/* post content */}
                <Typography>
                    This is a media card. You can use this section to describe the
                    content. This is a media card. You can use this section to describe the
                    content. This is a media card. You can use this section to describe the
                    content. This is a media card. You can use this section to describe the
                    content.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Like</Button>
                <Button size="small">Comment</Button>
            </CardActions>
        </Card>
    );
}

export default Post;