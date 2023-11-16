import React, { useContext, useEffect, useId, useState } from "react";
import './Cart.css'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography, 
} from "mdb-react-ui-kit";
import { Productcontext } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import Navebar from "../componets/Navebar";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function Cart({}) {
  // const { cart, setCart, itemCount } = useContext(Productcontext);
  const {cartCount, setCartCount} = useContext(Productcontext)
  const [products, setProducts] = useState([])
  console.log(products)
  const {id} = useParams()
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")

  
 useEffect(() => {
  setCartCount(localStorage.setItem("count", products.length ))
 },[])

  

    // feching cart products

    const fechCart = async () => {
      try {
        const response = await Axios.get(`/api/users/${userId}/cart`)
        if(response.status === 200){
          setProducts(response.data.data)
        }
      } catch (error) {
        console.log(error)
        
      }
    }
    
    useEffect(() => { 
      fechCart()

  },[])
   

  const handleBackToShopping = () => {
    navigate("/");
  };


  // handle product quntity

  // Function to increase quantity of a product in the cart
  // const qtyplus = async (itemId) => {
  //   const payload = {operation:"add"}
  //   try{
  //     const response = await Axios.put(`/api/users/${id}/cart/quantity/${itemId}`,payload) 
     
  //     console.log(response)
  //     if(response.status === 200){
  //      return fechCart();
  //     }
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // };
// Fuction to decrement quntity of poroducnt in the cart

  // const qtyminus = async (itemId) => {
 
    
  //   const payload = {operation:"substract"}
  //   try{
  //     const response = await Axios.put(`/api/users/${id}/cart/quantity/${itemId}`,payload)
  //     if(response.status === 200){
  //      return fechCart();
  //     }
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // };

  const handleQuantity = async (cartID, quantityChange) => {
    const data = { id: cartID, quantityChange };
    try {
       await Axios.put(`/api/users/${id}/cart`, data);
       const response = await Axios.get(`/api/users/${id}/cart`);
       if(response.status === 200){
        return fechCart()
       }
    } catch (error) {
       toast.error("this is an err");
    }
 };

 // handle produt remove 

 
 const handleRemoveItem = async (itemId) => {
  try {
     
     const response = await Axios.delete(`/api/users/${id}/cart/${itemId}`);
     console.log(response)
    if (response.status === 200) {
       fechCart()
    }
  } catch (error) {
    console.error(error);
    toast.error('Error removing product from the cart');
  }
};



  return (
    <>
    <Navebar size={cartCount}  />
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="h-100 py-5 cart-contain">
        <MDBRow className="justify-content-center align-items-center h-100 cart-contain">
          <MDBCol>
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBRow>
                  <MDBCol lg="7" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Your products
                    </MDBTypography>

                    {products && products.map((item) => (
                      
                      <div
                        className="d-flex align-items-center mb-5"
                        key={item._id}
                      >
                        <div className="flex-shrink-0">
                          <MDBCardImage
                            src={item.productsId.image}
                            fluid
                            style={{ width: "150px" }}
                            alt={item.productsId.title}
                          />
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <a
                            href=""
                            className="float-end text-black"
                            onClick={() => handleRemoveItem(item.productsId._id)}
                          >
                            <MDBIcon far icon="trash-alt" />
                          </a>
                          
                          <MDBTypography tag="h5" className="text-primary">
                            {item.productsId.title}
                          </MDBTypography>
                          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                            
                          </MDBTypography>

                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">
                              {item.productsId.price}$
                            </p>
                            <div
                              className="d-flex align-items-start bg-light mb-3"
                              style={{ height: "100px" }}
                            >
                              <MDBCol>

                              <MDBBtn
                                style={{ border: "1px" }}
                                className="minus mx-3 "
                                onClick={() => handleQuantity(item._id, -1)}
                              >
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>
                             <span className="me-4">{item.quantity}</span>
                              <MDBBtn
                                className="plus"
                                style={{ border: "1px" }}
                               onClick={() => handleQuantity(item._id, 1)}
                              >
                                <MDBIcon fas icon="plus" />
                              </MDBBtn>


                              </MDBCol>
                              
                            </div>

                            <div className="def-number-input number-input safari_only">
                              {/* <MDBBtn>Button</MDBBtn> */}
                              
                            </div>
                          </div>
                         
                          <MDBTypography
                            tag="h5"
                            style={{ width: "100px" }}
                            className="fw-bold mx-5 "
                          >
                            {item.productsId.price * item.quantity}  Items
                          </MDBTypography>
                        </div>
                      </div>
                    ))}
                  </MDBCol>

                  <MDBCol lg="5" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    ></MDBTypography>

                    <form className="mb-5">
                      <MDBTypography
                        tag="h5"
                        className="fw-bold mb-5"
                        style={{ position: "absolute", bottom: "0" }}
                      >
                        <MDBBtn
                          onClick={() => navigate("/Pyment")}
                          className=""
                          block
                          size="lg"
                        >
                          Buy now
                        </MDBBtn>

                        <a
                          href="#!"
                          className="m-2"
                          onClick={handleBackToShopping}
                        >
                          <MDBIcon
                            className="pt-4"
                            fas
                            icon="angle-left me-2"
                          />
                          Back to shopping
                        </a>
                      </MDBTypography>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}
