import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Navebar from "../Navebar";
import { Axios } from "../../App";

export default function Bedroom() {
  const navigat = useNavigate();
  const {categoryname} = useParams()

  const handleViewProduct = (productId) => {
    navigat(`/View/${productId}`);
  };
  const { BedroomProductss, serchTerm, cart } = useContext(Productcontext);
  const [product,setProduct] = useState([])
  console.log(product)
  useEffect(() => {
    const fetchCategory = async () => {
        try {
          const response = await Axios.get(`/api/users/products/category/${categoryname}`)
          console.log(response)
          if(response.status === 200){
            setProduct(response.data.data)
          }
        } catch (error) {
          console.log(error)
          
        }
    }
    fetchCategory()
  },[])
  
  return (
    <>
      <Navebar size={cart.length} />
      <div className="container mx-5">
        <h3 className="mt-5" style={{ marginLeft: "10px", color: "black" }}>
          Bedroom
        </h3>
        <MDBRow className="mt-5" id="allproducts">
          {product.map((product, index) => (
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
