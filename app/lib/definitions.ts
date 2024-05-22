// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type SimulationForm = {
  id: string;
  simulation_name: string;
  owner: string;
  description: string;
  created: string;
  modified: string;
  status: string;
  scenario_properties: ScenarioProperties;
  species: Record<string, Species>;
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
  A?: string | number | number[];
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
  deltat?: number | number[];
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
  launch_func?: string;
  pmd_func?: string;
  drag_func?: string;
  trackable_radius_threshold?: number;
};