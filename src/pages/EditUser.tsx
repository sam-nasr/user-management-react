import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usersApi } from '../api/users';

export const EditUser: React.FC = () => {
  // Extract the user ID from the URL (/users/:id/edit)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch the user data when the component mounts or ID changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      try {
        const response = await usersApi.getUserById(id);
        if (response.error) {
          setError(response.error);
        } else {
          // Pre-fill the form with the fetched user details
          setName(response.data.name);
          setEmail(response.data.email);
        }
      } catch (err: any) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    setError('');

    try {
      // Submit the changes using the API
      const response = await usersApi.updateUser(id, { name, email });
      if (response.error) {
        setError(response.error);
      } else {
        // Navigate back to the list on success
        navigate('/users');
      }
    } catch (err: any) {
      setError('Failed to update user.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container">Loading user data...</div>;
  }

  return (
    <div className="glass-panel animate-fade-in">
      <h2>Edit User</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            className="input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            className="input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/users')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
