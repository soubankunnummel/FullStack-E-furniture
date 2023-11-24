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
  MDBIcon, 
} from "mdb-react-ui-kit"; 
import { Productcontext } from "../Context";
import { useNavigate } from "react-router-dom";
import Navebar from "./Navebar";
import { Axios } from "../App";
import toast from "react-hot-toast";




export default function AllProducts() {
  
  const {addToWishlist} = useContext(Productcontext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  const isUser = localStorage.getItem("userId")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/api/users/allProducts");
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
    if (isUser) {
      navigate(`/View/${productId}`);
     } else {
       toast.error("Please Log in");
     }
  };

  // const { products } = useContext(Productcontext);

  return (
    <>
    <Navebar/>
      <div className="container mx-5">
       
        <MDBRow className="mt-5 my-5" id="allproducts">
          {products.map((product, index) => (
              <MDBCol md="3" key={product._id} style={{ marginBottom: 10 }}>
                <MDBCard className=" hover-zoom  ">
                  <MDBCardImage 
                    className=""
                    onClick={() => handleViewProduct(product._id)}
                    src={product.image}
                    position="top"
                    alt="..."
                  />
                  <MDBCardBody className="d-flex justify-content-evenly" >
                    <div>

                    <MDBCardTitle>{product.title} </MDBCardTitle>
                    <MDBCardText>{product.discription}</MDBCardText>
                    <MDBCardTitle>${product.price} </MDBCardTitle>

                    {/* Pass the product.id as a parameter to the handleViewProduct function */}
                    <MDBBtn onClick={() => handleViewProduct(product._id)}>
                      View
                    </MDBBtn>
                    </div>
                    <div>

                    <MDBIcon style={{marginLeft:80, fontSize:25,}} far icon="heart" 
                  
                  onClick={() => 
                    isUser ? addToWishlist(product._id): toast.error("Pleas login")
                  } />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </div>
    </>
  );
}
