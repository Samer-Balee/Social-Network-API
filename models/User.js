const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        usermame: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Please enter a valid email address"
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// get total count of friends on retrieval
userSchema.virtual("friendCount")
.get(function() {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;