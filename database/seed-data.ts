interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData = {
    entries: [
        {
            description: 'pending test de daniel felipe',
            status: 'pending',
            createdAt: Date.now() - 5000,
        },
        {
            description: 'in-progress test 1 de daniel felipe',
            status: 'in-progress',
            createdAt: Date.now() - 10000,
        },
        {
            description: 'finished test 2 de daniel felipe',
            status: 'finished',
            createdAt: Date.now() - 20000,
        },
    ],
}