require("dotenv").config();
const products = require("../models/productSchema");
const jwt = require("jsonwebtoken");
const { joiProductSchema } = require("../models/validationSchema");
const Users = require("../models/UsersSchema");
const Order = require("../models/orderSchema");

module.exports = {
  // admin login

  login: async (req, res) => {
    const { username, password } = req.body;
    console.log("admin:",username,password)
    if (
      username === process.env.ADMIN_USER_NAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const toekn = jwt.sign(
        { username },
        process.env.ADMIN_ACCES_TOKEN_SECRET
      );
      return res.status(200).send({
        statu: "Succes",
        message: "Admin registratin succs full",
        data: toekn,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Thsi is no an admin🧐 ",
      });
    }
  },

  // finding all users

  allUsers: async (req, res) => {
    

    const allUsers = await Users.find();
    // console.log("allusers",allUsers)

if (allUsers.length === 0) {
  res.status(404).json({
    status: "error",
    message: "Users not found",
  });
} else {
  res.status(200).json({
    status: "success",
    message: "Successfully fetched user data",
    data: allUsers,
  });
}

  },

  //View a specific user details by id
  //TODO:add more details of user
  useById: async (req, res) => {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not fount",
      });
    }

    res.status(200).send({
      status: "Succes",
      message: "Succesfuly find user",
      data: {user},
    });
  },

  ///View all the products by category

  allProducts: async (req, res) => { 
    const prods = await products.find();
    if (!prods) {
      return (
        res.status(404),
        send({
          status: "error",
          message: "Products not fount",
        })
      );
    }
    res.status(200).json({
      status: "success",
      message: "Successfully fetched products detail.",
      data: prods,
    });
  },

  // Products by Id

  productsById: async (req, res) => {
    const producId = req.params.id;
    const product = await products.findById(producId);
    if (!product) {
      return res.status(404).send({
        status: "error",
        message: "Product not fount",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully fetched product details.",
      data: product,
    });
  },

  ///-> Create a product.

  creatProduct: async (req, res) => {
    console.log("creaded")
    const { value, error } = joiProductSchema.validate(req.body);
    const { title, description, price, image, category } = value;
    console.log("valeudfdfdfd", value)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
      //    return res.send(error.message)
    } else {  
      await products.create({
        title,
        description, 
        price,
        image,
        category,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully Created products .",
        data: products,
      });
    }
  },

  // admin Delete a product
 
  deleteProduct: async (req, res) => {
    const producId = req.params.id;
  
    try {
      const product = await products.findByIdAndRemove(producId);
  
      if (!product) {
        return res.status(404).json({
          status: "failure",
          message: "Product not found in the database",
        });
      }
      const updatedProducts = await products.find()
  
      return res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        data: updatedProducts
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',

      });
    }
  },
  
  // admin update product 

  updateProduct: async (req, res) => {
    try {
        const { value, error } = joiProductSchema.validate(req.body);

        const { id, title, description, price, image, category } = value;
        console.log(title)
        if (error) {
            return res.status(401).json({ status: 'error', message: error.details[0].message });
        }

    

        const updatedProduct = await products.findByIdAndUpdate(
            id,
            { $set: { title, description, price, image, category } },
            { new: true } // This option returns the modified document rather than the original
        );
        console.log(updatedProduct)

        if (updatedProduct) {
            const updatedProducts = await products.find();
            return res.status(200).json({
                status: 'success',
                message: 'Successfully updated the product.',
                data: updatedProducts,
            });
        } else {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
},

  // admin Order details

  orderDtails: async (req, res) => {
    const products = await Order.find();
    if (products.length === 0) {
      return res.status(200).json({
        message: "No products ",
      }); 
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully fetched order details",
      products,
    });
  },
  
  //Total revenue generated

  status: async (req, res) => {
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalProduct: { $sum: { $size: "$products" } },
          totalRevenue: { $sum: "$total_amount" },
        },
      },
    ]);

    if (totalRevenue.length > 0) {
      // You have results
      res.status(200).json({ status: "Success", data: totalRevenue[0] });
    } else {
      // No results found
      res
        .status(200)
        .json({
          status: "Success",
          data: { totalProduct: 0, totalRevenue: 0 },
        });
    }
  },
  userOrderDetails: async (req, res) => {
    const userId = req.params.id;
      // console.log('User:', user);
      const user = await Users.findById(userId).populate('orders')
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
