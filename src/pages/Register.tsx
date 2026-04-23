import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.register({ name, email, password, age: Number(age) });
      
      if (response.error) {
        setError(response.error);
      } else {
        // We log the user in immediately after successful registration
        login(response.data.token, response.data.user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in">
      <h2>Create an Account</h2>
      <p>Join us today</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
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

        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input 
            type="number" 
            id="age" 
            className="input" 
            value={age} 
            onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))} 
            required 
            min="1"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Sign in</Link>
      </p>
    </div>
  );
};
