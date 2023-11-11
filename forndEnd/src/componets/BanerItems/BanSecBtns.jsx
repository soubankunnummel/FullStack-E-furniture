import { MDBCol } from 'mdb-react-ui-kit'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BanSecBtns() {
  const navigator = useNavigate();

  
  return (
    <>
    <div
            className="d-flex align-items-start bg-light ms-5 "
            style={{ height: "10px" }}
          >
            <div>
              
            </div>
            <MDBCol>
              {" "}
              <span
                className="categorys"
                onClick={() => navigator("/Living")}
              >
                Living Room
              </span>
            </MDBCol>
            <MDBCol>
              {" "}
              <span
                className="categorys"
                onClick={() => navigator("/Dinig")}
              >
                Dining Room
              </span>
            </MDBCol>
            <MDBCol>
              {" "}
              <span className="categorys" onClick={() => navigator("/Bed")}>
                Bedroom
              </span>
            </MDBCol>
            <MDBCol>
              {" "}
              <span className="categorys" onClick={() => navigator("/kichen")}>kitchen</span>
            </MDBCol>
            <MDBCol>
              {" "}
              <span className="categorys" onClick={() => navigator("/work")}>Workspace</span>
            </MDBCol>
            <MDBCol>
              {" "}
              <span className="categorys" onClick={() => navigator("/Outdor")}>Outdoor</span>
            </MDBCol>
            <MDBCol>
              {" "}
              <span className="categorys" onClick={() => navigator("/Bath")}>Bathroom</span>
            </MDBCol>
          </div>
    </>
  )
}
 