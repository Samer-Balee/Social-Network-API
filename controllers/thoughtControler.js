const { Thought, User } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          })
        //   .populate({
        //     path: "thoughts",
        //     select: "-__v",
        //   })
          .select("-__v")
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((dbThoughtData) =>
                !dbThoughtData
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create thought to a user
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
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

//update thought by it's id
updateThought( req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbThoughtData) => 
        !dbThoughtData
         ? res.status(404).json({ message: "No thought with this ID" })       
         : res.json({ message: "Thought successfully updated" })
      )
      .catch((err) => res.status(400).json(err));
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => 
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json({ message: "Thought sucssefully deleted" })
      )
      .catch((err) => res.status(400).json(err));
  },
  // add Reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((dbThoughtData) => 
        !dbThoughtData
         ? res.status(404).json({ message: "No thought with this id" })
         : res.json(dbThoughtData)
      )
      .catch((err) => res.json(err));
  },

  //delete Reaction
  deleteReaction( req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => 
      !dbThoughtData
      ? res.status(404).json({ message: "No thought with this id" })
      : res.json({ message: "Reaction sucssefully deleted" })
      )
      .catch((err) => res.json(err));
  },
};




// JSON for create thought {  
//"thoughtText": "Decision Trackers are awesome",
//"username": "Zubayr Zein",
//"userId": "62518fc104a8119e932811d8"

//}