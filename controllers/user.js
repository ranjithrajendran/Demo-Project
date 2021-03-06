"use strict";
const dbService = {
    userInfo: require('../services/user/userInfo'),
    display: require('../services/user/getList'),
    create: require('../services/user/create'),
    update: require('../services/user/update'),
    remove: require('../services/user/delete'),
    search: require('../services/user/search'),
    addFriends: require('../services/user/friends/add'),
    removeFriends: require('../services/user/friends/remove'),
    friendsList: require('../services/user/friends/list'),
    removePost: require('../services/user/posts/remove'),
    listPost: require('../services/user/posts/list'),
    likePost: require('../services/user/posts/like'),
    dislikePost: require('../services/user/posts/dislike'),
    likesInfo: require('../services/user/posts/likesInfo')
}

const getDetails = (req, res) => {
    console.log("inside get details controller");
    dbService.display().then((data) => {
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
    dbService.userInfo(input).then((data) => {
        res.send(data);
        console.log("User details send  Successfully");
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
    dbService.create(input).then((data) => {
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
    dbService.update(input).then((data) => {
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
    dbService.remove(input).then((data) => {
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

const searchUser = (req, res) => {
    console.log("inside search User controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.search(input).then((data) => {
        res.send(data);
        console.log("Search List send Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400);
            console.log("SQL ERROR");
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
    dbService.addFriends(input).then((data) => {
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
    dbService.removeFriends(input).then((data) => {
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
    dbService.friendsList(input).then((data) => {
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

const removePost = (req, res) => {
    console.log("inside Add Post controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.removePost(input).then((data) => {
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
    console.log("inside Post List controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.listPost(input).then((data) => {
        res.send(data);
        console.log("Post list send Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To get Post list");
            console.log("Unable To get Post list");
        } else {
            res.sendStatus(500);
        }
    });
}

const likePost = (req, res) => {
    console.log("inside Post likes controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.likePost(input).then((data) => {
        res.send(data);
        console.log("Post likes send Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To add likes");
            console.log("Unable To get add likes");
        } else {
            res.sendStatus(500);
        }
    });
}

const dislikePost = (req, res) => {
    console.log("inside Post dislikes controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.dislikePost(input).then((data) => {
        res.send(data);
        console.log("Post dislikes send Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To add dislikes");
            console.log("Unable To add dislikes");
        } else {
            res.sendStatus(500);
        }
    });
}

const likesInfo = (req, res) => {
    console.log("inside likesInfo controller");
    const input = req.body;
    // const input = req.query;
    console.log(input);
    dbService.likesInfo(input).then((data) => {
        res.send(data);
        console.log(data);
        console.log("Post likes and dislikes send Successfully");
    }).catch((error) => {
        if (error == 400) {
            res.status(400).send("Unable To  send likes and dislikes");
            console.log("Unable To get send likes and dislikes");
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
    searchUser,
    addFriends,
    removeFriends,
    friendsList,
    removePost,
    listPost,
    likePost,
    dislikePost,
    likesInfo
}