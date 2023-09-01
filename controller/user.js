const express = require("express");

const mongoose = require('mongoose');
const { userSchema } = require('../models/user');

const User = mongoose.model("User", userSchema)

const router = express.Router();


const add = (req, res) => {

    let newUser = new User(req.body);
    renderResponse(req, res, newUser.save())
        .catch(e => responseFromError(e, res));
}

const getAll = async (req, res) => {

    renderResponse(req, res, User.find({}))
        .catch(e => responseFromError(e, res));
}

const getByID = async (req, res) => {

    renderResponse(req, res, User.findOne({ accID: req.params.accID }))
        .catch(e => responseFromError(e, res));
}

const updateByID = async (req, res) => {

    renderResponse(req, res, User.findOneAndUpdate({ accID: req.params.accID }, req.body, { new: true }))
        .catch(e => responseFromError(e, res));
}

const deleteByID = async (req, res) => {

    renderResponse(req, res, User.findOneAndRemove({ accID: req.params.accID }))
        .catch(e => responseFromError(e, res));
}

function responseFromError(error, res) {
    debugg(error);
    if (error.name === "ValidationError") {
        let errors = {
            error: error.name,
            details: {}
        };

        Object.keys(error.errors).forEach((key) => {
            errors.details[key] = error.errors[key].message;
        });
        return res.status(400).json(errors);
    }
    console.error(error);
    res.status(500).send("Error: " + error.message);
}
async function renderResponse(req, res, query) {

    let obj;
    
    if ((req.query.render || (req.query.populate !== "false")) && query.populate) {
        obj = await query.lean();
        let wasjson = false;
        if (!Array.isArray(obj)){ obj = [obj]; wasjson = true; }
        const Book = await mongoose.model("Book");
        for(var i=0;i<obj.length;i++){
            obj[i].books = await Book.find({ user:obj[i]._id }).populate(["description"]).sort({row:1}).lean();
        }
        if(wasjson) obj = obj[0];
    }
    else
        obj = await query;
    if (req.query.render) {
        if (!Array.isArray(obj)) obj = [obj];
        return res.render("models/user.ejs", { shelves: obj, loggedIn: req.session.loggedIn });
    }
    res.json(obj);
}


router.get('/getAll', getAll);
router.post('/add/a', add);
router.post('/update/:accID/a', updateByID);
router.get('/delete/:accID/a', deleteByID);
router.get('/get/:accID', getByID);``

module.exports = router;


