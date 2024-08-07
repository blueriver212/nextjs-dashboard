import SimulationStatus from '@/app/ui/simulations/status';
import { fetchFilteredSimulations, fetchExampleSimulations } from '@/app/lib/data';
import { DeleteSimulation, UpdateSimulation, ReviewSimulation, RunSimulation, StopSimulation } from './buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function SimulationTable({
  query,
  currentPage,
  examplePage
}: {
  query: string;
  currentPage: number;
  examplePage?: boolean;
}) {

  let simulations;
  if (examplePage) {
    simulations = await fetchExampleSimulations(query);
  } else {
    simulations = await fetchFilteredSimulations(query, currentPage);
  }

  return (
    <div className="mt-6 flow-root w-full">
      <div className="inline-block w-full align-middle">
        <div className="overflow-hidden rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="block md:hidden">
            {simulations?.map((simulation) => (
              <div
                key={simulation.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{simulation.simulation_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{simulation.owner}</p>
                  </div>
                  <SimulationStatus status={simulation.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-3">
                    {/* {simulation.status === 'completed' && <ReviewSimulation id={simulation.id} />} */}
                    {simulation.status === 'not started' && <RunSimulation id={simulation.id} />}
                    {simulation.status === 'failed' && <RunSimulation id={simulation.id}/>}
                    {simulation.status === 'in progress' && <StopSimulation id={simulation.id} />}
                    <ReviewSimulation id={simulation.id} />
                    {!examplePage && <UpdateSimulation id={simulation.id} />}
                    {!examplePage && <DeleteSimulation id={simulation.id} name={simulation.simulation_name} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <Table className="w-full min-w-full text-gray-900">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-5 font-medium sm:pl-6">Simulation Name</TableHead>
                  <TableHead className="px-3 py-5 font-medium">Owner</TableHead>
                  <TableHead className="px-3 py-5 font-medium truncate">Description</TableHead>
                  <TableHead className="px-3 py-5 font-medium">Date Created</TableHead>
                  <TableHead className="px-3 py-5 font-medium">Status</TableHead>
                  <TableHead className="relative py-3 pl-6 pr-3">Actions</TableHead> 
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {simulations?.map((simulation) => (
                  <TableRow
                    key={simulation.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{simulation.simulation_name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {simulation.owner}
                    </TableCell>
                    <TableCell className="whitespace-normal px-3 py-3 break-words">
                      {simulation.description}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {simulation.created.toString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <SimulationStatus status={simulation.status} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {/* {simulation.status === 'completed' && <ReviewSimulation id={simulation.id} />} */}
                        {simulation.status === 'not started' && <RunSimulation id={simulation.id}/>}
                        {simulation.status === 'failed' && <RunSimulation id={simulation.id} />}
                        {simulation.status === 'in progress' && <StopSimulation id={simulation.id} />}
                        <ReviewSimulation id={simulation.id} />
                        {!examplePage && <UpdateSimulation id={simulation.id} />}
                        {!examplePage && <DeleteSimulation id={simulation.id} name={simulation.simulation_name} />}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
