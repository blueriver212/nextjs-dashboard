import Form from '@/app/ui/simulations/create-form';
import Breadcrumbs from '@/app/ui/simulations/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const simulations = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/simulations' },
          {
            label: 'Create Invoice',
            href: '/dashboard/simulations/create',
            active: true,
          },
        ]}
      />
      <Form customers={simulations} />
    </main>
  );
}