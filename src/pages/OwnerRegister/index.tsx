// src/pages/OwnerRegister.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../OwnerLogin/index.module.css';
import { AppContext } from '../../contexts/AppContext';

export function OwnerRegister() {
  const { registerOwner } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerOwner(name, email);
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <h2>Create Owner Account</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')} className={styles.secondaryButton}>
        Already have an account?
      </button>
    </div>
  );
}
