import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usersApi } from '../api/users';
import type { User } from '../types';

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await usersApi.getUsers(page, limit);
      if (response.error) {
        setError(response.error);
      } else {
        setUsers(response.data);
      }
    } catch (err: any) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch users whenever the page changes
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await usersApi.deleteUser(id);
      if (response.error) {
        alert(response.error);
      } else {
        // Refresh the list after deletion to show current data
        fetchUsers();
      }
    } catch (err: any) {
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ marginBottom: 0 }}>Users Management</h1>
        <Link to="/users/new" className="btn btn-primary" style={{ width: 'auto' }}>
          Create User
        </Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                    <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td className="actions">
                        <Link to={`/users/${user.id}/edit`} className="btn btn-secondary">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(user.id)} 
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-secondary" 
              style={{ width: 'auto' }}
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
            >
              Previous Page
            </button>
            <span style={{ display: 'flex', alignItems: 'center' }}>Page {page}</span>
            {/* Disable next if we received fewer users than the limit (implies last page) */}
            <button 
              className="btn btn-secondary" 
              style={{ width: 'auto' }}
              disabled={users.length < limit} 
              onClick={() => setPage(p => p + 1)}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};
