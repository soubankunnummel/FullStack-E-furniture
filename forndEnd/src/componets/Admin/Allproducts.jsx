import React, { useContext, useEffect, useState } from "react";
// import { Productcontext } from "../../Context";
import AdmiNav from "./AdmiNav";
import { Axios } from "../../App";
import toast from "react-hot-toast";

export default function Allproducts() {
  // const { products } = useContext(Productcontext);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/api/admin/products")
        if(response.status === 200) {
          setProducts(response.data.data)
        }

        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
      fetchProducts()
  },[])
  

  return (
    <>
    <AdmiNav/>
    <div className="container mt-4"> 
    <h2 >All Products</h2>
    <table className="table mt-4"> 
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
          <th scope="col">Description</th>
          <th scope="col">Image</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product._id}>
            <th scope="row">{product._id}</th>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>
              <img
                style={{ width: "50px", height: "50px" }}
                alt=""
                src={product.image}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
}
