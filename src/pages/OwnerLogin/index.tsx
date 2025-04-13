// src/pages/OwnerLogin.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { AppContext } from '../../contexts/AppContext';

export function OwnerLogin() {
    const { loginOwner } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = loginOwner(email);
        if (success) navigate('/dashboard');
        else alert('No account found for this email');
    };

    return (
        <div className={styles.container}>
            <h2>Owner Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
