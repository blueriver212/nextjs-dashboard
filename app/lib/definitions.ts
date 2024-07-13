// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type SimulationForm = {
  id: string;
  simulation_name: string;
  owner: string;
  description: string;
  created: string;
  modified: string;
  status: string;
  scenario_properties: ScenarioProperties;
  species: Species[];
}

export type SimulationNames = {
  id: string;
  simulation_name: string;
}

export type ScenarioProperties =  {
  start_date: string;
  simulation_duration: number;
  steps: number;
  min_altitude: number;
  max_altitude: number;
  n_shells: number;
  launch_function: string;
  integrator: string;
  density_model: string;
  LC: number;
  v_imp: number;
}

export type Species = {
  sym_name?: string;
  sym?: any;
  Cd?: string | number;
  mass?: number | number[];
  mass_lb?: number;
  mass_ub?: number;
  radius?: number | number[];
  A?: any;
  amr?: number;
  beta?: number;
  B?: number;
  slotted?: boolean;
  slotting_effectiveness?: number;
  disposal_altitude?: number;
  drag_effected?: boolean;
  active?: boolean;
  maneuverable?: boolean;
  trackable?: boolean;
  deltat?: any;
  Pm?: number;
  alpha?: number;
  alpha_active?: number;
  RBflag?: number;
  orbit_raising?: boolean;
  insert_altitude?: number;
  onstation_altitude?: number;
  epsilon?: number;
  e_mean?: number;
  lambda_multiplier?: number;
  lambda_funs?: any;
  lambda_constant?: number;
  lambda_python_args?: any;
  pmd_linked_species?: any[];
  pmd_linked_multiplier?: number;
  eq_idxs?: any;
  last_calc_x?: number;
  last_calc_t?: number;
  last_lambda_dot?: number;
  saved_model_path?: string;
  t_plan_max?: number;
  t_plan_period?: number;
  prev_prop_results?: any;
  launch_func?: any;
  pmd_func?: string;
  drag_func?: string;
  trackable_radius_threshold?: number;
};

// PLOTTING
interface PopulationData {
  shell: number;
  species: string;
  populations: number[];
}

export interface LaunchGraphProps {
  species: string;
  counts: number[];
}

export interface PlotData {
  times: number[];
  max_altitude: number;
  min_altitude: number;
  Hmid: number[];
  species: string[];
  population_data: PopulationData[];
  launch: LaunchGraphProps[] | null;
  simulation_id: string;
}

export interface SummaryGraphProps {
  results: PlotData;
}


export const speciesTemplates: Species[] = [
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