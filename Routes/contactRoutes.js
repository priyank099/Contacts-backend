const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../Controlllers/contactControllers');
const validateToken = require('../Middleware/validateTokenHandler');

router.get("/", validateToken, getContacts);
router.get("/:id", validateToken, getContact);
router.post("/", validateToken, createContact);
router.put("/:id", validateToken, updateContact);
router.delete("/:id", validateToken, deleteContact);


// router.route("/").get(getContacts);

// router.route("/:id").get(getContact);

// router.route("/").post(createContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

module.exports = router;