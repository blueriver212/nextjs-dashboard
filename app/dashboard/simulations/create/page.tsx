import Form from '@/app/ui/simulations/create-form';
import Breadcrumbs from '@/app/ui/simulations/breadcrumbs';
import { fetchSimulationNames } from '@/app/lib/data';
 
export default async function Page() {
  const simulation_names = await fetchSimulationNames();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Simulations', href: '/dashboard/simulations' },
          {
            label: 'Create A New Simulation',
            href: '/dashboard/simulations/create',
            active: true,
          },
        ]}
      />
      <Form 
        sim_names={simulation_names.map(({ id, simulation_name }) => ({ id, simulation_name }))}
        edit={false} 
        simulation={null} />
    </main>
  );
}