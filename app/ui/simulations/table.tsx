import SimulationStatus from '@/app/ui/simulations/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredSimulations } from '@/app/lib/data';
import { DeleteSimulation, UpdateSimulation } from './buttons';


export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const simulations = await fetchFilteredSimulations(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {simulations?.map((simulation) => (
              <div
                key={simulation.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{simulation.simulation_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{simulation.owner}</p>
                  </div>
                  <SimulationStatus status={simulation.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(simulation.created)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSimulation id={simulation.id} />
                    <DeleteSimulation id={simulation.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Simulation Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Owner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Created
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {simulations?.map((simulation) => (
                <tr
                  key={simulation.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{simulation.simulation_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {simulation.owner}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(simulation.created)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {simulation.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <SimulationStatus status={simulation.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSimulation id={simulation.id} />
                      <DeleteSimulation id={simulation.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
