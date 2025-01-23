import Dexie, { type Table } from 'dexie';

interface Challenge {
  day: number; // Use 'day' instead of 'id' to avoid confusion with Dexie's auto-increment
  selected: boolean;
}

const db = new Dexie('challenge') as Dexie & {
  challenge: Table<Challenge, number>; // Explicitly type the table
};

db.version(1).stores({
  challenge: 'day, selected' // 'day' is the primary key (no auto-increment here)
});

export type { Challenge };
export { db };