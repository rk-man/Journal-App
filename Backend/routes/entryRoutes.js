const express = require("express");
const entryController = require("./../controllers/entryController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
    .route("/")
    .post(entryController.createNewEntry, entryController.saveNewEntry)
    .get(entryController.getUserEntries);

router
    .route("/:entryId")
    .patch(
        entryController.updateSpecifcUserEntry,
        entryController.updateAndSaveEntry
    )
    .get(entryController.getSpecificUserEntry);

module.exports = router;
