import React, { useContext, useEffect, useState } from 'react';
import { MDBBadge, MDBContainer } from 'mdb-react-ui-kit';
import { Productcontext } from '../../Context';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Axios } from '../../App';

export default function ViewMoreDetail() {
  const { id } = useParams();

  // const { users } = useContext(Productcontext);
 const [users, setUsers] = useState(null)
 console.log(users)
 const [loading, setLoading] = useState(true)
  // Find the user by id
  // const user = users.filter((user) => user._id === id);
  // console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        

        const response = await Axios.get(`/api/admin/user/${id}`);
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch user.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  if (!users) {
    return <h1 style={{ textAlign: 'center', marginTop: 70 }}>User not found</h1>;
  }


  return (
    <MDBContainer className='mt-5'>
      <div className='d-flex align-items-center'>
        <img
          src='https://mdbootstrap.com/img/new/avatars/8.jpg'
          alt=''
          style={{ width: '45px', height: '45px' }}
          className='rounded-circle me-3'
        />
        <div>
          <h2 className='fw-bold mb-2'>{users.username}</h2>
          <p className='fw-normal mb-1'>{users.email}</p>
        </div>
      </div>

      <hr className='my-4' />

      <div>
        <h3 className='fw-bold'>User Details</h3>
        <ul className='list-unstyled'>
          <li>
            <strong>Phone:</strong> {users.phone}
          </li>
          <li>
            <strong>Gender:</strong> {users.gender}
          </li>
          <li>
            <strong>Address:</strong>{' '}
            {/* {`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}, ${user.address.country}`} */}
          </li>
          <li>
            <strong>Date of Birth:</strong> {users.dateOfBirth}
          </li>
          <li>
            <strong>ID:</strong> <MDBBadge color='success' pill>{id}</MDBBadge>
          </li>
        </ul>
      </div>

      <hr className='my-4' />

      {/* <div>
        <h3 className='fw-bold'>Order Details</h3>
       
        {user.orders.map((order, index) => (
          <ul key={index} className='list-unstyled'>
            <li>
              <strong>Name:</strong> {order.name}
            </li>
            <li>
              <strong>Description:</strong> {order.description}
            </li>
            <li>
              <strong>Price:</strong> ${order.price.toFixed(2)}
            </li>
            <li>
              <strong>Type:</strong> {order.type}
            </li>
            <li>
              <strong>Quantity:</strong> {order.quantity}
            </li>
            <li>
              <strong>Image:</strong> <img src={order.image} alt={order.name} style={{ width: '100px' }} />
            </li>
          </ul>
        ))}
      </div> */}
    </MDBContainer>
  );
}
