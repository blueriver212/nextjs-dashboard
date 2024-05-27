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

export async function createSimulation(formData: SimulationForm) {
    // Status is not started by default
    const status = 'not started'
    try {
      await sql`
        INSERT INTO simulations (id, simulation_name, owner, description, 
          scenario_properties, species, created, modified, status
        )
        VALUES (${formData.id}, ${formData.simulation_name}, ${formData.owner}, ${formData.description},
          ${JSON.stringify(formData.scenario_properties)}, ${JSON.stringify(formData.species)}, 
          ${formData.created}, ${formData.modified}, ${status})
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

  // export async function updateInvoice(id: string, formData: FormData) {
  //   const { customerId, amount, status } = UpdateInvoice.parse({
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  //   });
   
  //   const amountInCents = amount * 100;
   
  //   try {
  //     await sql`
  //         UPDATE invoices
  //         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  //         WHERE id = ${id}
  //       `;
  //   } catch (error) {
  //     return { message: 'Database Error: Failed to Update Invoice.' };
  //   }
   
  //   revalidatePath('/dashboard/invoices');
  //   redirect('/dashboard/invoices');
  // }

  export async function deleteSimulation(id: string) {
    try {
      await sql`DELETE FROM simulations WHERE id = ${id}`;
      revalidatePath('/dashboard/simulations');
      return { message: 'Deleted Simulation.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Simulation.' };
    }
  }