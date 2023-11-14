import React, { useContext, useEffect, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
// import { Productcontext } from "../../Context";
import { useNavigate } from "react-router-dom";
import AdmiNav from "./AdmiNav";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewUsers() {
  const navigate = useNavigate();
  // const { login } = useContext(Productcontext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const jwtToken = {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:7000/api/admin/users",
          jwtToken
        );
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(error.response.data.message);
      }
    }

    fetchUsers();
  }, []);

  const handleClick = (userId) => {
    navigate(`/More/${userId}`);
  };

  return (
    <>
      <AdmiNav />
      <MDBContainer>
        <MDBTable align="middle" className="mt-5">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Id</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user) => (
              <tr key={user._id} onClick={() => handleClick(user._id)}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.username}</p>
                      <p className="text-muted mb-0"></p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.email}</p>
                </td>
                <td>
                  <MDBBadge color="success" pill>
                    {user._id}
                  </MDBBadge>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </>
  );
}
