import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../OwnerRestaurant/index.module.css';
import { Page } from '../../components/Page';
import { addRestaurant, Restaurant, restaurants, updateRestaurant } from '../../data2';

const emptyRestaurant: Omit<Restaurant, 'id'> = {
    name: '',
    description: '',
    category: '',
    rating: 0,
    images: [],
    openingHours: {
        monday: { open: '11:00', close: '22:00' },
        tuesday: { open: '11:00', close: '22:00' },
        wednesday: { open: '11:00', close: '22:00' },
        thursday: { open: '11:00', close: '23:00' },
        friday: { open: '11:00', close: '00:00' },
        saturday: { open: '10:00', close: '00:00' },
        sunday: { open: '10:00', close: '21:00' }
    },
    tables: [
        { id: '1', capacity: 2, isAvailable: true },
        { id: '2', capacity: 4, isAvailable: true }
    ],
    reservations: [],
    contact: {
        phone: '',
        email: '',
        address: ''
    },
    ownerId: ''
};

export function AddRestaurant() {
    const [activeTab, setActiveTab] = useState<'details' | 'reservations'>('details');
    const [restaurant, setRestaurant] = useState<Omit<Restaurant, 'id'>>(emptyRestaurant);
    const [newImage, setNewImage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleTimeChange = (day: string, field: 'open' | 'close', value: string) => {
        setRestaurant({
            ...restaurant,
            openingHours: {
                ...restaurant.openingHours,
                [day]: { ...restaurant.openingHours[day as keyof typeof restaurant.openingHours], [field]: value }
            }
        });
    };

    const handleAddImage = () => {
        if (newImage && !restaurant.images.includes(newImage)) {
            setRestaurant(prev => ({
                ...prev,
                images: [...prev.images, newImage]
            }));
            setNewImage('');
        }
    };

    const handleRemoveImage = (img: string) => {
        setRestaurant({
            ...restaurant,
            images: restaurant.images.filter(i => i !== img)
        });
    };

    type SaveStatus = 'idle' | 'saving' | 'success';
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

    const handleSave = async () => {
        if (!restaurant) return;

        setSaveStatus('saving');
        try {
            const newRestaurant = addRestaurant(restaurant);
            setSaveStatus('success');

            setTimeout(() => {
                setSaveStatus('idle');
                navigate(`/restaurant/${newRestaurant.id}`);
            }, 2000);
        } catch (error) {
            console.error('Failed to save:', error);
            setSaveStatus('idle');
            alert('Failed to save changes');
        }
    };

    if (!restaurant) return <Page>Restaurant not found</Page>;

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Manage {restaurant.name}</h1>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
                            onClick={() => setActiveTab('details')}
                        >
                            Restaurant Details
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'reservations' ? styles.active : ''}`}
                            onClick={() => setActiveTab('reservations')}
                        >
                            Reservations & Hours
                        </button>
                    </div>
                </div>

                {activeTab === 'details' ? (
                    <div className={styles.detailsTab}>
                        <div className={styles.formGroup}>
                            <label>Restaurant Name</label>
                            <input
                                type="text"
                                name="name"
                                value={restaurant.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={restaurant.description}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={restaurant.category}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Images</label>
                            <div className={styles.imageGallery}>
                                {restaurant.images.map((img, index) => (
                                    <div key={index} className={styles.imageItem}>
                                        <img src={img} alt={`Restaurant ${index + 1}`} />
                                        <button
                                            onClick={() => handleRemoveImage(img)}
                                            className={styles.removeImageButton}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.addImage}>
                                <input
                                    type="text"
                                    value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                    placeholder="Paste image URL"
                                />
                                <button onClick={handleAddImage}>Add Image</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.reservationsTab}>
                        <div className={styles.section}>
                            <h2>Opening Hours</h2>
                            <div className={styles.hoursGrid}>
                                {Object.entries(restaurant.openingHours).map(([day, times]) => (
                                    <div key={day} className={styles.hourItem}>
                                        <span className={styles.day}>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                                        <div className={styles.timeInputs}>
                                            <input
                                                type="time"
                                                value={times.open}
                                                onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                                            />
                                            <span>to</span>
                                            <input
                                                type="time"
                                                value={times.close}
                                                onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2>Table Management</h2>
                            <div className={styles.tablesGrid}>
                                {restaurant.tables.map(table => (
                                    <div key={table.id} className={styles.tableCard}>
                                        <div className={styles.tableHeader}>
                                            <input
                                                type="text"
                                                value={`Table ${table.id}`}
                                                onChange={(e) => {
                                                    const newId = e.target.value.replace('Table ', '');
                                                    const updatedTables = restaurant.tables.map(t =>
                                                        t.id === table.id ? { ...t, id: newId } : t
                                                    );
                                                    setRestaurant({ ...restaurant, tables: updatedTables });
                                                }}
                                                className={styles.tableIdInput}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const updatedTables = restaurant.tables.filter(t => t.id !== table.id);
                                                    setRestaurant({ ...restaurant, tables: updatedTables });
                                                }}
                                                className={styles.deleteTableButton}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className={styles.capacityControl}>
                                            <button
                                                onClick={() => {
                                                    const updatedTables = restaurant.tables.map(t =>
                                                        t.id === table.id ? { ...t, capacity: Math.max(1, t.capacity - 1) } : t
                                                    );
                                                    setRestaurant({ ...restaurant, tables: updatedTables });
                                                }}
                                                className={styles.capacityButton}
                                            >
                                                -
                                            </button>
                                            <span>Capacity: {table.capacity}</span>
                                            <button
                                                onClick={() => {
                                                    const updatedTables = restaurant.tables.map(t =>
                                                        t.id === table.id ? { ...t, capacity: t.capacity + 1 } : t
                                                    );
                                                    setRestaurant({ ...restaurant, tables: updatedTables });
                                                }}
                                                className={styles.capacityButton}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <label className={styles.toggle}>
                                            <input
                                                type="checkbox"
                                                checked={table.isAvailable}
                                                onChange={() => {
                                                    const updatedTables = restaurant.tables.map(t =>
                                                        t.id === table.id ? { ...t, isAvailable: !t.isAvailable } : t
                                                    );
                                                    setRestaurant({ ...restaurant, tables: updatedTables });
                                                }}
                                            />
                                            <span className={styles.toggleSlider}></span>
                                            {table.isAvailable ? 'Available' : 'Unavailable'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    const newTableId = `table-${Date.now()}`;
                                    setRestaurant({
                                        ...restaurant,
                                        tables: [
                                            ...restaurant.tables,
                                            { id: newTableId, capacity: 2, isAvailable: true }
                                        ]
                                    });
                                }}
                                className={styles.addTableButton}
                            >
                                + Add New Table
                            </button>
                        </div>

                        <div className={styles.section}>
                            <h2>Recent Reservations</h2>
                            <div className={styles.reservationsList}>
                                {restaurant.reservations.map(res => (
                                    <div key={res.id} className={styles.reservationCard}>
                                        <div>
                                            <strong>{res.customerName}</strong>
                                            <div>{res.date} at {res.time}</div>
                                            <div>Table {res.tableId} • {res.guests} guests</div>
                                        </div>
                                        <button className={styles.viewButton}>View Details</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    <button
                        onClick={handleSave}
                        className={`${styles.saveButton} ${saveStatus === 'success' ? styles.saved : ''}`}
                        disabled={saveStatus === 'saving'}
                    >
                        {saveStatus === 'saving' ? (
                            <span className={styles.spinner}></span>
                        ) : saveStatus === 'success' ? (
                            <span className={styles.checkmark}>✓</span>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>
        </Page>
    );
}