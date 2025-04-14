import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { restaurants, Restaurant } from '../../data';
import styles from './index.module.css';

export function OwnerRestaurant() {
    const { id } = useParams();
    const restaurant = restaurants.find(r => r.id === id);

    const [form, setForm] = useState<Restaurant | undefined>(restaurant);

    if (!form) return <div className={styles.container}>Restaurant not found</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value } as Restaurant);
    };

    const handleSave = () => {
        console.log('Save restaurant', form);
        alert('Changes saved (locally only)');
    };

    return (
        <div className={styles.container}>
            <h2>Edit Restaurant: {form.name}</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
            <input name="workingHours" value={form.workingHours} onChange={handleChange} placeholder="Working Hours" />
            <input
                name="availableSpots"
                type="number"
                value={form.availableSpots}
                onChange={handleChange}
                placeholder="Available Spots"
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}
