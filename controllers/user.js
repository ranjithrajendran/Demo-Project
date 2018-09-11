"use strict";
const dbService = {
    userInfo: require('../services/user/userInfo'),
    display: require('../services/user/getList'),
    create: require('../services/user/create'),
    update: require('../services/user/update'),
    remove: require('../services/user/delete'),
    addFriends: require('../services/user/friends/add'),
    removeFriends: require('../services/user/friends/remove'),
    friendsList: require('../services/user/friends/list'),
    addPost: require('../services/user/posts/add'),
    removePost: require('../services/user/posts/remove'),
    listPost: require('../services/user/posts/list')
}

const getDetails = (req, res) => {
    console.log("inside get details controller");
    dbService.display.display().then((data) => {
        res.send(data);
        // console.log(data);
    }).catch((err) => {
        res.send(err)
    });
}

const userInfo = (req, res) => {
    console.log("inside User Info controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.userInfo.userInfo(input).then((data) => {
        res.send(data);
        console.log("User details send  Successfully" + data);
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("invalid user id");
            console.log("invalid user id");
        } else {
            res.sendStatus(500);
        }
    });
}

const createUser = (req, res) => {
    console.log("inside Create User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.create.create(input).then((data) => {
        res.send(data);
        console.log("New User Created Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Username Already Taken");
            console.log("Username Already Taken");
        } else {
            res.sendStatus(500);
        }
    });
}

const updateUser = (req, res) => {
    console.log("inside Update User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.update.update(input).then((data) => {
        res.status(200).send("User Details Updated Successfully");
        console.log("User Details Updated Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("invalid Username or password");
            console.log("invalid username or password");
        } else {
            res.sendStatus(500);
        }
    });
}

const deleteUser = (req, res) => {
    console.log("inside Delete User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.remove.remove(input).then((data) => {
        res.status(200).send("User Deleted Successfully");
        console.log("User Deleted Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("invalid Username or password");
            console.log("invalid username or password");
        } else {
            res.sendStatus(500);
        }
    });
}

const addFriends = (req, res) => {
    console.log("inside Add Friends controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.addFriends.addFriends(input).then((data) => {
        res.status(200).send("Friend Added Successfully");
        console.log("Friend Added Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To Add Friend");
            console.log("Unable To Add Friend");
        } else {
            res.sendStatus(500);
        }
    });
}

const removeFriends = (req, res) => {
    console.log("inside Remove Friends controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.removeFriends.removeFriends(input).then((data) => {
        res.status(200).send("Friend Removed Successfully");
        console.log("Friend Removed Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To Remove Friend");
            console.log("Unable To Remove Friend");
        } else {
            res.sendStatus(500);
        }
    });
}

const friendsList = (req, res) => {
    console.log("inside Show Friends controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.friendsList.friendsList(input).then((data) => {
        res.send(data[0].friends);
        console.log(data[0].friends);
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("invalid Username or password");
            console.log("invalid Username or password");
        } else {
            res.sendStatus(500);
        }
    });
}

const addPost = (req, res) => {
    console.log("inside Add Post controller");
    const input = req;
    // const input = req.query;
    console.log(input);
    dbService.addPost.addPost(input).then((data) => {
        res.status(200).send("Post Added Successfully");
        console.log("Post Added Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To Add Post");
            console.log("Unable To Add Post");
        } else {
            res.sendStatus(500);
        }
    });
}

const removePost = (req, res) => {
    console.log("inside Add Post controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.removePost.removePost(input).then((data) => {
        res.status(200).send("Post Added Successfully");
        console.log("Post Added Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To Add Post");
            console.log("Unable To Add Post");
        } else {
            res.sendStatus(500);
        }
    });
}

const listPost = (req, res) => {
    console.log("inside Add Post controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.listPost.listPost(input).then((data) => {
        res.status(200).send("Post Added Successfully");
        console.log("Post Added Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To Add Post");
            console.log("Unable To Add Post");
        } else {
            res.sendStatus(500);
        }
    });
}

module.exports = {
    userInfo,
    getDetails,
    createUser,
    updateUser,
    deleteUser,
    addFriends,
    removeFriends,
    friendsList,
    addPost,
    removePost,
    listPost
}