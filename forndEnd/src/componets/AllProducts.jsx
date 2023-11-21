import React, { useContext, useEffect, useState } from "react";
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
import { Productcontext } from "../Context";
import { useNavigate } from "react-router-dom";
import Navebar from "./Navebar";
import { Axios } from "../App";



export default function AllProducts() {
  
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/api/users/products");
        if (response.status === 200) {
          setProducts(response.data.data);
        } 

      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    fetchProducts();
  }, []);
  
  const handleViewProduct = (productId) => {
    navigate(`/View/${productId}`);
  };

  // const { products } = useContext(Productcontext);

  return (
    <>
    <Navebar/>
      <div className="container mx-5">
       
        <MDBRow className="mt-5 my-5" id="allproducts">
          {products.map((product, index) => (
              <MDBCol md="3" key={index} style={{ marginBottom: 10 }}>
                <MDBCard className=" hover-zoom  ">
                  <MDBCardImage 
                    className=""
                    onClick={() => handleViewProduct(product.id)}
                    src={product.image}
                    position="top"
                    alt="..."
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{product.name} </MDBCardTitle>
                    <MDBCardText>{product.discription}</MDBCardText>
                    <MDBCardTitle>${product.price} </MDBCardTitle>

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
