import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = () => {
    return (
        <div>
            <Container>
                <Grid container rowSpacing={0} columnSpacing={2}>
                    <Grid item xs={0} sm={0}>
                        <Avatar
                            {...shrinkUsername("Amir")}
                            sx={{width: 100, height: 100, bgcolor: "#e4b109"}}
                        />
                    </Grid>
                    <Grid item xs={0} sm={0}>
                        <Typography variant="h3">Username</Typography>
                        <Typography variant="subtitle1">5 friends</Typography>
                    </Grid>
                </Grid>


            </Container>
        </div>
    );
};

export default Profile;
