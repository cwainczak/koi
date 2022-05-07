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
import {
    getUserSearchRes,
    getAllUserFriends,
    sendFriendReq,
    getFriendReqs,
    acceptFriendRequest,
    denyFriendRequest
} from "../../backend/UserFriend"
import {curUser} from "../../backend/UserObj";

// let currentFriends = [new FriendObj("dellmultiple", 15), new FriendObj("ibmdifference", 20),
//     new FriendObj("volkswagonbream", 25), new FriendObj("nikemelt", 30),
//     new FriendObj("ebayclassic", 35), new FriendObj("googlewillow", 40)];

// let friendRequests = [new FriendObj("memberebay", false), new FriendObj("teasefacebook", false),
//     new FriendObj("considerford", false), new FriendObj("basmatirolex", false)];

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

    // initialize all current friends with useEffect hook
    const [currentFriends, setCurrentFriends] = useState([])

    // initialize all friend requests with useEffect hook
    const [friendRequests, setFriendRequests] = useState([])

    async function fetchCurrentFriends() {
        console.log("in fetch friends: " + curUser)
        if (curUser === undefined) return
        const allFriends = await getAllUserFriends(JSON.stringify(curUser.toJSON()))
        let stateUpdateArr = []
        for (let i = 0; i < allFriends.length; i++) {
            let curFriend = allFriends[i]
            stateUpdateArr.push(new FriendObj(curFriend.UserID, curFriend.Username, false))
        }
        console.log(allFriends)
        setCurrentFriends(stateUpdateArr)
    }

    async function fetchFriendRequests() {
        if (curUser === undefined) return
        const allFriendReqs = await getFriendReqs(JSON.stringify(curUser.toJSON()))
        let stateUpdateArr = []
        for (let i = 0; i < allFriendReqs.length; i++) {
            let curFriendReq = allFriendReqs[i]
            stateUpdateArr.push(new FriendObj(curFriendReq.UserID ,curFriendReq.Username, false))
        }
        console.log(allFriendReqs)
        setFriendRequests(stateUpdateArr)
    }

    useEffect (async () => {
        await fetchCurrentFriends()
        await fetchFriendRequests()
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
            console.log(curFriend.Username, curFriend.disabled)
            stateUpdateArr.push(new FriendObj(curFriend.UserID, curFriend.Username, curFriend.disabled))
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
            stateUpdateArr.push(new FriendObj(curFriend.UserID, curFriend.Username, false))
        }
        setCurrentFriends(stateUpdateArr)
    }

    const addFriend = async (username) => {
        console.log("in add friend")
        const addRes = await sendFriendReq(curUser.UserID, username)
        console.log(addRes ? "Succeeded" : "Didn't succeed")
        // if FR succeeded, disable add button
        if (addRes){
            // This array holds the search-result FriendObj objects so we can change the state of searchFriends array
            let stateUpdateArr = []
            for (let i = 0; i < findFriends.length; i++){
                let curFriend = findFriends[i]
                if (curFriend.username === username){
                    curFriend.disabled = true
                }
                stateUpdateArr.push(curFriend)
            }
            setFindFriends(stateUpdateArr)
        }
    }

    const onAcceptFR = async (username) => {
        console.log("onAcceptFR")
        let accFriendUserID = -1
        for (let i = 0; i < friendRequests.length; i++){
            let curFriendReq = friendRequests[i]
            if (curFriendReq.username === username) accFriendUserID = curFriendReq.userID
        }
        if (accFriendUserID === -1) return
        const accRes = await acceptFriendRequest(curUser.UserID, accFriendUserID)
    }

    const onDenyFR = async (username) => {
        console.log("onDenyFR")
        let denFriendUserID = -1
        for (let i = 0; i < friendRequests.length; i++){
            let curFriendReq = friendRequests[i]
            if (curFriendReq.username === username) denFriendUserID = curFriendReq.userID
        }
        if (denFriendUserID === -1) return
        const denRes = await denyFriendRequest(curUser.UserID, denFriendUserID)
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
                    <SearchField promptText={"Search your friends!"} onClick={handleSearchFriends}/>
                    <br/>
                    {/* my friends */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {currentFriends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <CurrentFriend username={friend.username}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    {/* friend requests */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {friendRequests.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <FriendRequest
                                    username={friend.username}
                                    onAcceptFR={onAcceptFR}
                                    onDenyFR={onDenyFR}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    <SearchField id="searchField" promptText={"Search to find new friends!"} onClick={handleFindFriends}/>
                    <br/>
                    {/* find friend */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {findFriends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <FindFriend username={friend.username} onClick={addFriend} disabled={friend.disabled}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </SwipeableViews>
        </Container>
    );
};

export default Friends;
