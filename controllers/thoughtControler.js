const { Thought, User } = require("../models");

module.exports = {

    // create thought to a user
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
      )
      .catch((err) => res.json(err));
  },















}

// JSON for create thought {  
//"thoughtText": "Decision Trackers are awesome",
//"username": "Zubayr Zein",
//"userId": "62518fc104a8119e932811d8"

//}