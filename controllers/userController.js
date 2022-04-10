const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .select("-__v")
            .then((users) => res.json(users))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    // Get user by it's id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate ({ path: 'friends'})
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // Update user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ message: 'user successfully updated' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete user by it's id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({_id: { $in: user.thoughts}})
            )
            .then(() => res.json({ message: `User and it\'s assotiated thoughts deleted` }))
            .catch((err) => res.status(500).json(err));
    },
    // add friend to a user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
            
    },
    // Remove friend from user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendsId } },
            { new: true }
        )
            .then((dbUserData) => 
                !dbUserData
                   ? res.status(404).json({ message: "no user found with this ID" })
                   : res.json( {message: 'Friend successfully deleted'})
            )
            .catch((err) => res.status(500).json(err));
    },
};


