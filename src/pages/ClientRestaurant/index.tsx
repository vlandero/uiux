import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import styles from './index.module.css';
import { ReservationModal } from '../../components/ReservationModal';
import { restaurants, updateRestaurantRating } from '../../data2';

export function ClientRestaurant() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];

  const [userRating, setUserRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);

  const availableTables = restaurant.tables.filter(table => table.isAvailable);

  const handleRate = (rating: number) => {
    if (!hasRated) {
      const newRatingCount = (restaurant.ratingCount || 0) + 1;
      const newTotalRating = (restaurant.rating * (restaurant.ratingCount || 0)) + rating;
      const newAverage = newTotalRating / newRatingCount;

      setUserRating(rating);
      setHasRated(true);

      updateRestaurantRating(restaurant.id, newAverage, newRatingCount);
    }
  };

  return (
    <Page>
      <div className={styles.restaurantContainer}>
        <div className={styles.restaurantHeader}>
          <div className={styles.imageGallery}>
            {restaurant.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${restaurant.name} ${index + 1}`}
                className={styles.galleryImage}
              />
            ))}
          </div>

          <div className={styles.restaurantInfo}>
            <div className={styles.categoryBadge}>{restaurant.category}</div>
            <h1 className={styles.restaurantName}>{restaurant.name}</h1>
            <div className={styles.ratingSection}>
              <h3>Rate this Restaurant</h3>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.ratingStar} ${(userRating !== null ? star <= userRating : star <= Math.floor(restaurant.rating))
                        ? styles.filled
                        : ''
                      }`}
                    onClick={() => handleRate(star)}
                  >
                    ★
                  </span>
                ))}
                <span className={styles.ratingText}>
                  {hasRated ? (
                    'Thank you for your rating!'
                  ) : (
                    `${restaurant.rating.toFixed(1)} (${restaurant.ratingCount || 0} ratings)`
                  )}
                </span>
              </div>
            </div>
            <p className={styles.description}>{restaurant.description}</p>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.detailsColumn}>
            <h3>Opening Hours</h3>
            <ul className={styles.hoursList}>
              {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                <li key={day}>
                  <span className={styles.day}>{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                  <span>{hours.open} - {hours.close}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.detailsColumn}>
            <h3>Contact</h3>
            <p><strong>Phone:</strong> {restaurant.contact.phone}</p>
            <p><strong>Email:</strong> {restaurant.contact.email}</p>
            <p><strong>Address:</strong> {restaurant.contact.address}</p>
          </div>
        </div>

        <div className={styles.tablesSection}>
          <h2>Table Availability</h2>
          <div className={styles.tablesGrid}>
            {restaurant.tables.map(table => (
              <div
                key={table.id}
                className={`${styles.tableCard} ${!table.isAvailable ? styles.unavailable : ''} ${selectedTable === table.id ? styles.selected : ''}`}
                onClick={() => table.isAvailable && setSelectedTable(table.id)}
              >
                <div className={styles.tableNumber}>Table {table.id}</div>
                <div>Seats: {table.capacity}</div>
                <div className={styles.availability}>
                  {table.isAvailable ? 'Available' : 'Booked'}
                </div>
              </div>
            ))}
          </div>

          <button
            className={styles.reserveButton}
            onClick={() => setShowModal(true)}
            disabled={!selectedTable}
          >
            Reserve Table
          </button>
        </div>

        {showModal && (
          <ReservationModal
            restaurant={restaurant}
            tableId={selectedTable!}
            onClose={() => {
              setShowModal(false);
              setSelectedTable(null);
            }}
          />
        )}
      </div>
    </Page>
  );
}