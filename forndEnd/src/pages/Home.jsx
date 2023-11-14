import React, { useEffect, useState } from "react";
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
import "./Home.css";
import Banner from "../componets/Banner";
import Navebar from "../componets/Navebar";
import { Axios } from "../App";
import toast from "react-hot-toast";


export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); 
  const isUser = localStorage.getItem("userName")
  const cartCount = localStorage.getItem("count")

  const handleViewProduct = (productId) => {
    isUser ?  navigate(`/View/${productId}`):
    toast.error("Please Loagin")

   
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
                <MDBCardBody>
                  <MDBCardTitle>{product.title} </MDBCardTitle>
                  <MDBCardText>{product.description}</MDBCardText>
                  <MDBCardTitle>${product.price} </MDBCardTitle>
                  <MDBBtn onClick={() => handleViewProduct(product._id)}>
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
