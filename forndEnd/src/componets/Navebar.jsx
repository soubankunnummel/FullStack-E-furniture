import React, { useContext, useEffect, useId, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit"; 
// import { Products } from "./Products";
import { Link, useNavigate } from "react-router-dom";
import "./Navebar.css";
import { Productcontext } from "../Context";
import { Axios } from "../App";

export default function Navebar({ size }) {
  // const [serchTerm, setSerchTerm] = useState("");
  const [showBasic, setShowBasic] = useState(false);
  const navigat = useNavigate();
  const { userName, setUerName, serchTerm, setSerchTerm, productss } = useContext(Productcontext);
  // const [products, setProducts] = useState([])
  const userId = localStorage.getItem("userId")
  let storUseName = localStorage.getItem("userName");
  
  const handleCart = (id) => {
    navigat(`/cart/${id}`)
  }

  const handleWishList = (useId)  => {
    navigat(`/wishList/${useId}`)
  }

  const hanleLogOUt = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    storUseName = null;
    navigat("/");
  };
  //     useEffect(() => {
  //       const fechData = async () => {
  //          try {
  //         const response = await Axios.get("/api/users/products")
  //         if(response.status === 200){
  //           setProducts(response.data.data)
  //         }
  //       } catch (error) {
  //         console.log(error);
          
  //       }
  //       }
  //       fechData()


  // },[setProducts])
  return (
    <>
      <MDBNavbar
        expand="lg"
        className="nav-main"
        style={{ boxShadow: "none" }}
        light
        bgColor=""
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <div className="logo-img ms-2">
              <img
                onClick={() => navigat("/")}
                src={require("../images/RedWood logo black.png")}
                style={{ width: 50 }}
                alt=""
              />

              <img
                src={require("../images/redwood text.png")}
                style={{ width: 60 }}
                className="mt-2"
                alt=""
              />
            </div>
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mx-5 mb-lg-0 nav-main">
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => navigat("/")}
                  active
                  aria-current="page"
                  href="#"
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => navigat("/All")} href="">
                  Products
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Categories
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem onClick={() => navigat("/LivingRoom")} link>
                    Living Room
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => navigat("/DinigRoom")} link>
                    Dining Room
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => navigat("/Bedroom")} link>
                    Bedroom Furniture
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarNav>
            <form className="d-flex input-group w-auto">
              <input
                onChange={(e) => setSerchTerm(e.target.value)}
                id="searchInput"
                type="search"
                className="form-control"
                placeholder="Search items"
                aria-label="Search"
                style={{ width: "500px", borderRadius: 20 }}
              />
            </form>
            {serchTerm ? (
              <>
                <div className="search-results">
                  {productss
                    .filter((val) => {
                      if (serchTerm === "") {
                        return true; // Include all items when the search term is empty
                      } else if (
                        val.name.toLowerCase().includes(serchTerm.toLowerCase())
                      ) {
                        return true; // Include items that match the search term
                      }
                      return false; // Exclude items that don't match the search term
                    })
                    .map((item) => (
                      <div className="search-result-item" key={item.id}>
                        <hr />
                        <p
                          onClick={() => {
                            navigat(`/View/${item.id}`);
                            setSerchTerm("");
                          }}
                          className="sech-result"
                        >
                          {item.name}
                        </p>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              ""
            )}
            <MDBDropdown group className="shadow-0">
              <MDBDropdownToggle color="white">
                <MDBIcon
                  fas
                  icon="user-circle"
                  className="ms-1 me-2"
                  style={{ fontSize: "30px" }}
                />
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link onClick={() => navigat("/")}>
                  {" "}
                  {storUseName}{" "}
                </MDBDropdownItem>
                <MDBDropdownItem link onClick={() => navigat("/")}>
                  Settings
                </MDBDropdownItem>
                {storUseName === null ? (
                  <MDBDropdownItem
                    className="ms-3"
                    onClick={() => navigat("/Login")}
                  >
                    Sign In{" "}
                  </MDBDropdownItem>
                ) : (
                  <MDBDropdownItem link onClick={hanleLogOUt}>
                    {" "}
                    sign Out{" "}
                  </MDBDropdownItem>
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
            {storUseName === null ? (
              ""
            ) : (
              <>
               
                  <MDBIcon
                    fcas
                    icon="cart-plus"
                    color="black"
                    className="mx-1"
                    onClick={() => handleCart(userId)}
                  />
                
                <span>{size} </span>
              </>
            )}
        
                  <MDBIcon style={{marginLeft:40, fontSize:25,}} far icon="heart" onClick={() => handleWishList(userId) } />

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
