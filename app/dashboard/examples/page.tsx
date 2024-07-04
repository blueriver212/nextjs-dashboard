import Pagination from '@/app/ui/simulations/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/simulations/table';
import { CreateSimulation } from '@/app/ui/simulations/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchSimulationPages } from '@/app/lib/data';

 
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = parseInt(searchParams?.page || '1', 10);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Example Simulations</h1>
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} examplePage={true} />
      </Suspense>
    </div>
  );
}