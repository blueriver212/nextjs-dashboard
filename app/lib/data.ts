import { sql } from '@vercel/postgres';
import {
  SimulationForm,
  PlotData
} from './definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
      WHERE (
        simulation_name ILIKE ${`%${query}%`} OR
        owner ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        created::text ILIKE ${`%${query}%`} )
      AND simulation_name NOT IN (
        'Baseline',
        'FCC and ITU Scenario'
      )
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return simulations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch simulations.');
  }
}

export async function fetchExampleSimulations(query: string): Promise<SimulationForm[]> {
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
      WHERE simulation_name IN (
        'Baseline',
        'FCC and ITU Scenario'
      )
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
      WHERE (
        simulation_name ILIKE ${`%${query}%`} OR
        owner ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        created::text ILIKE ${`%${query}%`} )
      AND simulation_name NOT IN (
        'Baseline',
        'FCC and ITU Scenario'
      )    
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

export async function fetchResultsById(id: string) {
  try {
    const data = await sql<PlotData>`SELECT * FROM results WHERE simulation_id = ${id}`;
    return data.rows[0];
    } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch results.');
  }
}