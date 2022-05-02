import React, {useEffect, useState} from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchField from "../components/SearchField";
import CurrentFriend from "../components/CurrentFriend";
import FriendRequest from "../components/FriendRequest";
import FindFriend from "../components/FindFriend";
import FriendObj from "../../backend/FriendObj";
import {getUserSearchRes, getAllUserFriends, sendFriendReq} from "../../backend/UserFriend"
import {curUser} from "../../backend/UserObj";

// let currentFriends = [new FriendObj("dellmultiple", 15), new FriendObj("ibmdifference", 20),
//     new FriendObj("volkswagonbream", 25), new FriendObj("nikemelt", 30),
//     new FriendObj("ebayclassic", 35), new FriendObj("googlewillow", 40)];

let friendRequests = [new FriendObj("memberebay", 25), new FriendObj("teasefacebook", 20),
    new FriendObj("considerford", 45), new FriendObj("basmatirolex", 50)];

// let findFriends = [new FriendObj("groovysprite"), new FriendObj("putridstarbucks"),
//     new FriendObj("surelytoyota"), new FriendObj("waistpepsi"),
//     new FriendObj("atmospheresubway"), new FriendObj("penguinmcdonalds"),
//     new FriendObj("spiritualibm"), new FriendObj("chantchevrolet")];



function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <Typography>
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </Typography>
    );
}

const Friends = () => {

    const [errHidden, setErrHidden] = useState(true)

    const [findFriends, setFindFriends] = useState([]);

    // initialize to all current friends with useEffect hook
    const [currentFriends, setCurrentFriends] = useState([])

    useEffect (async () => {
        const allFriends = await getAllUserFriends(JSON.stringify(curUser.toJSON()))
        let stateUpdateArr = []
        for (let i = 0; i < allFriends.length; i++){
            let curFriend = allFriends[i]
            stateUpdateArr.push(new FriendObj(curFriend.Username))
        }
        console.log(allFriends)
        setCurrentFriends(stateUpdateArr)
    }, [])

    const handleFindFriends = async (searchText) => {
        console.log("in FIND FRIENDS")
        console.log("User entered: " + searchText)
        const isNewFriend = true
        console.log(JSON.stringify(curUser.toJSON()))
        const searchRes = await getUserSearchRes(searchText, isNewFriend, JSON.stringify(curUser.toJSON()))
        if (searchRes === -1) {
            setErrHidden(false)
            return
        }
        console.log(searchRes)
        // This array holds the search-result FriendObj objects so we can change the state of findFriends array
        let stateUpdateArr = []
        for (let i = 0; i < searchRes.length; i++){
            let curFriend = searchRes[i]
            stateUpdateArr.push(new FriendObj(curFriend.Username))
        }
        setFindFriends(stateUpdateArr)
    }

    const handleSearchFriends = async (searchText) => {
        console.log("in SEARCH FRIENDS")
        console.log("User entered: " + searchText)
        const isNewFriend = false
        const searchRes = await getUserSearchRes(searchText, isNewFriend, JSON.stringify(curUser.toJSON()))
        // if there is an error
        if (searchRes === -1) {
            setErrHidden(false)
            return
        }
        console.log(searchRes)
        // This array holds the search-result FriendObj objects so we can change the state of searchFriends array
        let stateUpdateArr = []
        for (let i = 0; i < searchRes.length; i++){
            let curFriend = searchRes[i]
            stateUpdateArr.push(new FriendObj(curFriend.Username))
        }
        setCurrentFriends(stateUpdateArr)
    }

    const addFriend = async (username) => {
        console.log("in add friend")
        const addRes = await sendFriendReq(curUser.UserID, username)
        console.log(addRes ? "Succeeded" : "Didn't succeed")
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Container>
            <Typography id={"friendErrMessage"} fontSize={12} color={"red"}
                        textAlign={"center"} hidden={errHidden}>
                Failed to retrieve friends!
            </Typography>
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
                    <SearchField promptText={"Search Friends"} onClick={handleSearchFriends}/>
                    <br/>
                    {/* my friends */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {currentFriends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <CurrentFriend username={friend.username} friends={friend.mutualFriends}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    {/* friend requests */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {friendRequests.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <FriendRequest username={friend.username} friends={friend.mutualFriends}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    <SearchField id="searchField" promptText={"Find Friends"} onClick={handleFindFriends}/>
                    <br/>
                    {/* find friend */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {findFriends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <FindFriend username={friend.username} onClick={addFriend}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </SwipeableViews>
        </Container>
    );
};

export default Friends;
