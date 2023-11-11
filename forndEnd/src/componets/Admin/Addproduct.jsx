import React, { useContext, useState } from "react";
import { Productcontext } from "../../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const { productss, setProductss } = useContext(Productcontext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Use state to store the selected image file

  const handleImageChange = (e) => {
    // Update the state with the selected image file
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !category || !price || !description || !image) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image); // Append the image file to FormData
  
    try {
      const jwtToken = localStorage.getItem('jwt');
      
  
      const response = await axios.post(
        "http://localhost:7000/api/admin/products",
        formData,
        {
          headers: {
            Authorization: jwtToken,
            'Content-Type': 'multipart/form-data', // Specify the content type for file uploads
          },
        }
      );
  
    //   console.log(response);
  
      
      if (response.status === 201) {
        // setProductss((prevProducts) => [...prevProducts, response.data]);
        alert("Product added successfully!");
        navigate("/ViewProduct");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
  

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-center">Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="type" className="form-label">
              Category
              </label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="btn btn-success mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}