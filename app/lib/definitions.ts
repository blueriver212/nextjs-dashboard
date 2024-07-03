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
  spcies: string;  // Notice the typo here to match your data structure
  populations: number[];
}

export interface PlotData {
  population_data: PopulationData[];
  times: number[];
  max_altitude: number;
  min_altitude: number;
  hmid: number[];
  species: string[];
}

export interface SummaryGraphProps {
  results: PlotData;
}
