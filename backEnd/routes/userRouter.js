const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
// middlewares
const tryCatchMiddleware = require("../middelwares/tryChatchMiddleware")
const verifyToken = require("../middelwares/userAuthMiddleware")

 
router
.post("/register", tryCatchMiddleware(userController.userRegister) )
.post("/login",tryCatchMiddleware(userController.userLogin)) 
.get("/allProducts",tryCatchMiddleware(userController.allProducts))
.use(verifyToken)
.get("/products", tryCatchMiddleware(userController.viewProduct))
.get("/products/:id", tryCatchMiddleware(userController.productById))
.get("/products/category/:categoryname", tryCatchMiddleware(userController.productByCatogery))

.post("/:id/cart",tryCatchMiddleware(userController.addToCart)) 
.get("/:id/cart",tryCatchMiddleware(userController.viewCartProdut))
// .put("/:id/cart/quantity/:itemId",tryCatchMiddleware(userController.productQuantity))
.put('/:id/cart', tryCatchMiddleware(userController.updateCartItemQuantity))
.delete("/:id/cart/:itemId",tryCatchMiddleware(userController.removeCartProduct))


.post("/:id/wishlists",tryCatchMiddleware(userController.addToWishlist))
.get("/:id/wishlists", tryCatchMiddleware(userController.showWishlist))
.delete("/:id/wishlists",tryCatchMiddleware(userController.delete)) 
.post("/:id/payment", tryCatchMiddleware(userController.payment))
.get("/payment/success",tryCatchMiddleware(userController.success)) 
.post("/payment/cansel",tryCatchMiddleware(userController.cansel))
.get("/:id/orders",tryCatchMiddleware(userController.orderDetails))



module.exports = router