import React, { useState } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/Page';
import { restaurants, deleteRestaurant } from '../../data2';

export function OwnerDashboard() {
    const navigate = useNavigate();
    const [localRestaurants, setLocalRestaurants] = useState(restaurants);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            deleteRestaurant(id);
            setLocalRestaurants(localRestaurants.filter(r => r.id !== id));
        }
    };

    return (
        <Page>
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>My Restaurants</h1>
                    <button
                        className={styles.addButton}
                        onClick={() => navigate('/owner/add-restaurant')}
                    >
                        + Add New Restaurant
                    </button>
                </div>

                <div className={styles.restaurantsGrid}>
                    {localRestaurants.map(restaurant => (
                        <div
                            key={restaurant.id}
                            className={styles.restaurantCard}
                            onClick={() => navigate(`/owner/restaurant/${restaurant.id}`)}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    src={restaurant.images[0] || '/placeholder-restaurant.jpg'}
                                    alt={restaurant.name}
                                    className={styles.restaurantImage}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-restaurant.jpg';
                                    }}
                                />
                                <button
                                    className={styles.deleteButton}
                                    onClick={(e) => handleDelete(restaurant.id, e)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className={styles.restaurantInfo}>
                                <h3 className={styles.restaurantName}>{restaurant.name}</h3>
                                <p className={styles.description}>{restaurant.description}</p>
                                <div className={styles.stats}>
                                    <span className={styles.reservations}>
                                        {restaurant.reservations.length} upcoming reservations
                                    </span>
                                    <span className={styles.rating}>
                                        ★ {restaurant.rating?.toFixed(1) || '0.0'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
}