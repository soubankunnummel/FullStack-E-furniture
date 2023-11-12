import React, { useContext, useEffect } from "react";
import { Productcontext } from "../../Context";
import { useNavigate } from "react-router-dom";
import AdmiNav from "./AdmiNav"; 
import { Axios } from "../../App";
import toast from "react-hot-toast";

export default function ViewPoduct() {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(Productcontext);

  const handleRemove = async (productId) => {
   
    try {
        const response = await Axios.delete(`/api/admin/products/${productId}`);

        if (response.status === 200) {
       
           
          
            setProducts(response.data.data);

            toast.success('Product deleted successfully!');
        } 
    } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product.');
    }
};

const handlEdit = async (productId) => {
  navigate(`EditProduct${productId}`)
  
};


  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await Axios.get("/api/admin/products")
      
        if(response.status === 200){
          setProducts(response.data.data)

        }
        
      } catch (error) {
        
      } 
    }
    fetchProducts()
  },[])

  return (
    <>
    <AdmiNav/>
    <section>
      <div className="container">
        <div className="row mt-4">
          <div style={{ paddingLeft: "75%" }}>
            <button onClick={()=> navigate("/Addproducts")}  className="btn btn-primary">
              Add Products
            </button>
          </div> 
          
          
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            

            {products.map((items, intex) => (
              <tr key={items._id}>
                <th scope="row">{intex + 1} </th>
                <td>{items.title} </td>
                <td>{items.category} </td>
                <td>{items.description} </td>
                <td>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                    src={items.image}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary me-5 "
                    onClick={()=> handlEdit(items._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleRemove(items._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
           
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
}
