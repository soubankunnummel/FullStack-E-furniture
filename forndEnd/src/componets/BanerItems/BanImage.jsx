import { MDBCol } from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BanImage() {
    const navigator = useNavigate();
    const handlShopnow = () => {
        navigator("/");
      };
  return (
    <>
      <div className=" container   ">
        <div className="row ban-main ">
          <div className="images mt-5   ">
            <div className="d-flex   mb-3 ms-5" style={{ height: "650px" }}>
              <MDBCol className="pe-2">
                <img
                  className="ban-img"
                  src="https://www.ikea.com/images/new-lower-price-page-bf74a1c152fa73885a2cf0755d7ea604.jpg?f=s"
                  alt=""
                />
                <div className="mt-4">
                  <h1 className="newLower-text">
                    New lower prices to refresh your bedroom
                  </h1>
                  <p>
                    Give your home an affordable makeover just in time for fall
                    with recently lowered prices on everything you need to stay
                    cozy and comfy all season long!
                  </p>
                </div>
              </MDBCol>

              <MDBCol className="pe-2">
                <img
                  className="ban-img"
                  src="https://www.ikea.com/ext/ingkadam/m/508e2534bd9d2db9/original/PH170507-crop003.jpg?f=s"
                  alt=""
                />
              </MDBCol>
              <MDBCol>
                <img
                  className="ban-img"
                  src="https://www.ikea.com/ext/ingkadam/m/dcd97bad1ffff0b/original/PH163540-crop002.jpg?f=s"
                  alt=""
                />
              </MDBCol>
            </div>
          </div>

          <div className="butn">
            <button className="shotnow-btn" onClick={handlShopnow}>
              shop now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
