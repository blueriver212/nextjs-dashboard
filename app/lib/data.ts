import { sql } from '@vercel/postgres';
import {
  SimulationForm,
} from './definitions';

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//     const numberOfCustomers = Number(data[1].rows[0].count ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

export async function fetchSimulations() {
  try {
    const data = await sql`SELECT * FROM simulations`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch simulations.');
  }
}


const ITEMS_PER_PAGE = 8;

export async function fetchFilteredSimulations(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const simulations = await sql<SimulationForm>`
      SELECT
        id,
        simulation_name,
        owner,
        description,
        created,
        status
      FROM simulations
      WHERE
        simulation_name ILIKE ${`%${query}%`} OR
        owner ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        created::text ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return simulations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch simulations.');
  }
}

export async function fetchSimulationNames() {
  try {
    const data = await sql`SELECT id, simulation_name FROM simulations`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch simulation names.');
  }
}

export async function fetchSimulationPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM simulations
      WHERE
        simulation_name ILIKE ${`%${query}%`} OR
        owner ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        created::text ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of simulations.');
  }
}

export async function fetchSimulationById(id: string) {
  try {
    const data = await sql<SimulationForm>`SELECT * FROM simulations WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch simulation.');
  }
}