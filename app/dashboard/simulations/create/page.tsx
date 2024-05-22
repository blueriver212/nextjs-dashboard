import Form from '@/app/ui/simulations/create-form';
import Breadcrumbs from '@/app/ui/simulations/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const simulations = await fetchCustomers();
 
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
      {/* Customers refers to previously when all customers would be passed
      I think a goo dbit functionalit for this would be to ensure that you can't name
      2 simulations the same */}
      <Form customers={simulations} />
    </main>
  );
}