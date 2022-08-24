const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have a name"],
    },

    email: {
        type: String,
        required: [true, "User must have a email id"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "User must have a password"],
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return this.password == value;
            },
            message: "confirmation password is not same as the password",
        },
    },

    profileImage: {
        type: String,
        default: "default-test.jpg",
    },

    role: {
        type: "String",
        enum: {
            values: ["admin", "user"],
        },
        required: [true],
        default: "user",
    },
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    return next();
});

userSchema.methods.comparePassword = async (
    enteredPassword,
    storedPassword
) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
