'use client';
import { FormEvent, useState, useEffect } from 'react';
import { SimulationForm, SimulationNames, Species } from '@/app/lib/definitions';
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/app/ui/button';
import { Button as ShadButton } from '@/components/ui/button';
import { createSimulation, updateSimulation } from '@/app/lib/actions';

const { v4: uuidv4 } = require('uuid');

const speciesTemplates: Species[] = [
  {
    sym_name: "S",
    Cd: 2.2,
    mass: 1250,
    radius: 4,
    A: "Calculated based on radius",
    active: true,
    maneuverable: true,
    trackable: true,
    deltat: 8,
    Pm: 0.90,
    alpha: 1e-5,
    alpha_active: 1e-5,
    slotted: true,
    slotting_effectiveness: 1.0,
    drag_effected: false,
    launch_func: "launch_func_constant",
    pmd_func: "pmd_func_sat",
    drag_func: "drag_func_exp"
  },
  {
    sym_name: "Su",
    Cd: 2.2,
    mass: 260,
    A: 1.6652,
    radius: 0.728045069,
    active: true,
    maneuverable: true,
    trackable: true,
    deltat: 8,
    Pm: 0.65,
    alpha: 1e-5,
    alpha_active: 1e-5,
    RBflag: 0,
    slotting_effectiveness: 1.0,
    drag_effected: false,
    launch_func: "launch_func_constant",
    pmd_func: "pmd_func_sat",
    drag_func: "drag_func_exp"
  },
  {
    sym_name: "N",
    Cd: 2.2,
    mass: 0.00141372,
    radius: 0.01,
    A: "Calculated based on radius",
    active: false,
    maneuverable: false,
    trackable: false,
    deltat: null,
    Pm: 0,
    alpha: 0,
    alpha_active: 0,
    RBflag: 0,
    slotting_effectiveness: 1,
    drag_effected: true,
    launch_func: "launch_func_null",
    pmd_func: "pmd_func_derelict",
    drag_func: "drag_func_exp"
  },
  {
    sym_name: "Sns",
    Cd: 2.2,
    mass: 6,
    radius: 0.105550206,
    A: 0.035,
    active: true,
    maneuverable: false,
    deltat: 3,
    Pm: 0,
    alpha: 0,
    alpha_active: 0,
    slotted: false,
    slotting_effectiveness: 0,
    drag_effected: true,
    launch_func: "launch_func_constant",
    pmd_func: "pmd_func_sat",
    drag_func: "drag_func_exp"
  },
  {
    sym_name: "B",
    RBflag: 1,
    Cd: 2.2,
    mass: 1783.94,
    radius: 2.687936011,
    A: 22.6980069221863,
    active: false,
    slotted: false,
    slotting_effectiveness: 1,
    drag_effected: true,
    Pm: 0,
    alpha: 0,
    alpha_active: 0,
    trackable: true,
    pmd_func: "pmd_func_none",
    drag_func: "drag_func_exp",
    launch_func: null
  }
];

// export default function Form({
//   sim_names,
//   simulation,
//   edit
// }: {
//   sim_names: SimulationNames[];
//   simulation: SimulationForm | null;
//   edit: boolean;
// }) {

//   // Creating one form that handles both edit and new based on whether the edit flag is set to true
//   const [newSpecies, setNewSpecies] = useState<Species | null>(null);
//   const [selectedTemplate, setSelectedTemplate] = useState('');
//   const [species, setSpecies] = useState<Species[]>([]);

//   const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const template = speciesTemplates.find((species) => species.sym_name === e.target.value);
//     if (template) {
//       setNewSpecies({ ...template }); 
//     }
//     setSelectedTemplate(e.target.value);
//   };

//   // Create a hook that hides certain fields based on the toggle
//   const [isVisible, setVisibility] = useState(true);

//   const toggleVisibility = () => {
//     setVisibility(!isVisible);
//   };

//   // This will handle when new species are added to the simulation
//   useEffect(() => {
//     if (edit && simulation) {
//       setSpecies(simulation.species);
//     }
//   }, [edit, simulation]);

//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleEditSpecies = (e: React.FormEvent, species: Species, index: number) => {
//     e.preventDefault();
//     setIsEditing(true);
//     setNewSpecies({ ...species });
//     setEditingIndex(index);
//     setIsDialogOpen(true);
//   };

//   const handleAddSpecies = (e: React.FormEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (isEditing) {
//         if (editingIndex !== null && newSpecies !== null) {
//             const newSpeciesList = [...species];
//             newSpeciesList[editingIndex] = newSpecies;
//             setSpecies(newSpeciesList);
//             setEditingIndex(null);
//         }
//     } else {
//         if (newSpecies !== null) {
//             console.log(newSpecies)
//             setSpecies([...species, newSpecies]);
//         }
//     }
//     setNewSpecies(null);
//     setIsEditing(false);
// };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const handleDeleteSpecies = (e: React.MouseEvent, index: number) => {
//     e.preventDefault();
//     const newSpeciesList = [...species];
//     newSpeciesList.splice(index, 1);
//     setSpecies(newSpeciesList);
//   };

//   const handleSim = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = new FormData(event.currentTarget);

//     // Handle the non-required fields
//     if (!form.get('description')) {
//       form.set('description', '');
//     }

//     // This function will take the current simulation data and format it correctly.
//     const sim: SimulationForm = {
//       id: uuidv4(),
//       simulation_name: form.get('simulationName') as string,
//       owner: form.get('owner') as string,
//       description: form.get('description') as string,
//       created: new Date().toISOString(),
//       status: "not started",
//       scenario_properties: {
//         start_date: form.get('startDate') as string,
//         simulation_duration: parseInt(form.get('simulationDuration') as string),
//         steps: parseInt(form.get('steps') as string),
//         max_altitude: parseInt(form.get('maxAltitude') as string),
//         min_altitude: parseInt(form.get('minAltitude') as string),
//         n_shells: parseInt(form.get('nShells') as string),
//         integrator: form.get('integrator') as string,
//         density_model: form.get('densityModel') as string,
//         LC: parseFloat(form.get('launchCoefficient') as string),
//         v_imp: parseFloat(form.get('impactVelocity') as string),
//         launch_function: "Constant"
//       },
//       species: species,
//       modified: new Date().toISOString(),
//     };

//     if (edit) {
//       await updateSimulation(sim);
//     } else {
//       await createSimulation(sim);
//     }
//   };

export default function Form({ sim_names, simulation, edit }: { sim_names: SimulationNames[], simulation: SimulationForm | null, edit: boolean}) {
  // Creating one form that handle both edit and new based on whether the edit flag is set to true
  const [newSpecies, setNewSpecies] = useState<Species | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [species, setSpecies] = useState<Species[]>([]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const template = speciesTemplates.find((species) => species.sym_name === e.target.value);
    if (template) {
      setNewSpecies({ ...template }); 
    }
    setSelectedTemplate(e.target.value);
  };

  
  // Create a hook that hides certain fields based on the toggle
  const [isVisible, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  }


  useEffect(() => {
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
      id: uuidv4(),
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
        // launch_function: form.get('launchFunction') as string
        launch_function: "Constant"
      },
      species: species,
      modified: new Date().toISOString(),
    }

    createSimulation(sim);
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
                placeholder=' '
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
                          defaultValue="100"
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
                          defaultValue="100"
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
                          defaultValue="2000"
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
                          defaultValue="500"
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
                          defaultValue="10"
                          required={true}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <WifiIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

              <div className="relative mt-2 rounded-md" hidden={true}>
                  <label htmlFor="integrator" className="mb-2 block text-sm font-medium">
                      Integrator Type
                  </label>
                  <div className="relative">
                      <input
                          id="integrator"
                          name="integrator"
                          type="text"
                          defaultValue="BDF"
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
                          defaultValue="static_exp_dens_func"
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
                          defaultValue="0.1"
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
                          defaultValue="10"
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      />
                      <ArrowsPointingInIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
              </div>

          </fieldset>
        </div>

        <Table>
        <TableCaption>
            <Sheet open={isDialogOpen} onOpenChange={closeDialog}>
              <SheetTrigger>{isEditing ? 'Edit Species' : '+ Add New Species +'}</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{isEditing ? 'Edit Species' : 'New Species'}</SheetTitle>
                  <SheetDescription>
                    {isEditing ? 'Edit an existing species in your simulation' : 'Add a new species to your simulation'}
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="w-full h-full rounded-md border p-4">    
            <div className="grid gap-10 py-4">
              <form onSubmit={handleAddSpecies}>
              <div className="grid grid-cols-4 items-center gap-4 mt-3">
                <Label htmlFor="speciesTemplate" className="col-span-4">
                  Select Species Template:
                </Label>
                <select
                  id="speciesTemplate"
                  className="col-span-4"
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                >
                  <option value="">Select a template</option>
                  <option value="Sns">Non-station-keeping Satellite</option>
                  <option value="B">Rocket Body</option>
                  <option value="Su">Station-keeping Satellite</option>
                  <option value="S">Coordinated Satellite</option>
                  <option value="N">Debris</option>
                  <option value="C">Candidate Satellite</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 mt-3">
                <Label htmlFor="speciesName" className="text-center">
                  Name
                </Label>
                <Input
                  id="speciesName"
                  className="col-span-2"
                  required={true}
                  value={newSpecies?.sym_name ?? ''}
                  readOnly
                />
              </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="cd" className="text-center">
                    Cd
                  </Label>
                  <Input
                    id="cd"
                    type="number"
                    className="col-span-2"
                    required={true}
                    value={newSpecies?.Cd ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, Cd: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="mass" className="text-center">
                    Mass (kg)
                  </Label>
                  <Input
                    id="mass"
                    type="number"
                    className="col-span-2"
                    required={true}
                    value={newSpecies?.mass?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, mass: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="radius" className="text-center">
                    Radius (m)
                  </Label>
                  <Input
                    id="radius"
                    type="number"
                    required={true}
                    className="col-span-2"
                    value={newSpecies?.radius?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, radius: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="area" className="text-center">
                    Area (m²)
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    className="col-span-2"
                    value={newSpecies?.A?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, A: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="active" className="text-center">
                    Active
                  </Label>
                  <div className="flex justify-center items-center col-span-2">
                    <Switch
                      id="active"
                      checked={newSpecies?.active ?? false}
                      defaultChecked={true}
                      onCheckedChange={() => setNewSpecies(prev => ({ ...prev, active: !prev?.active }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="maneuverable" className="text-center">
                    Maneuverable
                  </Label>
                  <div className="flex justify-center items-center col-span-2">

                  <Switch
                    id="maneuverable"
                    className="col-span-2"
                    checked={newSpecies?.maneuverable ?? false}
                    onCheckedChange={() => setNewSpecies({ ...newSpecies, maneuverable: !newSpecies?.maneuverable })}
                  />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="deltat" className="text-center">
                    Delta t
                  </Label>
                  <Input
                    id="deltat"
                    type="number"
                    className="col-span-2"
                    value={newSpecies?.deltat?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, deltat: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="pmd" className="text-center">
                    PMD (%)
                  </Label>
                  <div className="flex items-center col-span-2">
                    <Input
                      id="pmd"
                      type="range"
                      required={true}
                      min={0}
                      max={1}
                      step={0.01}
                      value={newSpecies?.Pm ?? 0}
                      onChange={(e) => setNewSpecies({ ...newSpecies, Pm: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="flex justify-between">
                  <span className="ml-2">{newSpecies?.Pm ?? 0}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="alpha" className="text-center">
                    Alpha
                  </Label>
                  <Input
                    id="alpha"
                    type="number"
                    className="col-span-2"
                    value={newSpecies?.alpha?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, alpha: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="alpha_active" className="text-center">
                    Alpha Active
                  </Label>
                  <Input
                    id="alpha_active"
                    type="number"
                    className="col-span-2"
                    value={newSpecies?.alpha_active?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, alpha_active: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="slotted" className="text-center">
                    Slotted
                  </Label>
                  <div className="flex justify-center items-center col-span-2">
                    <Switch
                      id="slotted"
                      className="col-span-2"
                      checked={newSpecies?.slotted ?? false}
                      onCheckedChange={() => setNewSpecies({ ...newSpecies, slotted: !newSpecies?.slotted })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="slotting_effectiveness" className="text-right">
                    Slotting Effectiveness
                  </Label>
                  <Input
                    id="slotting_effectiveness"
                    type="number"
                    className="col-span-2"
                    value={newSpecies?.slotting_effectiveness?.toString() ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, slotting_effectiveness: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="drag" className="text-right">
                    Affected By Drag?
                  </Label>
                  <div className="flex justify-center items-center col-span-2">
                    <Switch
                      id="drag"
                      className="col-span-2"
                      checked={newSpecies?.drag_effected ?? false}
                      onCheckedChange={() => setNewSpecies({ ...newSpecies, drag_effected: !newSpecies?.drag_effected })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="launch_func" className="text-right">
                    Launch Function
                  </Label>
                  <Input
                    id="launch_func"
                    type="text"
                    hidden={true}
                    readOnly
                    className="col-span-2"
                    value={newSpecies?.launch_func ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, launch_func: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="pmd_func" className="text-right">
                    PMD Function
                  </Label>
                  <Input
                    id="pmd_func"
                    type="text"
                    readOnly
                    className="col-span-2"
                    value={newSpecies?.pmd_func ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, pmd_func: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 mt-3">
                  <Label htmlFor="drag_func" className="text-right">
                    Drag Function
                  </Label>
                  <Input
                    id="drag_func"
                    type="text"
                    className="col-span-2"
                    readOnly
                    value={newSpecies?.drag_func ?? ''}
                    onChange={(e) => setNewSpecies({ ...newSpecies, drag_func: e.target.value })}
                  />
                </div>
                <div className="mt-6 flex justify-end gap-4 mt-3">
                  <ShadButton type="submit">{isEditing ? 'Update Species' : 'Add Species'}</ShadButton>
                </div>
              </form>
            </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
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
