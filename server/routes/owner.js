const router = require('express').Router()
const Owner = require("../models/owner");
const upload = require("../middlewares/upload-photo")

// POST request - Create a new owner
router.post("/owners", upload.single("photo"), async(req, res) => {
    try{
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;


        await owner.save();
        res.json({
            status: true,
            message: "Successfully created a new owner"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

    
});

//GET request
router.get("/owners", async(req, res) => {
    try{
        let owners = await Owner.find();
        res.json({
            status: true,
            owners: owners
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
module.exports = router
