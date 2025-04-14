import React, { useState } from 'react';
import { restaurants } from '../../data';
import { ReservationModal } from '../../components/ReservationModal';

export function ClientRestaurant() {
    const restaurant = restaurants[0];
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <button onClick={() => setShowModal(true)}>Make Reservation</button>
            {showModal && <ReservationModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
