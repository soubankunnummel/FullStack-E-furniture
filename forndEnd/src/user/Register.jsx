import React  from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { Productcontext } from "../Context";

export default function Register() {
  // const { login, setLogin } = useContext(Productcontext);
  const navigate = useNavigate();
  

  const register = async (e) => {
    e.preventDefault();
   
    const name = e.target.name.value.trim();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (name === "" || username === "" || email === "" || password === "") {
      alert("Please all input feils");
    }

    try {
      const payload = { name, username, email, password };
      const respons = await axios.post(
        "http://localhost:7000/api/users/register",payload);
        console.log(respons)
        if (respons.status === 201) {
          alert("Registratoin success full")
          navigate("/login");

        }
      

      console.log(respons);
    } catch (error) {
      console.log(error)
    }

   
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard
        className="mt-5"
        style={{ height: "500px", marginBottom: "8rem" }}
      >
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form action="" onSubmit={register}>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              id="form1"
              type="text"
              name="name" // Correct name attribute
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label=" User Name"
              size="lg"
              id="form1"
              type="text"
              name="username" // Correct name attribute
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              id="form2"
              type="email"
              name="email" // Correct name attribute
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              size="lg"
              id="form3"
              type="password"
              name="password" // Correct name attribute
              required
            />

            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
              />
            </div>

            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
              Register
            </MDBBtn>
          </form>
          Already have an account? <Link to="/login">Login here</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
