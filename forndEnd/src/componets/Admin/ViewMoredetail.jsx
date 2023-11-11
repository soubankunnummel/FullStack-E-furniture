import React, { useContext } from 'react';
import { MDBBadge, MDBContainer } from 'mdb-react-ui-kit';
import { Productcontext } from '../../Context';
import { useParams } from 'react-router-dom';

export default function ViewMoreDetail() {
  const { id } = useParams();

  const { users } = useContext(Productcontext);
 
  // Find the user by id
  const user = users.filter((user) => user._id === id);
  console.log(user)

  if (!user) {
    return <h1 style={{ textAlign: "center", marginTop: "10" }}>User not found</h1>;
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
          <h2 className='fw-bold mb-2'>sd{user[0].username}</h2>
          <p className='fw-normal mb-1'>{user[0].email}</p>
        </div>
      </div>

      <hr className='my-4' />

      <div>
        <h3 className='fw-bold'>User Details</h3>
        <ul className='list-unstyled'>
          <li>
            <strong>Phone:</strong> {user[0].phone}
          </li>
          <li>
            <strong>Gender:</strong> {user[0].gender}
          </li>
          <li>
            <strong>Address:</strong>{' '}
            {/* {`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}, ${user.address.country}`} */}
          </li>
          <li>
            <strong>Date of Birth:</strong> {user[0].dateOfBirth}
          </li>
          <li>
            <strong>ID:</strong> <MDBBadge color='success' pill>{users[0]._id}</MDBBadge>
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
