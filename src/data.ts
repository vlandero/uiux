export type Restaurant = {
    id: string;
    ownerId: number;
    name: string;
    description: string;
    address: string;
    workingHours: string;
    availableSpots: number;
};

export type Owner = {
    id: number;
    name: string;
    email: string;
}

export const restaurants: Restaurant[] = [
    {
        id: '1',
        ownerId: 1,
        name: 'Pizza Paradise',
        description: 'Best wood-fired pizza in town.',
        address: '123 Main St',
        workingHours: '10:00 - 22:00',
        availableSpots: 10,
    },
    {
        id: '2',
        ownerId: 1,
        name: 'Sushi World',
        description: 'Fresh and delicious sushi daily.',
        address: '456 Ocean Ave',
        workingHours: '12:00 - 23:00',
        availableSpots: 15,
    },
];

export const owners: Owner[] = [
    {
        id: 1,
        name: 'Mario Rossi',
        email: 'mario@example.com',
    },
];
