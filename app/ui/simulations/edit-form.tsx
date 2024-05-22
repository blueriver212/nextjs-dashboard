'use client';
import { useState, useEffect } from 'react'
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
import { SimulationForm } from '@/app/lib/definitions';
import { Species } from '@/app/lib/definitions';

export default function EditSimulationForm({ simulation }: { simulation: SimulationForm }) {
  // Create a hook that will show the advanced parts of the from based on the toggle
  const [isVisible, setVisibility] = useState(true);
  const toggleVisibility = () => {
    setVisibility(!isVisible);
  }

  const [species, setSpecies] = useState<Species[]>([]);
  const [newSpecies, setNewSpecies] = useState<Species | null>(null);

    useEffect(() => {
        if (simulation && simulation.species) {
            setSpecies([...Object.values(simulation.species)] as Species[]);
        }
    }, [simulation]);

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
      
        if (isEditing) {
            if (editingIndex !== null && newSpecies !== null) {
                const newSpeciesList = [...species];
                newSpeciesList[editingIndex] = newSpecies;
                setSpecies(newSpeciesList);
                setEditingIndex(null);
            }
        } else {
            if (newSpecies !== null) {
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
              defaultValue={simulation.simulation_name}
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
                defaultValue={simulation.owner}
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
                defaultValue={simulation.description}
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
                          defaultValue={simulation.created}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md">
                  <label htmlFor="simulationDuration" className="mb-2 block text-sm font-medium">
                      Simulation Duration (Years)
                  </label>
                  <div className="relative">
                      <input
                          id="simulationDuration"
                          name="simulationDuration"
                          type="number"
                          placeholder="Simulation Duration"
                          defaultValue={simulation.scenario_properties.simulation_duration}
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
                          defaultValue={simulation.scenario_properties.steps}
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
                          defaultValue={simulation.scenario_properties.max_altitude}
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
                          defaultValue={simulation.scenario_properties.min_altitude}
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
                          defaultValue={simulation.scenario_properties.n_shells}
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
                          defaultValue={simulation.scenario_properties.integrator}
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
                          defaultValue={simulation.scenario_properties.density_model}
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
                          defaultValue={simulation.scenario_properties.LC}
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
                            defaultValue={simulation.scenario_properties.v_imp}
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
                        value={newSpecies?.sym_name}
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
                        onChange={(e) => setNewSpecies({ ...newSpecies, area: e.target.value } as Species)}
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
