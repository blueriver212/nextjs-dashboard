'use client';

import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSimulation } from '@/app/lib/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

export function LoadCesium() {
  return (
    <Link href="http://localhost:8080/" passHref>
      <Button
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">View in 3D</span>{' '}
        <GlobeEuropeAfricaIcon className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}
