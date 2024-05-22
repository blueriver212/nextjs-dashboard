const { Client } = require('pg');
const { db } = require('@vercel/postgres');


const simulations = [
  {
    "simulation_name": "MOCAT Simulation",
    "owner": "Indigo Brownhall",
    "description": "Lorem ipsum and all that good stuff",
    "created": "2024-01-01T12:00:00Z",
    "modified": "2024-01-01T12:00:00Z",
    "status" : "not started",
    "scenario_properties": {
      "start_date": "01/03/2022",   
      "simulation_duration": 100,              
      "steps": 200,                            
      "min_altitude": 200,                   
      "max_altitude": 1400,                   
      "n_shells": 40,                         
      "launch_function": "Constant", 
      "integrator": "BDF",                
      "density_model": "JB2008_dens_func", 
      "LC": 0.1,                             
      "v_imp": 10.0                          
    },
    "species": {
      "S": {
        "sym_name": "S",
        "Cd": 2.2,
        "mass": [1250, 750, 148],
        "radius": [4, 2, 0.5],
        "A": "Calculated based on radius",
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8],
        "Pm": 0.90,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "slotted": true, 
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "Su": {
        "sym_name": "Su",
        "Cd": 2.2,
        "mass": [260, 473],
        "A": [1.6652, 13.5615],
        "radius": [0.728045069, 2.077681285],
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8, 8],
        "Pm": 0.65,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "RBflag": 0,
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "N": {
        "sym_name": "N",
        "Cd": 2.2,
        "mass": [0.00141372, 0.5670],
        "radius": [0.01, 0.1321],
        "A": "Calculated based on radius",
        "active": false,
        "maneuverable": false,
        "trackable": false,
        "deltat": null,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "RBflag": 0,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "launch_func": "launch_func_null",
        "pmd_func": "pmd_func_derelict",
        "drag_func": "drag_func_exp"
    },
    "Sns": {
        "sym_name": "Sns",
        "Cd": 2.2,
        "mass": 6,
        "radius": 0.105550206,
        "A": 0.035,
        "active": true,
        "maneuverable": false,
        "deltat": 3,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "slotted" : false, 
        "slotting_effectiveness": 0,
        "drag_effected": true,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "B": {
        "sym_name": "B",
        "RBflag" : 1,
        "Cd": 2.2,
        "mass": 1783.94,
        "radius": 2.687936011,
        "A": 22.6980069221863,
        "active": false,
        "slotted": false,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0, 
        "trackable": true,
        "pmd_func": "pmd_func_none",
        "drag_func": "drag_func_exp"
    }}
  },
  {
    "simulation_name": "Scenario Testing",
    "owner": "Charles Constant",
    "description": "This is a simulation file for the first fork of the MOCAT-SSEM Model.",
    "created": "2024-03-03T12:00:00Z",
    "modified": "2024-04-01T12:00:00Z",
    "status" : "in progress",
    "scenario_properties": {
      "start_date": "01/03/2022",   
      "simulation_duration": 100,              
      "steps": 200,                            
      "min_altitude": 200,                   
      "max_altitude": 1400,                   
      "n_shells": 40,                         
      "launch_function": "Constant", 
      "integrator": "BDF",                
      "density_model": "JB2008_dens_func", 
      "LC": 0.1,                             
      "v_imp": 10.0                          
    },
    "species": {
      "S": {
        "sym_name": "S",
        "Cd": 2.2,
        "mass": [1250, 750, 148],
        "radius": [4, 2, 0.5],
        "A": "Calculated based on radius",
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8],
        "Pm": 0.90,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "slotted": true, 
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "Su": {
        "sym_name": "Su",
        "Cd": 2.2,
        "mass": [260, 473],
        "A": [1.6652, 13.5615],
        "radius": [0.728045069, 2.077681285],
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8, 8],
        "Pm": 0.65,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "RBflag": 0,
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "N": {
        "sym_name": "N",
        "Cd": 2.2,
        "mass": [0.00141372, 0.5670],
        "radius": [0.01, 0.1321],
        "A": "Calculated based on radius",
        "active": false,
        "maneuverable": false,
        "trackable": false,
        "deltat": null,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "RBflag": 0,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "launch_func": "launch_func_null",
        "pmd_func": "pmd_func_derelict",
        "drag_func": "drag_func_exp"
    },
    "Sns": {
        "sym_name": "Sns",
        "Cd": 2.2,
        "mass": 6,
        "radius": 0.105550206,
        "A": 0.035,
        "active": true,
        "maneuverable": false,
        "deltat": 3,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "slotted" : false, 
        "slotting_effectiveness": 0,
        "drag_effected": true,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "B": {
        "sym_name": "B",
        "RBflag" : 1,
        "Cd": 2.2,
        "mass": 1783.94,
        "radius": 2.687936011,
        "A": 22.6980069221863,
        "active": false,
        "slotted": false,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0, 
        "trackable": true,
        "pmd_func": "pmd_func_none",
        "drag_func": "drag_func_exp"
    }}
  },
  {
    "simulation_name": "Testing Simulation",
    "owner": "Miles Lifson",
    "description": "A first test of a simulation to see if it works.",
    "created": "2024-01-01T12:00:00Z",
    "modified": "2024-01-01T12:00:00Z",
    "status": "completed",
    "scenario_properties": {
      "start_date": "01/03/2022",   
      "simulation_duration": 100,              
      "steps": 200,                            
      "min_altitude": 200,                   
      "max_altitude": 1400,                   
      "n_shells": 40,                         
      "launch_function": "Constant", 
      "integrator": "BDF",                
      "density_model": "JB2008_dens_func", 
      "LC": 0.1,                             
      "v_imp": 10.0                          
    },
    "species": {
      "S": {
        "sym_name": "S",
        "Cd": 2.2,
        "mass": [1250, 750, 148],
        "radius": [4, 2, 0.5],
        "A": "Calculated based on radius",
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8],
        "Pm": 0.90,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "slotted": true, 
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "Su": {
        "sym_name": "Su",
        "Cd": 2.2,
        "mass": [260, 473],
        "A": [1.6652, 13.5615],
        "radius": [0.728045069, 2.077681285],
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8, 8],
        "Pm": 0.65,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "RBflag": 0,
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "N": {
        "sym_name": "N",
        "Cd": 2.2,
        "mass": [0.00141372, 0.5670],
        "radius": [0.01, 0.1321],
        "A": "Calculated based on radius",
        "active": false,
        "maneuverable": false,
        "trackable": false,
        "deltat": null,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "RBflag": 0,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "launch_func": "launch_func_null",
        "pmd_func": "pmd_func_derelict",
        "drag_func": "drag_func_exp"
    },
    "Sns": {
        "sym_name": "Sns",
        "Cd": 2.2,
        "mass": 6,
        "radius": 0.105550206,
        "A": 0.035,
        "active": true,
        "maneuverable": false,
        "deltat": 3,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "slotted" : false, 
        "slotting_effectiveness": 0,
        "drag_effected": true,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "B": {
        "sym_name": "B",
        "RBflag" : 1,
        "Cd": 2.2,
        "mass": 1783.94,
        "radius": 2.687936011,
        "A": 22.6980069221863,
        "active": false,
        "slotted": false,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0, 
        "trackable": true,
        "pmd_func": "pmd_func_none",
        "drag_func": "drag_func_exp"
    }}
  },
  {
    "simulation_name": "Another Simulation",
    "owner": "Santosh Bhattarai",
    "description": "Seeing if the failed status works",
    "created": "2024-04-01T12:00:00Z",
    "modified": "2024-04-01T12:00:00Z",
    "status": "failed",
    "scenario_properties": {
      "start_date": "01/03/2022",   
      "simulation_duration": 100,              
      "steps": 200,                            
      "min_altitude": 200,                   
      "max_altitude": 1400,                   
      "n_shells": 40,                         
      "launch_function": "Constant", 
      "integrator": "BDF",                
      "density_model": "JB2008_dens_func", 
      "LC": 0.1,                             
      "v_imp": 10.0                          
    },
    "species": {
      "S": {
        "sym_name": "S",
        "Cd": 2.2,
        "mass": [1250, 750, 148],
        "radius": [4, 2, 0.5],
        "A": "Calculated based on radius",
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8],
        "Pm": 0.90,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "slotted": true, 
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "Su": {
        "sym_name": "Su",
        "Cd": 2.2,
        "mass": [260, 473],
        "A": [1.6652, 13.5615],
        "radius": [0.728045069, 2.077681285],
        "active": true,
        "maneuverable": true,
        "trackable": true,
        "deltat": [8, 8],
        "Pm": 0.65,
        "alpha": 1e-5,
        "alpha_active": 1e-5,
        "RBflag": 0,
        "slotting_effectiveness": 1.0,
        "drag_effected": false,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "N": {
        "sym_name": "N",
        "Cd": 2.2,
        "mass": [0.00141372, 0.5670],
        "radius": [0.01, 0.1321],
        "A": "Calculated based on radius",
        "active": false,
        "maneuverable": false,
        "trackable": false,
        "deltat": null,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "RBflag": 0,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "launch_func": "launch_func_null",
        "pmd_func": "pmd_func_derelict",
        "drag_func": "drag_func_exp"
    },
    "Sns": {
        "sym_name": "Sns",
        "Cd": 2.2,
        "mass": 6,
        "radius": 0.105550206,
        "A": 0.035,
        "active": true,
        "maneuverable": false,
        "deltat": 3,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0,
        "slotted" : false, 
        "slotting_effectiveness": 0,
        "drag_effected": true,
        "launch_func": "launch_func_constant",
        "pmd_func": "pmd_func_sat",
        "drag_func": "drag_func_exp"
    },
    "B": {
        "sym_name": "B",
        "RBflag" : 1,
        "Cd": 2.2,
        "mass": 1783.94,
        "radius": 2.687936011,
        "A": 22.6980069221863,
        "active": false,
        "slotted": false,
        "slotting_effectiveness": 1,
        "drag_effected": true,
        "Pm": 0,
        "alpha": 0,
        "alpha_active": 0, 
        "trackable": true,
        "pmd_func": "pmd_func_none",
        "drag_func": "drag_func_exp"
    }}
  }
];

async function seedSimulations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      DROP TABLE IF EXISTS simulations;
      CREATE TABLE IF NOT EXISTS simulations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        simulation_name VARCHAR(255) NOT NULL,
        owner VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created TIMESTAMPTZ NOT NULL,
        modified TIMESTAMPTZ NOT NULL,
        scenario_properties JSONB NOT NULL,
        species JSONB NOT NULL
      );
    `;

    console.log(`Created "simulation" table`);

      const insertedSimulations = await Promise.all(
        simulations.map(
          (simulation) => client.sql`
          INSERT INTO simulations (simulation_name, owner, description, created, modified, scenario_properties, species, status)
          VALUES (${simulation.simulation_name}, ${simulation.owner}, ${simulation.description}, ${simulation.created}, ${simulation.modified}, ${simulation.scenario_properties}, ${simulation.species}, ${simulation.status});        `,
        ),
      );
      
      return {
        createTable,
        simulations: insertedSimulations,
      };
    } catch (error) {
      console.error('Error seeding invoices:', error);
      throw error;
    }
  }

// seedSimulations();

// async function seedInvoices(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     customer_id UUID NOT NULL,
//     amount INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     date DATE NOT NULL
//   );
// `;

//     console.log(`Created "invoices" table`);

//     // Insert data into the "invoices" table
//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return {
//       createTable,
//       invoices: insertedInvoices,
//     };
//   } catch (error) {
//     console.error('Error seeding invoices:', error);
//     throw error;
//   }
// }

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "customers" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     // Insert data into the "customers" table
//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return {
//       createTable,
//       customers: insertedCustomers,
//     };
//   } catch (error) {
//     console.error('Error seeding customers:', error);
//     throw error;
//   }
// }

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();

  await seedSimulations(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
