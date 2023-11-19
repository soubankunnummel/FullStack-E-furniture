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
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Banner from "../componets/Banner";
import Navebar from "../componets/Navebar";
import { Axios } from "../App";
import toast from "react-hot-toast";
import { Productcontext } from "../Context";


export default function Home() {
  const {addToWishlist,wishStatus} = useContext(Productcontext)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); 
  const isUser = localStorage.getItem("userName")
  const cartCount = localStorage.getItem("count")

  const handleViewProduct = (productId) => {
    if (isUser) {
     navigate(`/View/${productId}`);
    } else {
      toast.error("Please Log in");
    }
  };


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

  return (
    <>
      <Navebar size={cartCount} />
      <Banner />
      <div className="container mx-5 ">
        <h1
          className="mt-5 my-5 home-card ms-3"
          style={{ fontSize: "28px", color: "black" }}
        >
          products
        </h1>
        <MDBRow className="mt-5 my-5 card-row" id="allproducts">
          {products.map((product, index) => (
            <MDBCol md="3" sm={2} key={index} style={{ marginBottom: 10 }}> 
              <MDBCard className=" hover-zoom  ">
                <MDBCardImage
                  className=""
                  onClick={() => handleViewProduct(product._id)}
                  src={product.image}
                  position="top"
                  alt="..." 
                />
                <MDBCardBody className="d-flex justify-content-evenly">
                  <div>

                  <MDBCardTitle>{product.title} </MDBCardTitle>
                  <MDBCardText>{product.description}</MDBCardText>
                  <MDBCardTitle>${product.price} </MDBCardTitle>
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
