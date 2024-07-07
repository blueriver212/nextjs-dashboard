'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SimulationForm } from './definitions';
 
const SimulationSchema = z.object({
  id: z.string(),
  simulation_name: z.string().nullable(),
  owner: z.string(),
  description: z.string().nullable(),
  date: z.string()
});

const UpdateSimulation = SimulationSchema.omit({ id: true, date: true });

export async function updateSimulation( formData: SimulationForm) {
  const { simulation_name, owner, description } = UpdateSimulation.parse({
    simulation_name: formData.simulation_name,
    owner: formData.owner,
    description: formData.description
  });
 
  try {
    await sql`
        UPDATE simulations
        SET simulation_name = ${simulation_name}, owner = ${owner}, description = ${description}
        WHERE id = ${formData.id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Simulation.' };
  }
 
  revalidatePath('/dashboard/simulations');
  redirect('/dashboard/simulations');
}

function processFormData(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(processFormData);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, processFormData(value)])
    );
  }
  return obj;
}

export async function createSimulation(formData: SimulationForm) {
  // Status is not started by default
  const status = 'not started';

  // Process form data to ensure correct boolean handling
  const processedFormData = processFormData(formData);

  try {
    await sql`
      INSERT INTO simulations (id, simulation_name, owner, description, 
        scenario_properties, species, created, modified, status
      )
      VALUES (${processedFormData.id}, ${processedFormData.simulation_name}, ${processedFormData.owner}, ${processedFormData.description},
        ${JSON.stringify(processedFormData.scenario_properties)}, ${JSON.stringify(processedFormData.species)}, 
        ${processedFormData.created}, ${processedFormData.modified}, ${status})
    `;
  } catch (error) {
    console.error('Database Error: Failed to Create Simulation.', error);
    return {
      message: 'Database Error: Failed to Create Simulation.',
    };
  } finally {
    revalidatePath('/dashboard/simulations');
    redirect('/dashboard/simulations');
  }
}


export async function deleteSimulation(id: string, name: string) {
  
  if (name === 'Example Simulation') {
    return { message: 'Failed to Delete Simulation.' };
  }
  
  
  try {
    // Start a transactio

    await sql`
    DELETE FROM results WHERE simulation_id = ${id}
    `;

    // Delete the simulation
    const deleteSimulationResult = await sql`
      DELETE FROM simulations WHERE id = ${id}
    `;
    
    // Revalidate and redirect only if the deletion was successful
    revalidatePath('/dashboard/simulations');
    redirect('/dashboard/simulations');
  } catch (error) {
    console.error('Error deleting simulation:', error);
    return { message: 'Database Error: Failed to Delete Simulation.' };
  }
}