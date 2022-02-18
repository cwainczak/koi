import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Friend from "../components/Friend";
import FriendObj from "../../backend/FriendObj";


let friends = [new FriendObj("dellmultiple", 15), new FriendObj("ibmdifference", 20),
    new FriendObj("volkswagonbream", 25), new FriendObj("nikemelt", 30),
    new FriendObj("ebayclassic", 35), new FriendObj("googlewillow", 40)];


const Friends = () => {
    return (
        <Container>

            <Grid container rowSpacing={2} columnSpacing={2}>
                {friends.map((friend) => (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Friend username={friend.username} friends={friend.mutualFriends}/>
                        </Grid>
                    </>
                ))}
            </Grid>

        </Container>
    );
};

export default Friends;
