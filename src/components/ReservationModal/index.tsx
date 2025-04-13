import React from 'react';
import styles from './index.module.css';

interface Props {
    onClose: () => void;
}

export function ReservationModal({ onClose }: Props) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Make a Reservation</h3>
                <form>
                    <input placeholder="First Name" />
                    <input placeholder="Last Name" />
                    <input placeholder="Phone Number" />
                    <button type="submit">Reserve</button>
                </form>
                <button onClick={onClose} className={styles.close}>X</button>
            </div>
        </div>
    );
}
