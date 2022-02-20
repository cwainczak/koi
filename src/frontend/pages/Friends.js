import React, {useState} from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Friend from "../components/Friend";
import FriendObj from "../../backend/FriendObj";


let friends = [new FriendObj("dellmultiple", 15), new FriendObj("ibmdifference", 20),
    new FriendObj("volkswagonbream", 25), new FriendObj("nikemelt", 30),
    new FriendObj("ebayclassic", 35), new FriendObj("googlewillow", 40)];


function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <Typography>
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </Typography>
    );
}

const Friends = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Container>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Friends"/>
                    <Tab label="Friend Requests"/>
                    <Tab label="Find Friends"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {friends.map((friend) => (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Friend username={friend.username} friends={friend.mutualFriends}/>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    Friend Requests
                </TabPanel>
                <TabPanel>
                    Find Friends
                </TabPanel>
            </SwipeableViews>
        </Container>
    );
};

export default Friends;
