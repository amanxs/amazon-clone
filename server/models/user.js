const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcyrpt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name : String,
    email: {type: String, unique: true, required: true},
    password: {type : String, required: true},
    address: {type : Schema.Types.ObjectId, ref: "Address"}
});

UserSchema.pre('save', function(next){
    let user = this;
    if(this.isModified('password') || this.isNew){
        bcyrpt.genSalt(10, function(err, salt){
            if(err){
                return next(err);
            }
            bcyrpt.hash(user.password, salt, null, function(err, hash){
                if(err){
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });
    }else{
        return next();
    }
});

UserSchema.methods.comparePassword = function(password, next){
    let user = this;
    return bcyrpt.compareSync(password, user.password);
};

module.exports =  mongoose.model("User", UserSchema);

//mongoDB atlas(cloud) to connect to mongoDb