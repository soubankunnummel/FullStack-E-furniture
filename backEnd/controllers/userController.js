// const mongoose = require("mongoose");
const User = require("../models/UsersSchema");
const product = require("../models/productSchema");
const Order = require("../models/orderSchema");
const { joiUserSchema } = require("../models/validationSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  
const { default: mongoose } = require("mongoose");  
const { json } = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let sValue = [];



module.exports = {
  // user Rgistration

  userRegister: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid user input ☹️. Please check your data. 🙂 ",
      });
    }
    const { name, email, username, password } = value;
    console.log(name) 
    await User.create({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    res.status(201).json({
      status: "Status",
      message: "User registration Succesfull😊 ",
    });
  },

  // user Loging

  userLogin: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);
    console.log("user",value)
    if (error) {
      return res.json(error.message);
    }

    const { username, password } = value;
    console.log(username);
    const user = await User.findOne({
      username: username,
    });
    
    const id = user.id
    // const usrname = user.name
    
    // console.log(id,usrname)


    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    
    if (!password || !user.password) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid input" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "error", message: "Incorrect password" });
    }
    
    
    
    const toekn = jwt.sign(
      { username: user.username },
      process.env.USER_ACCES_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );
    res
      .status(200)
      .json({ status: "succes", message: "Login Successfull", data: toekn, username, id });
  },

  // every one can access products

  allProducts: async (req, res) => {
    const products = await product.find(); 
    if (!products) {
      res.status(404).send({ status: "error", message: "product not found" });
    }
    res.status(200).send({
      status: "succes",
      message: "Succes fully feched data ",
      data: products,
    });
  },

  // view all product by category

  viewProduct: async (req, res) => {
    const products = await product.find(); 
    if (!products) {
      res.status(404).send({ status: "error", message: "product not found" });
    }
    res.status(200).send({
      status: "succes",
      message: "Succes fully feched data ",
      data: products,
    });
  },

  /// View a specific product.
  productById: async (req, res) => {
    const producId = req.params.id;
    const prod = await product.findById(producId);
    if (!prod) {
      return res.status(404).json({
        status: "error",
        message: "Product not fount",
      });
    }
    res.status(200).json({
      status: "Succes",
      data: prod,
    });
  },

  ///  product by category

  productByCatogery: async (req, res) => {
   console.log(req.body)
    const prodCatogery = req.params.categoryname;
    console.log(prodCatogery)
    const products = await product.find({ category: prodCatogery });
 
    if (!products) {   
      return res.status(404).send({
        status: "error", 
        message: "Product not fond",
      });
    }
    res.status(200).send({
      status: "Succes ",
      message: "Succesfully fetched ",
      data: products,
    });
  },

  // -> user  add to cart

  addToCart: async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "Failure",
        message: "User not found",
      });
    }
  
    const { producId } = req.body;
  
    if (!producId) {
      return res.status(404).json({
        status: "Failure",
        message: "Product not found ☹️",
      });
    }
  
    // Check if the product is already in the cart
    const isProductInCart = user.cart.some(item => item.productsId.equals(producId));
  
    if (isProductInCart) {
      return res.status(400).send({
        status: "Failure",
        message: "Product is already in the cart",
      });
    }
  
    await User.updateOne(
      { _id: userId },
      { $addToSet: { cart: { productsId: producId } } }
    );
  
    res.status(200).send({
      status: "Success",
      message: "Successfully added product to cart",
    });
  },
  

  // produc count handling 
 
//   productQuantity:async(req,res)=>{

//     const id = req.params.id;
//     const itemId = req.params.itemId;

//     console.log("userID",id,"produId",itemId);
//     const {operation} = req.body;
//    const user = await User.findOne({ _id: id, });

// if(user){
//   const item = user.cart.find((cartItem) => cartItem.productsId == itemId);
//    console.log("item",item)
//    const qty = item.quantity

//    if(operation === "add"){
//     await User.findOneAndUpdate(
//          {
//            "_id": id,
//            "cart._id": itemId
//          },
//          {
//            $inc: {
//              "cart.$.quantity": 1 
//            }
//          },
//        );
//        return res.status(200).json({status:"Success",message:"quantity added successfully"})
//      }
     
//      if(operation === "substract"){
//       if(qty>1){
//         await User.findOneAndUpdate(
//           {
//             "_id": id,
//             "cart._id": itemId
//           },
//           {
//             $inc: {
//               "cart.$.quantity": -1 
//             }
//           },
//         );
//         return res.status(200).json({status:"Success",message:"quantity substracted successfully"})
//       }
// }
// }
// else{
//   res.status(404).json({message:"user not found occured"})
// }
// },
updateCartItemQuantity: async (req, res) => {
  console.log(req.body)
  const userID = req.params.id; 
  const { id, quantityChange } = req.body;

  const user = await User.findById(userID);
  if (!user) { return res.status(404).json({ message: 'User not found' }) }

  const cartItem = user.cart.id(id);
  if (!cartItem) { return res.status(404).json({ message: 'Cart item not found' }) }

  cartItem.quantity += quantityChange;

  if (cartItem.quantity > 0) {
    await user.save();
  }

  res.status(200).json({
    status: 'success',
    message: 'Cart item quantity updated',
    data: user.cart
  });
},

  /// view product from cart

  viewCartProdut: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    // console.log(user) 
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failear", message: "User Not Fount" });
    }

    const cartProductIds = user.cart;
    if (cartProductIds.length === 0) {
      return res
        .status(200)
        .json({ status: "Succes", message: "User Cart is Emty", data: [] });
    }

    const cartProducts = await User.findOne({_id: userId}).populate("cart.productsId")
    res
      .status(200)
      .json({
        status: "Success",
        message: "Cart products fetched successfully",
        data: cartProducts.cart,
      });
    // console.log(product);
  },
  // remove produt from the cart

  removeCartProduct : async  (req, res) => {
    
    const userId = req.params.id
    const itemId = req.params.itemId
    console.log("itemId" ,itemId)
    if(!itemId){
      return res.status(404).json({message:"Product Not fount"})
    }

    const user = await User.findById(userId)
    if(!user){
      res.status(404).json({message:"User not fount"})
    }
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { cart: { productsId:itemId } } }
    );
  
    if (result.modifiedCount > 0) {
      console.log("Item removed successfully");
      res.status(200).json({message:"Product removed successfuly",data: result})
    } else {
      console.log("Item not found in the cart");
    }


  },
  /// Add product to wish list.

  addToWishlist: async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(404)
        .json({ status: "Failear", message: "User Not Fount!" });
    }

    const { productId } = req.body;
    console.log(productId)
    const prod = await product.findById(productId);
    if (!prod) {
      return res
        .status(404)
        .json({ status: "Failear", message: "Product not found" });
    }

    const findProd = await User.findOne({ _id: userId, wishlist: productId });
    if (findProd) {
      return res
        .status(409)
        .json({ message: "Product already on your wishlist " });
    }

    // console.log(prod);

    await User.updateOne({ _id: userId }, { $push: { wishlist: prod } });
    res.status(201).json({
      status: "Success",
      message: "Product Succesfuly added to wishList",
    });
  },

  /// show wishList

  showWishlist: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failear", message: "User Not Found" });
    }
    const wishProId = user.wishlist;
    if (wishProId.length === 0) {
      return res
        .status(200)
        .json({ status: "Succes", message: "User Wishlist is Emty", data: [] });
    }

    const wishProducts = await product.find({ _id: { $in: wishProId } });
    res
      .status(200)
      .json({
        status: "Success",
        message: "Wishlist products fetched successfully",
        data: wishProducts,
      });
  },

  // delete wishlist products

  delete: async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;
   
  
    if (!productId) {
      return res.status(404).json({ message: "Product not Found" });
    }
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "Failure", message: "User Not Found" });
    }
  
    await User.updateOne({ _id: userId }, { $pull: { wishlist: productId } });
    res.status(200).json({ message: "Successfully removed from wishlist" });
  },
  

  // Paymets

  payment: async (req, res) => {
    const userId = req.params.id; 
  
    // uid = userId  //  for parsing globel vareable
    const user = await User.findOne({ _id: userId }).populate("cart.productsId");
    // console.log("user:",user)

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    const cartProdcts = user.cart;
    // console.log("cartProducts", cartProdcts);   
    if (cartProdcts.length === 0) {
      return res
        .status(200)
        .json({ status: "Succes", message: "User Cart is Emty", data: [] });
    }

    const lineItems = cartProdcts.map((item) => {
      // console.log("Item price:", item.productsId.price);
      return {
        price_data: {
          currency: "inr",
          product_data: {
            images:[item.productsId.image],
            name: item.productsId.title,
            // description: item.description,
          },
          unit_amount: Math.round(item.productsId.price * 100),
        },
        quantity: item.quantity,
      };
    });
console.log("lineitems",lineItems)
  //   const totalAmount = lineItems.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0);
  // console.log("Total Amount:", totalAmount);

    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/payment/success`, 
      cancel_url: "http://localhost:3000/payment/cancel", 
    });

    // console.log("Stripe Session:", session);

    if (!session) {
      return res.json({
        status: "Failure",
        message: " Error occured on  Session side",
      });
    }
    sValue = {
      userId,
      user,
      session,
    };
    // console.log(sValue)

    res.status(200).json({
      status: "Success",
      message: "Strip payment session created",
      url: session.url,
    });
  },

  success: async (req, res) => {
    const { id, user, session } = sValue;
    // console.log(id)
    const userId = user._id;
    const cartItems = user.cart;
    // console.log("cartItems",cartItems)
    const productId = cartItems.map((item) => item.productsId)
    const orders = await Order.create({
      userId: id,
      products:productId,
      order_id: session.id,
      payment_id: `demo ${Date.now()}`,
      total_amount: session.amount_total / 100,
    });
    // console.log("ordrs:", orders)

    if (!orders) {
      return res.json({ message: "error occured while inputing to orderDB" });
    }

    const orderId = orders._id;
    // console.log("order;eid", orderId)

    const userUpdate = await User.updateOne(
      { _id: userId },
      {
        $push: { orders: orderId },
        $set: { cart: [] },
      },
      { new: true }
    );

    // console.log(userUpdate);

    // console.log ("uSer Update",userUpdate)

    if (userUpdate.nModified === 1) {
      res.status(200).json({
        status: "Success",
        message: "Payment Successful.",
      });
    } else {
      res.status(500).json({
        status: "Error",
        message: "Failed to update user data.",
      });
    }
  },

  // order canseling

  cansel: async (req, res) => {
    res.status(200).json({
      status: "Success",
      message: "Payment cancelled.",
    });
  },

//   orderDetails: async (req, res) => {
//     const userId = req.params.id;

//     const user = await User.findById(userId).populate("orders");
//     console.log("Used :",user);
//     if (!user) {
//       return res.status(404).json({
//         status: "Faliear",
//         message: "User Not found",
//       });
//     }
//     const ordProduts = user.orders;
//     console.log("userOders :",ordProduts);

//     // const ordProd = await product.findById({_id: ordProduts })

    

// const ordProd = await Order.find({ _id: { $in: ordProduts } })
// console.log("finding order:",ordProd)

// const orderIds = ordProduts.map(order => order._id);
// const ordersWithProducts = await Order.find({ _id: { $in: orderIds } }).populate('products');
// console.log(ordersWithProducts)

// //  const det = await product.findById({_id: data })
 
//     // if (orderIds.length === 0) {
//     //   return res
//     //     .status(200)
//     //     .json({ message: "you don't have no product to order" });
//     // }
//     // const prodDetails = await Order.find({ _id: { $in: ordProduts } })
//     // .populate("products") 
   

//     res
//       .status(200)
//       .json({ message: "Orders Products finded",data:ordersWithProducts});
//   },


// orderDetails: async (req, res) => {
//   const userId = req.params.id;

//   const user = await User.findById(userId).populate('orders')
//   console.log("user:-", user)
//   if (!user) {
//     return res.status(404).json({
//       status: 'Failure',
//       message: 'User Not Found',
//     });
//   }

//   const ordProduts = user.orders;
//   console.log("order", ordProduts)
//   // console.log("idu",user.orders[0]._id);

//   if (ordProduts.length === 0) {
//     return res.status(200).json({
//       message: "You don't have any product orders.",
//       data: [],
//     });
//   }
 
//   // orderDetails function
// const ordersWithProducts = await Order.find({ _id: ordProduts  }).populate('products'); 
// // console.log(ordersWithProducts)


// res.status(200).json({
// message: 'Ordered Products Details Found',
// data: ordersWithProducts,
// });

// },

orderDetails: async (req, res) => {
  const userId = req.params.id;
  
    // console.log('User:', user);
    const user = await User.findById(userId).populate('orders')
  console.log('User:', user);

  if (!user) {
      return res.status(404).json({
          status: 'Failure',
          message: 'User Not Found',
      });
  }

  const ordProduts = user.orders;
  console.log('User Orders:', ordProduts);

  if (ordProduts.length === 0) {
      return res.status(200).json({
          message: "You don't have any product orders.",
          data: [],
      });
  }
  
  const ordersWithProducts = await Order.find({ _id: { $in: ordProduts } })
  .populate("products")

  res.status(200).json({
      message: 'Ordered Products Details Found',
      data: ordersWithProducts,
  });
}


};
