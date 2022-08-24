const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            required: [true, "A entry must be associated to a user"],
            ref: "User",
        },

        entryImage: {
            type: Buffer,
            default: "default-entry-img.jpeg",
        },
        entryImageType: {
            type: String,
        },

        summary: {
            type: String,
            required: [true, "Description is necessary"],
        },

        overview: {
            type: String,
            enum: {
                values: [
                    "Awesome",
                    "Excited",
                    "Enlightened",
                    "Happy",
                    "Sad",
                    "Anxious",
                ],
            },
            required: [
                true,
                "give us the overview of your what's going with your life",
            ],
            default: "Exciting",
        },

        createdDate: {
            type: Date,
            default: Date.now(),
            required: [true, "You need to specify the date"],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

entrySchema.virtual("entryImagePath").get(function () {
    if (this.entryImage != null && this.entryImageType != null) {
        return `data:${
            this.entryImageType
        };charset=utf-8;base64,${this.entryImage.toString("base64")}`;
    }
});

entrySchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name profileImage",
    });

    next();
});

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;
