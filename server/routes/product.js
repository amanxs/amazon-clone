const router = require('express').Router()
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo")


// POST request - Create a new product
router.post("/products", upload.single("photo"), async(req, res) => {
    try{
        let product = new Product();
        product.ownerID = req.body.ownerID;
        product.categoryID = req.body.categoryID;
        product.price = req.body.price;
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();
        res.json({
            status: true,
            message: "Successfully saved"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

    
});

// GET request - get All products
router.get("/products", async(req, res) => {
    try{
        let products = await Product.find().populate('owner category').exec();
        res.json({
            status: true,
            products: products
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});
// GET request - get a single product
router.get("/products/:id", async(req, res) => {
    try{
        let product = await Product.findOne({_id: req.params.id}).populate('owner category').exec();
        res.json({
            success: true,
            product: product
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
});

//Put request - Update a single product
router.put("/products/:id", upload.single("photo"), async(req, res) => {
    try{
        let product = await Product.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.categoryID,
                    photo: req.file.location,
                    description: req.body.description,
                    owner: req.body.ownerID
                }
            },
            {upsert: true}
        );
        
        res.json({
            success: true,
            updatedProduct: product
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
});

// Delete request - delete a single product
router.delete("/products/:id", async(req, res) => {
    try{
        let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});
        if(deletedProduct){
            res.json({
                success: true,
                message: "Successfully deleted"
            });
        }
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
});

module.exports = router;