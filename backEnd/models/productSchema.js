const mongoos = require("mongoose")
const productSchema = new mongoos.Schema({

    title : String,
    description: String,
    price: Number,
    image: String,  
    img1:String, 
    img2:String,
    img2:String,
    category: String,
  
   

})
TODO:// add aditional images

module.exports = mongoos.model("Product", productSchema)