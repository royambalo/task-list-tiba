const express = require('express');
const router = express.Router();
const { tasksModel, validTasks } = require("../moddels/tasks_model");

router.get('/', function (req, res) {
    tasksModel.find({})
        .then(data => {
            res.json(data)
        })
});
router.post("/sort", (req, res) => {
    if (req.body.sort == "_id") {
        tasksModel.find({}).sort({ _id: 1 })
        .then(data => {
            res.json(data);
        })
    }
    if (req.body.sort == "cat") {
        tasksModel.find({}).sort({ cat: 1 })
        .then(data => {
            res.json(data);
        })
    }
    if (req.body.sort == "date") {
        tasksModel.find({}).sort({ date: 1 })
        .then(data => {
            res.json(data);
        })
    }
  
})



router.post("/add", async (req, res) => {
    let dataBody = req.body;
    // dataBody._id=req.decoded._id;
    let tasks = await validTasks(dataBody);
    if (tasks.error) {
        res.status(400).json(tasks.error.details[0])

    }
    else {
        try {
            let saveDate = await tasksModel.insertMany([req.body]);
            tasksModel.find({})
                .then(data => {
                    res.json(data)
                })
        }
        catch{
            res.status(400).json({ massage: "error insert new tasks soory" })
        }
    }
})
router.post("/edit", async (req, res) => {
    let dataBody = req.body;
    let tasks = await validTasks(dataBody)
    if (tasks.error) {
        res.status(400).json(tasks.error.details[0])
    }
    else {
        try {
            let updateData = await tasksModel.updateOne({ _id: req.body.id }, req.body)
            tasksModel.find({})
                .then(data => {
                    res.json(data)
                })
        }
        catch{
            res.status(400).json({ massage: "can't found" })
        }
    }
})
router.post("/del", (req, res) => {
    let delID = req.body._id;
    tasksModel.deleteOne({ _id: delID })
        .then(data => {
            if (data.deletedCount > 0) {
                tasksModel.find({})
                    .then(data => {
                        res.json(data)
                    })
            }
            else {
                res.status(400).json({ massage: "id not found" })
            }
        })
})
router.post("/delAll", (req, res) => {
    tasksModel.deleteMany({})
        .then(data => {
            if (data.deletedCount >= 0) {
                res.json({ message: "Delete all" });
            }
            else {
                res.status(400).json({ error: "Not found" });
            }
        })
})
module.exports = router;
