    import React, { useContext, useEffect, useState } from 'react';
    import { Productcontext } from '../../Context';
    import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../../App';
import toast from 'react-hot-toast';

    export default function EditProduct() {
        const { id } = useParams();
        const { products, setProducts } = useContext(Productcontext);
        
          const [productData, setProductData] = useState({
            title: '',
            category: '',
            price: '',
            description: '',
            image: '',
          });

        const navigate = useNavigate(); 

        useEffect(() => {
            const fetchProductData = async () => {
              try {
                const response = await Axios.get(`/api/admin/products/${id}`);
                if (response.status === 200) {
                  // Set the product data when it's fetched
                  const { _id, title, description, price, image, category } = response.data.data;

                   setProductData({ id: _id, title, description, price, image, category });
                }
              } catch (error) {
                console.error('Error fetching product data:', error);
              }
            };
        
            fetchProductData();
          }, [id]);

          
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the productData state when any input field changes
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.put(`/api/admin/products/${id}`, productData);
      if (response.status === 200) {
        // Update the local state with the edited product
        const updatedProducts = products.map((product) =>
          product.id === parseInt(id) ? response.data.data : product
        );
        setProducts(updatedProducts);

        toast.success('Product edited successfully');
        navigate(`/ViewProduct`);
      }
    } catch (error) {
      console.error('Error editing product:', error);
      toast.error('Failed to edit product.');
    }
  };

        return (
            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="text-center">Edit Product</h2>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <label htmlFor="Name">Name</label>
                                <input type="text" name="title" className="form-control" value={productData.title} onChange={handleChange} />

                                <label htmlFor="Category">Category</label>
                                <input type="text" name="category" className="form-control" value={productData.category} onChange={handleChange} />

                                <label htmlFor="Price">Price</label>
                                <input type="text" name="price" className="form-control" value={productData.price} onChange={handleChange} />

                                <label htmlFor="Description">Description</label>
                                <input type="text" name="description" className="form-control" value={productData.description} onChange={handleChange} />

                                <label htmlFor="Image">Image</label>
                                <input type="text" name="image" className="form-control" value={productData.image} onChange={handleChange} />

                                <button type="submit" className="btn btn-success mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
