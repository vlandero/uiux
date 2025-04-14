import React, { useContext } from 'react';
import styles from './index.module.css';
import { restaurants } from '../../data';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

export function OwnerDashboard() {
    const navigate = useNavigate();
    const { currentOwner } = useContext(AppContext);
    const ownerRestaurants = restaurants.filter(r => r.ownerId === currentOwner?.id);

    if (!currentOwner) {
        navigate('/')
    }

    return (
        <div className={styles.container}>
            <h2>My Restaurants</h2>
            <button>Add New Restaurant</button>
            <ul>
                {ownerRestaurants.map(r => (
                    <li key={r.id}>
                        <Link to={`/owner/restaurant/${r.id}`}>{r.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
