interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}


export const seedData = {
    entries: [
        {
            description: 'pending test de daniel felipe',
            status: 'pending',
            createAt: Date.now() - 5000,
        },
        {
            description: 'in-progress test 1 de daniel felipe',
            status: 'in-progress',
            createAt: Date.now() - 10000,
        },
        {
            description: 'finished test 2 de daniel felipe',
            status: 'finished',
            createAt: Date.now() - 20000,
        },
    ],
}