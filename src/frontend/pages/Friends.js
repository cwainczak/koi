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
    denyFriendRequest,
    removeFriend
} from "../../backend/UserFriend"
import {curUser} from "../../backend/UserObj";
import {Alert, Snackbar} from "@mui/material";


function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <Typography>
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </Typography>
    );
}

const Friends = () => {
    // popup snackbar alert message
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleOpenSnackbar = (severity, message) => {
        setAlertSeverity(severity);
        setAlertMessage(message);
        setIsSnackbarOpen(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpen(false);
    }

    const [findFriends, setFindFriends] = useState([]);

    // initialize all current friends with useEffect hook
    const [currentFriends, setCurrentFriends] = useState([])

    // initialize all friend requests with useEffect hook
    const [friendRequests, setFriendRequests] = useState([])

    async function init() {
        await curUser.refreshInstance()
        await fetchCurrentFriends()
        await fetchFriendRequests()
    }

    async function fetchCurrentFriends() {
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
            stateUpdateArr.push(new FriendObj(curFriendReq.UserID, curFriendReq.Username, false))
        }
        console.log(allFriendReqs)
        setFriendRequests(stateUpdateArr)
    }

    useEffect(init, [])

    const handleFindFriends = async (searchText) => {
        await init()
        console.log("in FIND FRIENDS")
        console.log("User entered: " + searchText)
        const isNewFriend = true
        console.log(JSON.stringify(curUser.toJSON()))
        const searchRes = await getUserSearchRes(searchText, isNewFriend, JSON.stringify(curUser.toJSON()))
        if (searchRes === -1) {
            handleOpenSnackbar("warning", "Something went wrong!");
            return
        }
        console.log(searchRes)
        // This array holds the search-result FriendObj objects so we can change the state of findFriends array
        let stateUpdateArr = []
        for (let i = 0; i < searchRes.length; i++) {
            let curFriend = searchRes[i]
            console.log(curFriend.Username, curFriend.disabled)
            stateUpdateArr.push(new FriendObj(curFriend.UserID, curFriend.Username, curFriend.disabled))
        }
        setFindFriends(stateUpdateArr)
    }

    const handleSearchFriends = async (searchText) => {
        await init()
        console.log("in SEARCH FRIENDS")
        console.log("User entered: " + searchText)
        const isNewFriend = false
        const searchRes = await getUserSearchRes(searchText, isNewFriend, JSON.stringify(curUser.toJSON()))
        // if there is an error
        if (searchRes === -1) {
            handleOpenSnackbar("warning", "Something went wrong!");
            return
        }
        console.log(searchRes)
        // This array holds the search-result FriendObj objects so we can change the state of searchFriends array
        let stateUpdateArr = []
        for (let i = 0; i < searchRes.length; i++) {
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
        if (addRes) {
            // This array holds the search-result FriendObj objects so we can change the state of searchFriends array
            let stateUpdateArr = []
            for (let i = 0; i < findFriends.length; i++) {
                let curFriend = findFriends[i]
                if (curFriend.username === username) {
                    curFriend.disabled = true
                }
                stateUpdateArr.push(curFriend)
            }
            setFindFriends(stateUpdateArr)
            handleOpenSnackbar("success", "Sent friend request!");
        } else {
            handleOpenSnackbar("warning", "Something went wrong!");
        }
    }

    const deleteFriend = async (username) => {
        console.log("in delete friend")
        let friendID = -1
        for (let i = 0; i < currentFriends.length; i++) {
            let curFriend = currentFriends[i]
            console.log("curFriend username: " + curFriend.username)
            console.log("entered username: " + username + " and is type " + typeof username)
            if (curFriend.username === username) friendID = curFriend.userID
        }
        console.log(friendID)
        if (friendID === -1) return
        const result = await removeFriend(curUser.UserID, friendID)
        result ? (handleOpenSnackbar("info", "Removed friend!")) : (handleOpenSnackbar("warning", "Something went wrong!"))
        await init()
    }

    const onAcceptFR = async (username) => {
        console.log("onAcceptFR")
        let accFriendUserID = -1
        for (let i = 0; i < friendRequests.length; i++) {
            let curFriendReq = friendRequests[i]
            if (curFriendReq.username === username) accFriendUserID = curFriendReq.userID
        }
        if (accFriendUserID === -1) return
        const accRes = await acceptFriendRequest(curUser.UserID, accFriendUserID)
        if (accRes) {
            handleOpenSnackbar("success", "Added friend!");
        } else {
            handleOpenSnackbar("warning", "Something went wrong!");
        }
        await init()
    }

    const onDenyFR = async (username) => {
        console.log("onDenyFR")
        let denFriendUserID = -1
        for (let i = 0; i < friendRequests.length; i++) {
            let curFriendReq = friendRequests[i]
            if (curFriendReq.username === username) denFriendUserID = curFriendReq.userID
        }
        if (denFriendUserID === -1) return
        const denRes = await denyFriendRequest(curUser.UserID, denFriendUserID)
        if (denRes) {
            handleOpenSnackbar("info", "Declined friend!");
        } else {
            handleOpenSnackbar("warning", "Something went wrong!");
        }
        await init()
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

            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                {/* my friends */}
                <TabPanel>
                    <SearchField promptText={"Search your friends!"} onClick={handleSearchFriends}/>
                    <br/>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {currentFriends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <CurrentFriend
                                    username={friend.username}
                                    removeFriend={deleteFriend}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>

                {/* friend requests */}
                <TabPanel>
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

                {/* find friend */}
                <TabPanel>
                    <SearchField id="searchField" promptText={"Search to find new friends!"} onClick={handleFindFriends}/>
                    <br/>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {findFriends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <FindFriend username={friend.username} onClick={addFriend} disabled={friend.disabled}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </SwipeableViews>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: "center"}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    variant="filled"
                    severity={alertSeverity}
                    sx={{width: '100%'}}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Friends;
