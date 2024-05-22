'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
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


// THESE ALL NEED EDITING!!!
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
    <Dialog>
      <DialogTrigger>
        <TrashIcon className="w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this simulation? This action cannot be undone.
          </DialogDescription>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Button style={{ backgroundColor: 'grey' }} onClick={() => setModalIsOpen(false)}>No</Button> */}
            <Button style={{ backgroundColor: 'red', alignItems: 'right' }} onClick={handleDelete}>Yes</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}