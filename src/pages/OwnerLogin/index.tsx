import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { Page } from '../../components/Page';

export function OwnerLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <Page alignCenter={true}>
            <div className={styles.container}>
                <h2 className={styles.title}>Restaurant Owner Login</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="owner@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.primaryButton}>Login</button>
                    <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </button>
                </form>
            </div>
        </Page>
    );
}