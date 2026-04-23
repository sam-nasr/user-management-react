import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../api/users';

export const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number | ''>('');
  
  const [subPlan, setSubPlan] = useState('Basic');
  const [subExpiresAt, setSubExpiresAt] = useState('');
  const [subActive, setSubActive] = useState(false);
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError('');

    try {
      // Create user using the API
      const subscription = { plan: subPlan, expiresAt: subExpiresAt ? new Date(subExpiresAt).toISOString() : '', active: subActive };
      
      // We pass the password here as well because it's a new user creation
      const response = await usersApi.createUser({ 
        name, 
        email, 
        age: Number(age), 
        subscription,
        // using type assertion to ignore that password is not on Partial<User>
        // alternatively we can update the User type or use any. 
        // We'll pass it inline as an untyped addition for now or use `any` to avoid TS errors
        ...( { password } as any )
      });
      
      if (response.error) {
        setError(response.error);
      } else {
        // Navigate back to the list on success
        navigate('/users');
      }
    } catch (err: any) {
      setError('Failed to create user.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in">
      <h2>Create User</h2>
      
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

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', textAlign: 'left', fontSize: '1.1rem' }}>Subscription</h3>
        
        <div className="input-group">
          <label htmlFor="plan">Plan</label>
          <input 
            type="text" 
            id="plan" 
            className="input" 
            value={subPlan} 
            onChange={(e) => setSubPlan(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label htmlFor="expiresAt">Expires At</label>
          <input 
            type="datetime-local" 
            id="expiresAt" 
            className="input" 
            value={subExpiresAt} 
            onChange={(e) => setSubExpiresAt(e.target.value)} 
          />
        </div>

        <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input 
            type="checkbox" 
            id="active" 
            checked={subActive} 
            onChange={(e) => setSubActive(e.target.checked)} 
            style={{ width: 'auto' }}
          />
          <label htmlFor="active" style={{ marginBottom: 0 }}>Active</label>
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
            {saving ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};
