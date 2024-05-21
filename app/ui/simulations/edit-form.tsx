'use client';

import { SimulationForm } from '@/app/lib/definitions';
import { DocumentTextIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSimulation } from '@/app/lib/actions';
import { useState } from 'react';

export default function EditSimulationForm({
  simulation,
}: {
  simulation: SimulationForm;
}) {
  const updateSimulationWithId = updateSimulation.bind(null, simulation.id);

  return (
    <form action={updateSimulationWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Simulation Name */}
        <div className="mb-4">
          <label htmlFor="simulation_name" className="mb-2 block text-sm font-medium">
            Simulation Name
          </label>
          <div className="relative">
            <input
              id="simulation_name"
              name="simulation_name"
              type="text"
              defaultValue={simulation.simulation_name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Owner */}
        <div className="mb-4">
          <label htmlFor="owner" className="mb-2 block text-sm font-medium">
            Owner
          </label>
          <div className="relative">
            <input
              id="owner"
              name="owner"
              type="text"
              defaultValue={simulation.owner}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              defaultValue={simulation.description}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Scenario Properties
        <div className="mb-4">
          <label htmlFor="scenario_properties" className="mb-2 block text-sm font-medium">
            Scenario Properties
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium">
                Start Date
              </label>
              <input
                id="start_date"
                name="start_date"
                type="date"
                defaultValue={simulation.scenario_properties.start_date}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="simulation_duration" className="block text-sm font-medium">
                Simulation Duration
              </label>
              <input
                id="simulation_duration"
                name="simulation_duration"
                type="number"
                defaultValue={simulation.scenario_properties.simulation_duration}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="steps" className="block text-sm font-medium">
                Steps
              </label>
              <input
                id="steps"
                name="steps"
                type="number"
                defaultValue={simulation.scenario_properties.steps}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="min_altitude" className="block text-sm font-medium">
                Min Altitude
              </label>
              <input
                id="min_altitude"
                name="min_altitude"
                type="number"
                defaultValue={simulation.scenario_properties.min_altitude}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="max_altitude" className="block text-sm font-medium">
                Max Altitude
              </label>
              <input
                id="max_altitude"
                name="max_altitude"
                type="number"
                defaultValue={simulation.scenario_properties.max_altitude}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="n_shells" className="block text-sm font-medium">
                Number of Shells
              </label>
              <input
                id="n_shells"
                name="n_shells"
                type="number"
                defaultValue={simulation.scenario_properties.n_shells}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="launch_function" className="block text-sm font-medium">
                Launch Function
              </label>
              <input
                id="launch_function"
                name="launch_function"
                type="text"
                defaultValue={simulation.scenario_properties.launch_function}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="integrator" className="block text-sm font-medium">
                Integrator
              </label>
              <input
                id="integrator"
                name="integrator"
                type="text"
                defaultValue={simulation.scenario_properties.integrator}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="density_model" className="block text-sm font-medium">
                Density Model
              </label>
              <input
                id="density_model"
                name="density_model"
                type="text"
                defaultValue={simulation.scenario_properties.density_model}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="LC" className="block text-sm font-medium">
                LC
              </label>
              <input
                id="LC"
                name="LC"
                type="number"
                defaultValue={simulation.scenario_properties.LC}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="v_imp" className="block text-sm font-medium">
                Impact Velocity
              </label>
              <input
                id="v_imp"
                name="v_imp"
                type="number"
                defaultValue={simulation.scenario_properties.v_imp}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
 */}

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/simualtions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
