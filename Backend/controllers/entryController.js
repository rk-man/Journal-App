const catchAsync = require("express-async-handler");
const appError = require("./../utils/appError");
const Entry = require("./../models/entryModel");

exports.createNewEntry = catchAsync(async (req, res, next) => {
    let entry = {
        summary: req.body.summary,
        overview: req.body.overview,
        entryImage: req.body.entryImage,
        createdDate: Date.now(),
    };
    // entry.entryImage.metadata.resize = {
    //     ...entry.entryImage.metadata.resize.resize,
    // };

    if (!entry) {
        return next(new appError(400, "couldn't create an entry"));
    }

    req.entry = entry;

    next();
});

exports.saveNewEntry = catchAsync(async (req, res, next) => {
    //     {summary: 'sdsasdgghfhdhh', overview: 'Exciting', entryImage: {…}, createdDate: 1661183053622}
    // createdDate: 1661183053622
    // entryImage: {id: '9lq0a8tx8', name: '3c60a054847105.596c9100d9c22.jpg', type: 'image/jpeg', size: 799417, metadata: {…}, …}
    // overview: "Exciting"
    // summary: "sdsasdgghfhdhh"
    // [[Prototype]]: Object
    let entryObj = req.entry;
    let entryImage = req.entry.entryImage;
    const validImages = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (entryImage != null && validImages.includes(entryImage.type)) {
        entryObj.entryImage = new Buffer.from(entryImage.data, "base64");
        entryObj.entryImageType = entryImage.type;
    }

    entryObj.user = req.user._id;

    const entry = await Entry.create(entryObj);

    res.status(201).json({
        status: "success",
        data: {
            entry,
        },
    });
});

exports.updateAndSaveEntry = catchAsync(async (req, res, next) => {
    //     {summary: 'sdsasdgghfhdhh', overview: 'Exciting', entryImage: {…}, createdDate: 1661183053622}
    // createdDate: 1661183053622
    // entryImage: {id: '9lq0a8tx8', name: '3c60a054847105.596c9100d9c22.jpg', type: 'image/jpeg', size: 799417, metadata: {…}, …}
    // overview: "Exciting"
    // summary: "sdsasdgghfhdhh"
    // [[Prototype]]: Object
    let entryObj = req.entry;
    let entryImage = req.entry.entryImage;
    const validImages = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (entryImage != null && validImages.includes(entryImage.type)) {
        entryObj.entryImage = new Buffer.from(entryImage.data, "base64");
        entryObj.entryImageType = entryImage.type;
    }

    entryObj.user = req.user._id;

    const entry = await Entry.findOneAndUpdate(
        {
            user: req.user._id,
            _id: req.params.entryId,
        },
        entryObj,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(201).json({
        status: "success",
        data: {
            entry,
        },
    });
});

exports.getUserEntries = catchAsync(async (req, res, next) => {
    const entries = await Entry.find({ user: req.user._id });

    if (!entries) {
        return next(new appError(400, "couldn't get entries"));
    }

    res.status(200).json({
        status: "success",
        total: entries.length,
        data: {
            entries,
        },
    });
});

exports.getSpecificUserEntry = catchAsync(async (req, res, next) => {
    const entry = await Entry.findOne({
        _id: req.params.entryId,
        user: req.user._id,
    });

    if (!entry) {
        return next(new appError(400, "couldn't get entries"));
    }

    res.status(200).json({
        status: "success",
        data: {
            entry,
        },
    });
});

exports.updateSpecifcUserEntry = catchAsync(async (req, res, next) => {
    let entry = {
        summary: req.body.summary,
        overview: req.body.overview,
        entryImage: req.body.entryImage,
        createdDate: Date.now(),
    };

    if (!entry) {
        return next(new appError(400, "couldn't update the entry"));
    }

    req.entry = entry;

    next();
});
