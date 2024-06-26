'use client';

import { PencilIcon, PlusIcon, 
  TrashIcon, ChartBarIcon, 
  PlayIcon, StopIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSimulation } from '@/app/lib/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export function CreateSimulation() {
  return (
    <Link
      href="/dashboard/simulations/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Simulation</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSimulation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/simulations/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSimulation({ id }: { id: string }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const deleteSimulationByID = deleteSimulation.bind(null, id);

  const handleDelete = () => {
    deleteSimulationByID();
    setModalIsOpen(false);
  };
 
  return (
    <Dialog open={modalIsOpen} onOpenChange={() => setModalIsOpen(true)}>
      <DialogTrigger className='rounded-md border p-2 hover:bg-gray-100'>
        <TrashIcon className="w-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this simulation? This action cannot be undone.
          </DialogDescription>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button style={{ backgroundColor: 'red', alignItems: 'right' }} onClick={handleDelete}>Yes</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function ReviewSimulation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/pyssem/${id}/results`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ChartBarIcon className="w-5 " />
    </Link>
  ); 
}

export function RunSimulation({ id }: { id: string }) {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>('Pending');
  const [result, setResult] = useState<string>('');

  const runModel = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        const statusUrl = data.task_id;
        console.log(statusUrl)

        if (statusUrl) {
          updateProgress(statusUrl);
        } else {
          alert('Failed to get status URL');
        }
      } else {
        alert('Failed to run model');
      }
    } catch (error: any) {
      alert(error.toString());
    } 
  };

  const updateProgress = async (statusUrl: string) => {
    try {
      const response = await fetch(statusUrl);
      if (response.ok) {
        const data = await response.json();
        const percent = (parseInt(data.current) * 100) / parseInt(data.total);
        setProgress(percent);
        setStatus(data.status);

        if (data.state !== 'PENDING' && data.state !== 'PROGRESS') {
          setResult(data.result || data.state);
        } else {
          setTimeout(() => updateProgress(statusUrl), 2000);
          console.log('Progress:', percent, 'Status:', data.status, 'Result:', data.result || data.state)
        }
      } else {
        alert('Failed to get progress');
      }
    } catch (error: any) {
      alert(error.toString());
    } finally
    {
      revalidatePath('/dashboard/simulations');
      redirect('/dashboard/simulations');
    }
  };

  return (
    <div>
      <button
        onClick={runModel}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PlayIcon className="w-5" fill="lightgreen" color="lightgreen" />
      </button>
      <div id="progress">
        <div className="progress">
          <div style={{ width: `${progress.toString()}%`, backgroundColor: '#44f' }}></div>
          <div>{progress}%</div>
          <div>{status}</div>
          <div>&nbsp;{result && `Result: ${result}`}</div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export function StopSimulation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/simulations/${id}/stop`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <StopIcon className="w-5" fill="red" color="red"/>
    </Link>
  );
}