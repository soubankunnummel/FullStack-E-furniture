    import React, { useContext, useState } from 'react';
    import { Productcontext } from '../../Context';
    import { useNavigate, useParams } from 'react-router-dom';

    export default function EditProduct() {
        const { id } = useParams();
        const { products, setProducts } = useContext(Productcontext);
        const viewproduct = products.filter((item) => item._id === id);
        console.log(viewproduct)
        const [name, setName] = useState(viewproduct.title || ''); 
        const [type, setType] = useState(viewproduct.category || ''); 
        const [price, setPrice] = useState(viewproduct.price || ''); 
        const [description, setDescription] = useState(viewproduct.description || ''); 
        const [image, setImage] = useState(viewproduct.image || ''); 

        const navigate = useNavigate(); 

        const handleSubmit = async (e) => {
            e.preventDefault();
            //TODO:add edit funtion
            const title = e.target.title.value.trim()
            
            
            
            
            const updatedProduct = {
                id: parseInt(id), 
                name,
                type,
                price,
                description,
                image,
            };

            const updatedProducts = products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            ); 

            setProducts(updatedProducts);

            alert("Item edited successfully");
            
            navigate(`/ViewProduct/`);
        }

        return (
            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="text-center">Edit Product</h2>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <label htmlFor="Name">Name</label>
                                <input type="text" name="Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

                                <label htmlFor="Category">Category</label>
                                <input type="text" name="Category" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />

                                <label htmlFor="Price">Price</label>
                                <input type="text" name="Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />

                                <label htmlFor="Description">Description</label>
                                <input type="text" name="Description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />

                                <label htmlFor="Image">Image</label>
                                <input type="text" name="Image" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />

                                <button type="submit" className="btn btn-success mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
