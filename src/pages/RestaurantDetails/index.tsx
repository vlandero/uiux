import React from 'react';
import styles from './index.module.css';
import { restaurants } from '../../data';

export function RestaurantDetail() {
    const restaurant = restaurants[0];

    return (
        <div className={styles.container}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <p>Working Hours: {restaurant.workingHours}</p>
            <p>Available Spots: {restaurant.availableSpots}</p>
        </div>
    );
}
