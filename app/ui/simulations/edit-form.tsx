'use client';
import { FormEvent, useState } from 'react'
import { SimulationForm, SimulationNames } from '@/app/lib/definitions';
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
import { createSimulation, updateSimulation} from '@/app/lib/actions';
import { Species } from '@/app/lib/definitions';
const { v4: uuidv4 } = require('uuid');
import { useEffect } from 'react';

export default function Form({ sim_names, simulation, edit }: { sim_names: SimulationNames[], simulation: SimulationForm | null, edit: boolean}) { 
  // Create a hook that hides certain fields based on the toggle
  const [isVisible, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  }

  // This will handle when new species are added to the simulation
  const [species, setSpecies] = useState<Species[]>([]);
  const [newSpecies, setNewSpecies] = useState<Species | null>(null);


  useEffect(() => {
    // print the simluation.species type to the console
    console.log('ime here')
    setSpecies(edit && simulation ? simulation.species : []);
  }, [edit, simulation]);
  

  const [isEditing, setIsEditing] = useState(false);
  const [currentSpecies, setCurrentSpecies] = useState(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpecies, setEditingSpecies] = useState<Species | null>(null);

  const handleEditSpecies = (e: React.FormEvent, species: Species, index: number) => {
      e.preventDefault();
      setIsEditing(true);
      setNewSpecies({ ...species });
      setEditingIndex(index);
      setIsDialogOpen(true); 
  };
  
  const handleAddSpecies = (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
    
      if (isEditing) {
          if (editingIndex !== null && newSpecies !== null) {
              const newSpeciesList = [...species];
              newSpeciesList[editingIndex] = newSpecies;
              setSpecies(newSpeciesList);
              setEditingIndex(null);
          }
      } else {
          if (newSpecies !== null) {
              console.log(newSpecies)
              setSpecies([...species, newSpecies]);
          }
      }
    
      setNewSpecies(null);
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

  const handleSim = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Handle the none required fields
    if (form.get('description') === null) {
      form.set('description', '');
    }
    
    // This function will take the current simulation data and format it correctly. 
    const sim: SimulationForm = {
      id: simulation?.id ?? uuidv4(),
      simulation_name: form.get('simulationName') as string,
      owner: form.get('owner') as string,
      description: form.get('description') as string,
      created: new Date().toISOString(),
      status: "not started",
      scenario_properties: {
        start_date: form.get('startDate') as string,
        simulation_duration: parseInt(form.get('simulationDuration') as string),
        steps: parseInt(form.get('steps') as string),
        max_altitude: parseInt(form.get('maxAltitude') as string),
        min_altitude: parseInt(form.get('minAltitude') as string),
        n_shells: parseInt(form.get('nShells') as string),
        integrator: form.get('integrator') as string,
        density_model: form.get('densityModel') as string,
        LC: parseFloat(form.get('launchCoefficient') as string),
        v_imp: parseFloat(form.get('impactVelocity') as string),
        launch_function: form.get('launchFunction') as string
      },
      species: species,
      modified: new Date().toISOString(),
    }

    updateSimulation(sim);
  }

  return (
  <div>
    <div className="flex justify-end items-center">
      <label className="text-sm font-medium">Advanced Options</label>
      <Switch className="ml-2" onCheckedChange={toggleVisibility}/>
    </div> 
    <form onSubmit={handleSim}>     
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Simulation Name */}
        <div className="mb-4">
          <label htmlFor="simulationName" className="mb-2 block text-sm font-medium">
            Simulation Name
          </label>
          <div className="relative">
            <input
              id="simulationName"
              name="simulationName"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Name"
              required={true}
              defaultValue={edit ? simulation?.simulation_name : ''}
            >
            </input>
            <CodeBracketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Simulation Owner */}
        <div className="mb-4">
          <label htmlFor="owner" className="mb-2 block text-sm font-medium">
            What is your name?
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="owner"
                name="owner"
                placeholder="Owner"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={edit ? simulation?.owner : ''}
                required={true}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Model Description */}
        <div className="mb-4" hidden={isVisible}>
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Model Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required={false}
                defaultValue={edit ? simulation?.description : ''}
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
                          required={true}
                          defaultValue={edit ? simulation?.scenario_properties.start_date : ''}
                        />
                      <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="simulationDuration" className="mb-2 block text-sm font-medium">
                      Simulation Duration (years)
                  </label>
                  <div className="relative">
                      <input
                          id="simulationDuration"
                          name="simulationDuration"
                          type="number"
                          defaultValue={edit ? simulation?.scenario_properties.simulation_duration : '100'}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          required={true}
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
                          defaultValue={edit ? simulation?.scenario_properties.steps : '100'}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          required={true}
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
                          defaultValue={edit ? simulation?.scenario_properties.max_altitude : '2000'}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          required={true}
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
                          defaultValue={edit ? simulation?.scenario_properties.min_altitude : '500'}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          required={true}
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
                          defaultValue={edit ? simulation?.scenario_properties.n_shells : '10'}
                          required={true}
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
                          defaultValue={edit ? simulation?.scenario_properties.integrator : 'BDF'}
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
                          defaultValue={edit ? simulation?.scenario_properties.density_model : 'JB2008_dens_func'}
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
                          defaultValue={edit ? simulation?.scenario_properties.LC : '0.9'}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <RocketLaunchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md" hidden={isVisible}>
                  <label htmlFor="impactVelocity" className="mb-2 block text-sm font-medium">
                      Impact Velocity (km/s)
                  </label>
                  <div className="relative">
                      <input
                          id="impactVelocity"
                          name="impactVelocity"
                          type="number"
                          defaultValue={edit ? simulation?.scenario_properties.v_imp : '10'}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ArrowsPointingInIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

          </fieldset>
        </div>

        <Table>
        <TableCaption>
          <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogTrigger>{isEditing ? 'Edit Species' : '+ Add New Species +'}</DialogTrigger>
              <DialogContent >
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
                      value={newSpecies?.sym_name?.toString() ?? ''}
                      onChange={(e) => setNewSpecies({ ...newSpecies, sym_name: e.target.value })}
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
                        value={newSpecies?.Cd}
                        onChange={(e) => setNewSpecies({ ...newSpecies, Cd: e.target.value })}
                      />
                    </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                      <Label htmlFor="mass" className="text-right">
                          Mass (kg)
                      </Label>
                      <Input
                          id="mass"
                          type='text'
                          className="col-span-1"
                          required={true}
                          defaultValue={newSpecies?.mass?.toString()}
                          onChange={(e) => setNewSpecies({ ...newSpecies, mass: parseFloat(e.target.value) })}
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
                          defaultValue={newSpecies?.radius?.toString() ?? ''}
                          onChange={(e) => setNewSpecies({ ...newSpecies, radius: parseFloat(e.target.value) })}
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
                          defaultValue={newSpecies?.A?.toString() ?? ''}
                          onChange={(e) => setNewSpecies({ ...newSpecies, A: parseFloat(e.target.value) } as Species)}
                      />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-3">
                      <Label htmlFor="active" className="text-right">
                          Active
                      </Label>
                      <Switch
                          id="active"
                          className="col-span-3"
                          defaultValue={newSpecies?.active?.toString() ?? ''}
                          onCheckedChange={() => newSpecies && setNewSpecies({ ...newSpecies, active: !newSpecies.active })}
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
                          checked={newSpecies?.drag_effected}
                          onCheckedChange={() => setNewSpecies({ ...newSpecies, drag_effected: !newSpecies?.drag_effected })}
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
                          value={newSpecies?.Pm ?? ''}
                          onChange={(e) => setNewSpecies({ ...newSpecies, Pm: parseFloat(e.target.value) })}
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
            <TableCell className="font-medium">{specie.sym_name}</TableCell>
            <TableCell>{specie.Cd}</TableCell>
            <TableCell>{specie.mass}</TableCell>
            <TableCell>{specie.radius}</TableCell>
            <TableCell>{specie.A}</TableCell>
            <TableCell>{specie.active ? 'Yes' : 'No'}</TableCell>
            <TableCell>{specie.drag_effected ? 'Yes' : 'No'}</TableCell>
            <TableCell className="text-right">{specie.Pm}</TableCell>
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
      </div>

      
          
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/simulations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">{edit ? "Update Simulation" : "Create Simulation"}</Button>
      </div>
    </form>
  </div>
  );
}
