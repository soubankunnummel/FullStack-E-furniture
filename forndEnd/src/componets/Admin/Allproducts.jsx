import React, { useContext, useEffect } from "react";
import { Productcontext } from "../../Context";
import AdmiNav from "./AdmiNav";

export default function Allproducts() {
  const { products } = useContext(Productcontext);


  

  return (
    <>
    <AdmiNav/>
    <div className="container mt-4"> 
    <h2 >All Products</h2>
    <table className="table mt-4"> 
      <thead>
        <tr>
          <th scope="col">#</th>
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
            <td>{product.name}</td>
            <td>{product.type}</td>
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
