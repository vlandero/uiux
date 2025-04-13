import React from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { restaurants } from '../../data';

export function ClientBrowse() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2>Browse Restaurants</h2>
            <div className={styles.grid}>
                {restaurants.map(r => (
                    <div key={r.id} className={styles.card} onClick={() => navigate(`/restaurant/${r.id}`)}>
                        <h3>{r.name}</h3>
                        <p>{r.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
