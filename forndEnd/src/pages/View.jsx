import React, { useContext } from "react";
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

export default function View() {
  const { productss, cart, setCart, userName } = useContext(Productcontext);
  const { id } = useParams();
  
  const navigate = useNavigate();
  
  // Filter the product that matches the 'id' parameter
  const viewProduct = productss.filter(
    (product) => product.id === parseInt(id)
  );

  if (!viewProduct) {
    // Handle the product is not found
    return <h1 style={{ textAlign: "center" }}>Product not found</h1>;
  }
  
  const handleAddToCart = () => {
    // Check if the product is already in the cart
    if (cart.includes(viewProduct[0])) {
      alert("Product is already added to the cart");
    } else {
      // Add the selected product to the cart
      setCart(() => [...cart, ...viewProduct]);
      console.log(cart);
    }
    
    if (userName === "") {
      alert("Please login");
      navigate("/Login");
    } else {
      // User is logged in, allow them to add to cart
      alert("Product successfully added to the cart");
      navigate("/Cart");
    }
  };
  
  const handleBuyNow = () => {
    if (userName === "") {
      alert("Please login");
      navigate("/Login");
    }else{
      navigate("/Cart");
      
    }

    
  };

  return (
    <>
      <Navebar size={cart.length}  />
    <div className="container mt-5">
      {viewProduct.map((item) => (
        <MDBRow key={item.id} className="view-card">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardImage src={item.image} alt={viewProduct.name} />
            </MDBCard>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{item.name}</MDBCardTitle>
                <MDBCardText>{item.description}</MDBCardText>
                <MDBCardText>
                  <strong>Price:</strong> ₹{item.price}
                </MDBCardText>

                <MDBBtn
                  className="mx-2"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </MDBBtn>
                <MDBBtn color="success" onClick={handleBuyNow}>
                  Buy Now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <div className="container exra-imges">
              <div className="row">
                <div className="col card mt-4"style={{height:"15rem"}}>
                  <img className="more-image"  src={item.imge1} alt="" />
                </div>
                <div className="col card mt-4"style={{height:"15rem"}}>
                  <img className="more-image"  src={item.imge2} alt="" />
                </div>
                <div className="col card mt-4"style={{height:"15rem"}}>
                  <img className="more-image"  src={item.imge3} alt="" />
                </div>
                
              </div>

              
            </div>
          </MDBCol>
      
        </MDBRow>

      ))}
    </div>
    </>
  );
}
