import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Productcontext } from "../Context";
import './View.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Navebar from "../componets/Navebar";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function View() {
  // const {  cart, setCart, userName } = useContext(Productcontext);
  const [product, setProduct] = useState([])
  
  const { id } = useParams();
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate(); 

  let cartCount =  localStorage.getItem("count")

  
  useEffect(() => {
    const fechProduct = async () => {
      try {
        const response = await Axios.get(`/api/users/products/${id}`)
        if(response.status === 200) {
            setProduct(response.data.data)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fechProduct()
  },[])
  

  if (!product) { return <h1 style={{ textAlign: "center" }}>Product not found</h1>;}
  
  // add to cart

 
  const handleAddToCart = async () => {
    try {
      const response = await Axios.post( `/api/users/${userId}/cart`,{
        producId: id 
      })
      if (response.status === 200){
        
        toast.success("Product added to the cart!")

      }
      
    } catch (error) {
      console.error('Error adding product to the cart:', error);
      toast.error(error.response.data.message)
    }
  };

//   const doPayment = async () => {
//   try {
//     const response = await Axios.post(`/api/users/${id}/payment`);
//     if (response.status === 200) {
//       handleBuyNow(response.data.data);
//     } else {
//       // Handle other response statuses (e.g., show an error message)
//       console.error('Payment initiation failed:', response.data.message);
//     }
//   } catch (error) {
//     // Handle network errors or other exceptions
//     console.error('Error initiating payment:', error.message);
//   }
// };

// useEffect(() => {
//   doPayment();
// }, []);

const handleChekout = async () => {
  try {
    const response = await Axios.post(`/api/users/${userId}/payment`);
    if(response.status === 200){
      const url = response.data.url
      const confermation = window.confirm("Payment session created. Redirecting to the payment gateway. Continue?")
      if(confermation) window.location.replace(url)
    }
  } catch (error) {
    toast.error(error.response.data.message)
    
  }
};

 



  return (
    <>
      <Navebar size={cartCount}  />
    <div className="container mt-5">
      
        <MDBRow key={product._id} className="view-card">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardImage src={product.image} alt={product.title} />
            </MDBCard>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{product.name}</MDBCardTitle>
                <MDBCardText>{product.description}</MDBCardText>
                <MDBCardText>
                  <strong>Price:</strong> ₹{product.price}
                </MDBCardText>

                <MDBBtn
                  className="mx-2"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </MDBBtn>
                <MDBBtn color="success" onClick={() => handleChekout(product._id)}>
                  Buy Now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <div className="container exra-imges">
              <div className="row">
                <div className="col card mt-4"style={{height:"15rem"}}>
                  <img className="more-image"  src={product.imge1} alt="" />
                </div>
                <div className="col card mt-4"style={{height:"15rem"}}>
                  <img className="more-image"  src={product.imge2} alt="" />
                </div>
                <div className="col card mt-4"style={{height:"15rem"}}>
                  <img className="more-image"  src={product.imge3} alt="" />
                </div>
                
              </div>

              
            </div>
          </MDBCol>
      
        </MDBRow>

    
    </div>
    </>
  );
}
