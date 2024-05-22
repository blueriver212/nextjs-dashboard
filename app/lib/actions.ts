'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SimulationForm } from './definitions';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const SimulationSchema = z.object({
  id: z.string(),
  simulation_name: z.string().nullable(),
  owner: z.string(),
  description: z.string().nullable(),
  date: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateSimulation = SimulationSchema.omit({ id: true, date: true });

 
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

export async function createSimulation(formData: FormData) {
  const { simulation_name, owner, description } = SimulationSchema.parse({
    simulation_name: formData.get('simulation_name'),
    owner: formData.get('owner'),
    description: formData.get('description')
    // scenario_properties: formData.get('scenario_properties'),
    // species: formData.get('species'),
  });
  
  const date = new Date().toISOString().split('T')[0];
  
  try {
    await sql`
      INSERT INTO simulations (simulation_name, owner, description, created)
      VALUES (${simulation_name}, ${owner}, ${description}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Simulation.',
    };
  }
  
  revalidatePath('/dashboard/simulations');
  redirect('/dashboard/simulations');
}

  // export async function updateSimulation(id: string, formData: FormData) {
  //   const  { simulation_name, owner, description, scenario_properties, species} = UpdateSimulation.parse({
  //     simulation_name: formData.get('simulation_name'),
  //     owner: formData.get('owner'),
  //     description: formData.get('description'),
  //     scenario_properties: formData.get('scenario_properties'),
  //     species: formData.get('species'),
  //   });

  //   const date = new Date().toISOString().split('T')[0];
  //     try {
  //       await sql`
  //           UPDATE invoices
  //           SET simulation_name = ${simulation_name}, owner = ${owner}, description = ${description}
  //           WHERE id = ${id}
  //         `;
  //     } catch (error) {
  //       return { message: 'Database Error: Failed to Update Invoice.' };
  //     }

  //     revalidatePath('/dashboard/simulations');
  //     redirect('/dashboard/simulations');
  // }

  export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
      await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }



  export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
  }

  export async function deleteSimulation(id: string) {
    try {
      await sql`DELETE FROM simulations WHERE id = ${id}`;
      revalidatePath('/dashboard/simulations');
      return { message: 'Deleted Simulation.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Simulation.' };
    }
  }