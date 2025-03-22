const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel")

//@desc GET all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) =>{
    const contacts = await Contact.find({ userId:req.user.id });
    res.status(200).json(contacts);
});

//@desc GET contact for id
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler( async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler( async (req, res) =>{
    console.log("Request body: ", req.body);
    const {name, email, phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({name, email, phone, userId: req.user.id});
    res.status(201).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler( async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.userId.toString() !== req.user.id){
        res.status(401);
        throw new Error("You can only update your own contact");
    };

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@desc delete contact for id
//@route delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler( async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.userId.toString() !== req.user.id){
        res.status(401);
        throw new Error("You dont have permission to delete others contact");
    };

    //await Contact.findByIdAndDelete(req.params.id);
   // await Contact.remove();
   await Contact.deleteOne({ _id: req.params.id}); 
   res.status(200).json(contact);
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };