'use client';
import { useState } from 'react'
import { CustomerField } from '@/app/lib/definitions';
import { Switch } from "@/components/ui/switch"
import Link from 'next/link';
import {
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  UserIcon,
  CodeBracketIcon,
  ListBulletIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  WifiIcon,
  CogIcon,
  CloudIcon,
  RocketLaunchIcon,
  ArrowsPointingInIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/app/ui/button';
import { Button as ShadButton } from '@/components/ui/button';

type Species = {
  name: string;
  cd: string;
  mass: string;
  radius: string;
  area: string;
  active: boolean;
  drag: boolean;
  pmd: string;
};

export default function Form({ customers }: { customers: CustomerField[] }) {
  // Create a hook that hides certain fields based on the toggle
  const [isVisible, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  }

  const [species, setSpecies] = useState<Species[]>([]);
  const [newSpecies, setNewSpecies] = useState({
    name: "Debris",
    cd: "2.2",
    mass: "1250",
    radius: "4",
    area: "0.5",
    active: false,
    drag: true,
    pmd: "0.9",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentSpecies, setCurrentSpecies] = useState(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpecies, setEditingSpecies] = useState<Species | null>(null);

  const handleEditSpecies = (e: React.FormEvent, species: Species, index: number) => {
    e.preventDefault();
    setIsEditing(true);
    setNewSpecies(species);
    setEditingIndex(index);
    setIsDialogOpen(true); 
  };

  const handleAddSpecies = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isEditing) {
      if (editingIndex !== null) {
        const newSpeciesList = [...species];
        newSpeciesList[editingIndex] = newSpecies;
        setSpecies(newSpeciesList);
        setEditingIndex(null);
      }
    } else {
      setSpecies([...species, newSpecies]);
    }
  
    setNewSpecies({
      ...newSpecies,
      name: "",
      cd: "",
      mass: "",
      radius: "",
      area: "",
      pmd: "",
    });
  
    setIsEditing(false);
  };


  const closeDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  

  const handleDeleteSpecies = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const newSpecies = [...species];
    newSpecies.splice(index, 1);
    setSpecies(newSpecies);
  };

  return (
  <div>
    <div className="flex justify-end items-center">
      <label className="text-sm font-medium">Advanced Options</label>
      <Switch className="ml-2" onCheckedChange={toggleVisibility}/>
    </div> 
    <form>     
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Simulation Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Simulation Name
          </label>
          <div className="relative">
            <input
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Name"
            >
              {/* <option value="" disabled>
                Select a customer
              </option> */}
              {/* {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))} */}
            </input>
            <CodeBracketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Simulation Owner */}
        <div className="mb-4">
          <label htmlFor="owner" className="mb-2 block text-sm font-medium">
            What's your name?
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="owner"
                name="owner"
                placeholder="Owner"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Model Description */}
        <div className="mb-4" hidden={isVisible}>
          <label htmlFor="modelDescription" className="mb-2 block text-sm font-medium">
            Model Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="modelDescription"
                name="modelDescription"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-3 block text-m font-medium">
              Overall Scenario Properties
          </label>
          <fieldset name="ScenarioProperties">
              <div className="relative mt-2 rounded-md">
                  <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
                      Start Date
                  </label>
                  <div className="relative">
                      <input
                          id="startDate"
                          name="startDate"
                          placeholder="Start Date"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="simulationDuration" className="mb-2 block text-sm font-medium">
                      Simulation Duration (days)
                  </label>
                  <div className="relative">
                      <input
                          id="simulationDuration"
                          name="simulationDuration"
                          type="number"
                          placeholder="Simulation Duration"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="steps" className="mb-2 block text-sm font-medium">
                      Time Steps
                  </label>
                  <div className="relative">
                      <input
                          id="steps"
                          name="steps"
                          type="number"
                          placeholder="100"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="maxAltitude" className="mb-2 block text-sm font-medium">
                      Maximum Altitude (km)
                  </label>
                  <div className="relative">
                      <input
                          id="maxAltitude"
                          name="maxAltitude"
                          type="number"
                          placeholder="2000"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ArrowUpIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="minAltitude" className="mb-2 block text-sm font-medium">
                      Minimum Altitude (km)
                  </label>
                  <div className="relative">
                      <input
                          id="minAltitude"
                          name="minAltitude"
                          type="number"
                          placeholder="500"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="nShells" className="mb-2 block text-sm font-medium">
                      Number of Shells
                  </label>
                  <div className="relative">
                      <input
                          id="nShells"
                          name="nShells"
                          type="number"
                          placeholder="10"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <WifiIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md" hidden={isVisible}>
                  <label htmlFor="integrator" className="mb-2 block text-sm font-medium">
                      Integrator Type
                  </label>
                  <div className="relative">
                      <input
                          id="integrator"
                          name="integrator"
                          type="text"
                          placeholder="BDF"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <CogIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md" hidden={isVisible}>
                  <label htmlFor="densityModel" className="mb-2 block text-sm font-medium">
                      Density Model
                  </label>
                  <div className="relative">
                      <input
                          id="densityModel"
                          name="densityModel"
                          type="text"
                          placeholder="JB2008_dens_func"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <CloudIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md" hidden={isVisible}>
                  <label htmlFor="launchCoefficient" className="mb-2 block text-sm font-medium">
                      Launch Coefficient
                  </label>
                  <div className="relative">
                      <input
                          id="launchCoefficient"
                          name="launchCoefficient"
                          type="number"
                          placeholder="0.1"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <RocketLaunchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md" hidden={isVisible}>
                  <label htmlFor="impactVelocity" className="mb-2 block text-sm font-medium">
                      Impact Velocity
                  </label>
                  <div className="relative">
                      <input
                          id="impactVelocity"
                          name="impactVelocity"
                          type="number"
                          placeholder="10"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ArrowsPointingInIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

          </fieldset>
        </div>
      </div>

      <div className="mt-6 justify-center flex gap-4">
        
      </div>

      <Table>
        <TableCaption>
          <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogTrigger>{isEditing ? 'Edit Species' : 'Add New Species'}</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Edit Species' : 'New Species'}</DialogTitle>
                  <DialogDescription>
                    {isEditing ? 'Edit an existing species in your simulation' : 'Add a new species to your simulation'}
                  </DialogDescription>
                </DialogHeader>
              <div className="grid gap-4 py-4">
                <form onSubmit={handleAddSpecies}>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="speciesName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="speciesName"
                      defaultValue="Debris"
                      className="col-span-2"
                      required={true}
                      value={newSpecies.name}
                      onChange={(e) => setNewSpecies({ ...newSpecies, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="cd" className="text-right">
                      Cd
                    </Label>
                    <Input
                      id="cd"
                      type='number'
                      className="col-span-1"
                      required={true}
                      value={newSpecies.cd}
                      onChange={(e) => setNewSpecies({ ...newSpecies, cd: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="mass" className="text-right">
                      Mass (kg)
                    </Label>
                    <Input
                      id="mass"
                      type='number'
                      className="col-span-1"
                      required={true}
                      value={newSpecies.mass}
                      onChange={(e) => setNewSpecies({ ...newSpecies, mass: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="radius" className="text-right">
                      Radius (m)
                    </Label>
                    <Input
                      id="radius"
                      type='number'
                      required={true}
                      className="col-span-1"
                      value={newSpecies.radius}
                      onChange={(e) => setNewSpecies({ ...newSpecies, radius: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="area" className="text-right">
                      Area (m)
                    </Label>
                    <Input
                      id="area"
                      type='number'
                      className="col-span-1"
                      value={newSpecies.area}
                      onChange={(e) => setNewSpecies({ ...newSpecies, area: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="active" className="text-right">
                      Active
                    </Label>
                    <Switch
                      id="active"
                      className="col-span-3"
                      checked={newSpecies.active}
                      onCheckedChange={() => setNewSpecies({ ...newSpecies, active: !newSpecies.active })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="drag" className="text-right">
                      Drag Effected?
                    </Label>
                    <Switch
                      defaultChecked={true}
                      id="drag"
                      className="col-span-1"
                      checked={newSpecies.drag}
                      onCheckedChange={() => setNewSpecies({ ...newSpecies, drag: !newSpecies.drag })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                    <Label htmlFor="pmd" className="text-right">
                      PMD (%)
                    </Label>
                    <Input
                      id="pmd"
                      type='number'
                      defaultValue="0.9"
                      required={true}
                      value={newSpecies.pmd}
                      onChange={(e) => setNewSpecies({ ...newSpecies, pmd: e.target.value })}
                    />
                  </div>
                  <div className="mt-6 flex justify-end gap-4 mt-3">
                    <ShadButton type="submit">{isEditing ? 'Update Species' : 'Add Species'}</ShadButton>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Cd</TableHead>
            <TableHead>Mass</TableHead>
            <TableHead>Radius</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Drag</TableHead>
            <TableHead className="text-right">PMD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {species.map((specie, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{specie.name}</TableCell>
                <TableCell>{specie.cd}</TableCell>
                <TableCell>{specie.mass}</TableCell>
                <TableCell>{specie.radius}</TableCell>
                <TableCell>{specie.area}</TableCell>
                <TableCell>{specie.active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{specie.drag ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">{specie.pmd}</TableCell>
                <TableCell className="text-right">
                  <button className="rounded-md border p-2 hover:bg-gray-100"
                    onClick={(e) => handleEditSpecies(e, species[index], index)}>
                    <span className="sr-only"></span>
                    <PencilIcon className="w-4" />
                  </button>
                </TableCell>
                <TableCell>
                  <button className="rounded-md border p-2 hover:bg-gray-100"
                    onClick={(e) => handleDeleteSpecies(e, index)}>
                    <span className="sr-only"></span>
                    <TrashIcon className="w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
          
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  </div>
  );
}
