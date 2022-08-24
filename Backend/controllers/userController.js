const catchAsync = require("express-async-handler");
const appError = require("./../utils/appError");
const User = require("./../models/userModel");

exports.updateMainUserData = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new appError(400, "SOmethings's wrong"));
    }
    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
});


