const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;

