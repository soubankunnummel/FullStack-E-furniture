
const mongoos = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema =  new mongoos.Schema({
    name:String,
    email:String,
    username:String,
    password:String, 
    phone:Number,
    gender:String,
    address:String,
    dob:Number,
    cart: [
        {
            productsId:{type:mongoos.Schema.ObjectId, ref:"Product"},
            quantity:{type:Number,default:1}
            
        }
    ],
    wishlist:[{type:mongoos.Schema.ObjectId, ref:"Product"}],
    orders:[{type:mongoos.Schema.ObjectId, ref:"orders"} ]

})

 
userSchema.pre("save", async function(next) {
    const user = this; 
    if (!user.isModified("password")) return next()

    const hasedPasswoerd = await bcrypt.hash(user.password, 10)
    user.password= hasedPasswoerd
    next( )
})

module.exports = mongoos.model("User", userSchema)
