import React, { useContext, useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Productcontext } from "../Context";
import { Axios } from "../App";

export default function Wishlist() {
    const userId = localStorage.getItem("userId")
   const {wishLit ,fetchWishList,setWishlist} =
      useContext(Productcontext);
      fetchWishList(userId,setWishlist)
      const navigate = useNavigate();
      TODO: // compleae wishlist 


      
      // const [products, setProducts] = useState([])

//    useEffect(() => {
//     const fechWishList = async () => {
//         try {
//             const  response = await Axios.get("/api/users/:id/wishlists")
//             if(response.status === 200) {
//                 setProducts(response.data.data)
//             }
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     fechWishList()
//    })

//    FetchWishlist(loginStatus, userID, setWishlist);

   return (
      <>
         <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: "80px" }}>
            <h1 className="mt-5 text-black fw-bolder">
               <span>My</span> Wishlist
            </h1>

            <div className="product-content">
               {wishLit.length !== 0 ? (
                  wishLit.map((value) => (
                     <div className="box" >
                        <div className="box-img" >
                           <img  />
                        </div>
                        <h3 >title</h3>
                        <div className="inbox">
                           <span className="strike-price">{value.title}</span>
                           <span className="price">price</span>
                        </div>
                        <div className="heart">
                           {wishLit.some((item) => item._id === value._id) && (
                              <MDBIcon
                                 fas icon="heart" className="clicked-heart-icon"
                                //  onClick={() => removeFromWishlist(value._id)}
                              />
                            )} 
                        </div>
                     </div>
                   )) 
               ) : ( 
                  <h1>Wishlist is Empty!</h1>
           )} 
            </div>
         </section>
      </>
   );
}
