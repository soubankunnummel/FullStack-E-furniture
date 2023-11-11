import React, { useContext } from "react";
import { Productcontext } from "../../Context";
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
import { useNavigate } from "react-router-dom";
import Navebar from "../Navebar";

export default function LivingRoom() {
  const navigat = useNavigate();

  const handleViewProduct = (productId) => {
    navigat(`/View/${productId}`);
  };
  const { LivingRooms, serchTerm,cart } = useContext(Productcontext);
  return (
    <>
     <Navebar size={cart.length}  />
    <div className="container mx-5">
    <h3 className="mt-5" style={{ marginLeft: "10px", color: "black" }}>LivingRoom</h3>
      <MDBRow className="mt-5" id="allproducts">
        {LivingRooms.filter((val) => {
          return serchTerm.toLowerCase() === " "
            ? val
            : val.name.toLowerCase().includes(serchTerm);
          // return false; // Return false to exclude items that don't match the search term
        }).map((product, index) => (
          <MDBCol md="4" key={index}>
            <MDBCard className="mt-3">
              <MDBCardImage
                onClick={() => handleViewProduct(product.id)}
                src={product.image}
                position="top"
                alt="..."
              />
              <MDBCardBody>
                <MDBCardTitle>{product.name} </MDBCardTitle>
                <MDBCardText>{product.discription}</MDBCardText>
                <MDBCardTitle>₹{product.price} </MDBCardTitle>

                {/* Pass the product.id as a parameter to the handleViewProduct function */}
                <MDBBtn onClick={() => handleViewProduct(product.id)}>
                  View
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
    </>
  );
}
