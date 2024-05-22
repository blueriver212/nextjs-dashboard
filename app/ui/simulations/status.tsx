import { CheckIcon, ClockIcon, StopIcon, ScaleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { CroissantIcon } from 'lucide-react';

export default function SimulationStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'in progress',
          'bg-green-500 text-white': status === 'completed',
          'bg-red-500 text-white': status === 'failed',
          'bg-gray-100 text-gray-499': status === 'not started'
        },
      )}
    >
      {status === 'not started' ? (
        <>
          Not Started
          <ScaleIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'in progress' ? (
        <>
          In Progress
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Complete
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'failed' ? (
        <>
          Failed
          <CroissantIcon className="ml-1 w-4 text-red bg-white-100" />
        </>
      ) : null}
    </span>
  );
}
