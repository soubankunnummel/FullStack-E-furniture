const mongoos = require("mongoose")
const productSchema = new mongoos.Schema({

    title : String,
    description: String,
    price: Number,
    image: String,
    category: String,
    quantity: {
        type: Number,
        default: 1, 
    }
   

})

module.exports = mongoos.model("Product", productSchema)