import React, { useContext, useEffect, useState } from 'react';
import { MDBBadge, MDBContainer } from 'mdb-react-ui-kit';
import { Productcontext } from '../../Context';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Axios } from '../../App';
import AdmiNav from './AdmiNav';

export default function ViewMoreDetail() {
  const { id } = useParams();

  // const { users } = useContext(Productcontext);
 const [users, setUsers] = useState([])
 const [userMore, setUserMore] = useState([])
 console.log(users)
 console.log(userMore)

 const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
          const response = await Axios.get(`/api/admin/${id}/order`)
          if(response.status === 200){
            setUserMore(response.data.data)
          }
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrder()
  },[])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios.get(`/api/admin/user/${id}`);
        if (response.status === 200) {
          setUsers(response.data.data.user);
          
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
    <>
    <AdmiNav/>
      
      {console.log(users.username)}
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

      <h3 className='fw-bold my-5 ' style={{textAlign:"center"}}>Order Details</h3>
      <div className='col  d-flex justify-content-evenly mb-5'>
    {userMore.map((data) => (
      console.log(data),
       
       <div className=''>

          <ul  className='list-unstyled'>
            <li>
              <strong>Name:</strong> {data.title}
            </li>
            <li>
              <strong>date:</strong> {data.date}
            </li>
            <li>
              <strong>Time:</strong> {data.time}
            </li>
            
            <li>
              <strong>PaymentID:</strong> {data.payment_id}
            </li>
            <li>
              <strong>Total:</strong> {data.total_amount}
            </li>
            <li>
              <strong>Image:</strong> <img style={{ width: '100px' }} />
            </li>
          </ul>
     
       </div>
      
      ))}
      </div>
    </MDBContainer>
     
        </>
  );
}
