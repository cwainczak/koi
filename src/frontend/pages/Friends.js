import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Friend from "../components/Friend";


const Friends = () => {
    return (
        <Container>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                    <Friend username="dellmultiple" friends="15"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Friend username="ibmdifference" friends="20"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Friend username="volkswagonbream" friends="25"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Friend username="nikemelt" friends="30"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Friend username="ebayclassic" friends="35"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Friend username="googlewillow" friends="40"/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Friends;
