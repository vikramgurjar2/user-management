import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; 
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`); // Navigate to the EditUser page with user ID
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <p>{user.email}</p>
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button className='previous' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <button className='next' onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UsersList;
