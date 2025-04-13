import React from 'react';
import styles from './index.module.css';
import { restaurants } from '../../data';

export function OwnerDashboard() {
    return (
        <div className={styles.container}>
            <h2>My Restaurants</h2>
            <button>Add New Restaurant</button>
            <ul>
                {restaurants.map(r => (
                    <li key={r.id}>{r.name}</li>
                ))}
            </ul>
        </div>
    );
}
