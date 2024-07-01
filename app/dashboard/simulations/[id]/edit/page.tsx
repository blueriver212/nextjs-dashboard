import Breadcrumbs from '@/app/ui/simulations/breadcrumbs';
import { fetchSimulationById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Form from '@/app/ui/simulations/create-form';
import { fetchSimulationNames } from '@/app/lib/data';
import EditSimulationForm from '@/app/ui/simulations/edit-form';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [simulation] = await Promise.all([
        fetchSimulationById(id)
      ]);

    if (!simulation) {
    notFound();
    }

    const simulation_names = await fetchSimulationNames();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Simulations', href: '/dashboard/simulations' },
          {
            label: 'Edit Simulation',
            href: `/dashboard/simualtions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditSimulationForm 
        simulation={simulation} sim_names={[]} edit={true} /> 
    </main>
  );
}