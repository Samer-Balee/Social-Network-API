const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            // .populate({
            //     path: "thoughts",
            //     select: "-__v",
            // })
            // .select("-__v")
            // .sort({ _id: -1 })
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            // .populate({
            //      path: "thoughts",
            //      select: "-__v",
            // })
            // .select("-__v")
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

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, req.body, { new: true })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
};
