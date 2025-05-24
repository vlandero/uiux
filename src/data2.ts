export interface OpeningHours {
    open: string;
    close: string;
}

export interface Table {
    id: string;
    capacity: number;
    isAvailable: boolean;
}

export interface Reservation {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    date: string;
    time: string;
    tableId: string;
    guests: number;
    specialRequests?: string;
    status: 'confirmed' | 'cancelled' | 'completed';
}

export interface Restaurant {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    images: string[];
    openingHours: {
        monday: OpeningHours;
        tuesday: OpeningHours;
        wednesday: OpeningHours;
        thursday: OpeningHours;
        friday: OpeningHours;
        saturday: OpeningHours;
        sunday: OpeningHours;
    };
    ratingCount?: number; // Add this new property
    tables: Table[];
    reservations: Reservation[];
    contact: {
        phone: string;
        email: string;
        address: string;
    };
}

export const sampleRestaurant: Restaurant = {
    id: '1',
    ownerId: 'owner1',
    name: 'Gourmet Haven',
    description: 'Upscale dining with a focus on seasonal ingredients and innovative cuisine.',
    category: 'Fine Dining',
    rating: 4.7,
    ratingCount: 948,
    images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
        'https://images.unsplash.com/photo-1582719471387-31d9c0f8f7eb'
    ],
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
        { id: '2', capacity: 4, isAvailable: true },
        { id: '3', capacity: 6, isAvailable: false },
        { id: '4', capacity: 2, isAvailable: true }
    ],
    reservations: [
        {
            id: '1',
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            customerPhone: '+1234567890',
            date: '2023-07-15',
            time: '19:00',
            tableId: '1',
            guests: 2,
            specialRequests: 'Window seat preferred',
            status: 'confirmed'
        },
        {
            id: '2',
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            customerPhone: '+1987654321',
            date: '2023-07-15',
            time: '20:00',
            tableId: '2',
            guests: 4,
            status: 'confirmed'
        }
    ],
    contact: {
        phone: '+1 (555) 123-4567',
        email: 'info@gourmethaven.com',
        address: '123 Culinary Street, Foodville'
    }
};

// Initialize restaurants array with sample data
export let restaurants: Restaurant[] = [sampleRestaurant];

// Local Storage Functions
const RESTAURANTS_KEY = 'restaurantsData';

export const saveRestaurantsToLocal = () => {
    localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurants));
};

export const loadRestaurantsFromLocal = (): Restaurant[] => {
    const data = localStorage.getItem(RESTAURANTS_KEY);
    return data ? JSON.parse(data) : [sampleRestaurant];
};

// Initialize with local storage data
restaurants = loadRestaurantsFromLocal();

// CRUD Operations
export const addRestaurant = (newRestaurant: Omit<Restaurant, 'id'>) => {
    const id = Date.now().toString();
    const restaurant = { ...newRestaurant, id };
    restaurants.push(restaurant);
    saveRestaurantsToLocal();
    return restaurant;
};

export const updateRestaurant = (id: string, updatedData: Partial<Restaurant>) => {
    const index = restaurants.findIndex(r => r.id === id);
    if (index !== -1) {
        restaurants[index] = { ...restaurants[index], ...updatedData };
        saveRestaurantsToLocal();
        return restaurants[index];
    }
    return null;
};

export const deleteRestaurant = (id: string) => {
    restaurants = restaurants.filter(r => r.id !== id);
    saveRestaurantsToLocal();
};

export const getRestaurantById = (id: string) => {
    return restaurants.find(r => r.id === id);
};

export const getRestaurantsByOwner = (ownerId: string) => {
    return restaurants.filter(r => r.ownerId === ownerId);
};

export const addReservation = (restaurantId: string, reservation: Omit<Reservation, 'id'>) => {
    const id = `res-${Date.now()}`;
    const newReservation = { ...reservation, id };

    // Update the restaurant's reservations
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    if (restaurantIndex !== -1) {
        restaurants[restaurantIndex].reservations.push(newReservation);
        saveRestaurantsToLocal();
    }

    return Promise.resolve(newReservation);
};

export const updateRestaurantRating = (restaurantId: string, newRating: number, newRatingCount: number) => {
    const restaurantIndex = restaurants.findIndex(r => r.id === restaurantId);
    if (restaurantIndex !== -1) {
        restaurants[restaurantIndex].rating = newRating;
        restaurants[restaurantIndex].ratingCount = newRatingCount;
        // Save to localStorage or your backend here
        saveRestaurantsToLocal(); // Implement this if using localStorage
    }
};