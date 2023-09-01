const express = require("express");

const mongoose = require('mongoose');
const { roomSchema } = require('../models/room');

const Room = mongoose.model("Room", roomSchema)

const router = express.Router();


const add = (req, res) => {
    let newRoom = new Room(req.body);
    renderResponse(req, res, newRoom.save())
        .catch (e => responseFromError(e, res));
}

const getAll = async (req, res) => {

    renderResponse(req, res, Room.find({}))
        .catch(e => responseFromError(e, res));
}

const getByID = async (req, res) => {

    renderResponse(req, res, Room.findOne({ id: req.params.id }))
        .catch(e => responseFromError(e, res));
}

const updateByID = async (req, res) => {
    // console.log("update", req.body, req.params.id);
    renderResponse(req, res, Room.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }))
        .catch(e => responseFromError(e, res));
}

const deleteByID = async (req, res) => {
    renderResponse(req, res, Room.findOneAndRemove({ id: req.params.id }))
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
    res.status(500).send("Error: " + error.message);
}
async function renderResponse(req, res, query) {
    let obj;
    obj = await query.populate(["type", "user"]);
    res.json(obj);
}
router.get('/getAll/a', getAll);
router.post('/add/a', add);
router.post('/update/:id/a', updateByID);
router.get('/delete/:id/a', deleteByID);
router.get('/get/:id', getByID);

module.exports = router;