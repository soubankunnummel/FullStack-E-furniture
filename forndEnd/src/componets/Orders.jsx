import React, { useEffect, useId, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Orders.css"
import { Axios } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import Navebar from "./Navebar";
// import "./ecommerce-category-product.css";

export default function Orders() {
    const [oreders, setOrders] = useState([])
    console.log(oreders)
    const navigate = useNavigate()
    const {id} = useParams()
  
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await Axios.get(`/api/users/${id}/orders`)
                if(response.status === 200){
                    setOrders(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrder()
    },[])
  return (
    <>
    <Navebar/>
    <MDBContainer fluid>
        {oreders.map((item) => (  
        item.products.map((products) => (

            <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                    >
                    <MDBCardImage
                      src={products.image}
                      fluid
                      className="w-100"
                      />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{products.title} </h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                    <span>310</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                    <span></span>
                    <span className="text-primary"> </span>
                    <span></span>
                    <span className="text-primary"></span>
                    <span>
                     
                      <br />
                    </span>
                  </div>
                 
                  <p className="text-truncate mb-4 mb-md-0">
                    {products.description}
                  </p>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                  >
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{products.price}</h4>
                    <span className="text-danger">
                      <s>$20.99</s>
                    </span>
                  </div>
                  <h6 className="text-success">Deliverd</h6>
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn color="primary" size="sm" onClick={() =>  navigate(`/`)}>
                      Back to sho ping
                    </MDBBtn>
                    <MDBBtn outline color="primary" size="sm" className="mt-2" onClick={() => navigate(`/wishList/${id}`)}>
                      Go to wish list
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    ))
))}
     
    </MDBContainer>
  </>
  );
}

