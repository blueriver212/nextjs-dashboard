import Form from '@/app/ui/simulations/edit-form';
import Breadcrumbs from '@/app/ui/simulations/breadcrumbs';
import { fetchSimulationById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import EditSimulationForm from '@/app/ui/simulations/edit-form';

// Here you can also import the templates if needed. 
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [simulation] = await Promise.all([
        fetchSimulationById(id)
      ]);

    if (!simulation) {
    notFound();
    }

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
      <EditSimulationForm simulation={simulation}/>
    </main>
  );
}