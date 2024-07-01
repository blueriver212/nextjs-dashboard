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
    "species": [
      {
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
    {
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
    {
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
    {
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
    {
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
    }]
  },
  {
    "simulation_name": "Another Simulation",
    "owner": "Miles Lifson",
    "description": "Lorem ipsum and all that good stuff",
    "created": "2024-01-01T12:00:00Z",
    "modified": "2024-01-01T12:00:00Z",
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
    "species": [
      {
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
    {
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
    {
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
    {
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
    {
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
    }]
  },
  {
    "simulation_name": "Scnerio 3 Simulation",
    "owner": "Charles Constant",
    "description": "Lorem ipsum and all that good stuff",
    "created": "2024-01-01T12:00:00Z",
    "modified": "2024-01-01T12:00:00Z",
    "status" : "failed",
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
    "species": [
      {
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
    {
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
    {
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
    {
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
    {
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
    }]
  },
  {
    "simulation_name": "Simulation 4",
    "owner": "Santosh Bhattarai",
    "description": "Lorem ipsum and all that good stuff",
    "created": "2024-01-01T12:00:00Z",
    "modified": "2024-01-01T12:00:00Z",
    "status" : "completed",
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
    "species": [
      {
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
    {
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
    {
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
    {
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
    {
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
    }]
  }, 
  {
    "simulation_name": "Test McTestface",
    "owner": "Marek Ziebart",
    "description": "Lorem ipsum and all that good stuff",
    "created": "2024-01-01T12:00:00Z",
    "modified": "2024-01-01T12:00:00Z",
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
    "species": [
      {
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
    {
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
    {
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
    {
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
    {
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
    }]
  }
];


const resultsData = {
  "id": "af13fafe-d885-48e7-aa85-4fbe2e2c083a",
  "times": [
      0.0,
      11.11111111111111,
      22.22222222222222,
      33.33333333333333,
      44.44444444444444,
      55.55555555555556,
      66.66666666666666,
      77.77777777777777,
      88.88888888888889,
      100.0
  ],
  "n_shells": 10,
  "species": [
      "Sns",
      "B"
  ],
  "Hmid": [
      575.0,
      725.0,
      875.0,
      1025.0,
      1175.0,
      1325.0,
      1475.0,
      1625.0,
      1775.0,
      1925.0
  ],
  "max_altitude": 2000,
  "min_altitude": 500,
  "population_data": [
      {
          "spcies": "Sns",
          "shell": 1,
          "populations": [
              444.0,
              227.36782088386954,
              207.0228038773439,
              208.02118526374753,
              196.9716252755636,
              198.89309624175658,
              188.39832801908585,
              204.7715127421863,
              214.11883867731177,
              216.1355689204619
          ]
      },
      {
          "spcies": "Sns",
          "shell": 2,
          "populations": [
              391.0,
              10.791463412717498,
              3.9052467737315966,
              3.2635301418546843,
              3.465910753400691,
              3.6524364443470168,
              3.5118186761062904,
              3.0054903400302595,
              3.963582687691883,
              4.046738319760103
          ]
      },
      {
          "spcies": "Sns",
          "shell": 3,
          "populations": [
              231.0,
              3.1723102664545406,
              0.44099969685944573,
              0.44994387902135297,
              0.6122081483397811,
              0.47925034835305785,
              0.25994679993642156,
              0.4097106733216929,
              0.6512559472968984,
              0.5150286985927445
          ]
      },
      {
          "spcies": "Sns",
          "shell": 4,
          "populations": [
              264.0,
              3.297837540072577,
              0.4342421439139289,
              0.43974739274664465,
              0.5973134611647203,
              0.4642882880916062,
              0.40232639268329756,
              0.44875450648095033,
              0.2834226392307426,
              0.41136032443268516
          ]
      },
      {
          "spcies": "Sns",
          "shell": 5,
          "populations": [
              45.0,
              1.17449961241521,
              0.0350091624472796,
              0.001617879821240714,
              0.0005833732062175357,
              0.0005062538678714142,
              0.0007192281810120974,
              0.0004267135741213628,
              0.00029990762243168825,
              0.00032581832429479275
          ]
      },
      {
          "spcies": "Sns",
          "shell": 6,
          "populations": [
              48.0,
              2.397642619796409,
              0.10532879919742485,
              0.018284233291882595,
              0.01684864490591064,
              0.017546302583461102,
              0.021937501923331795,
              0.013104766240305012,
              0.010462276101927532,
              0.009121303405364297
          ]
      },
      {
          "spcies": "Sns",
          "shell": 7,
          "populations": [
              596.0,
              13.949489239607644,
              0.8787538670775462,
              0.531951893038064,
              0.5228409762566559,
              0.5219334842184722,
              0.5173137007719392,
              0.5264459247018212,
              0.5291768842399228,
              0.33159889546790705
          ]
      },
      {
          "spcies": "Sns",
          "shell": 8,
          "populations": [
              45.0,
              1.006040946826283,
              0.021894868738206993,
              0.00048619639492719906,
              1.1014388336949332e-05,
              2.4860804120055055e-07,
              5.684957686519202e-09,
              1.2866842519750896e-10,
              2.918697714470601e-12,
              6.628034260451143e-14
          ]
      },
      {
          "spcies": "Sns",
          "shell": 9,
          "populations": [
              10.0,
              0.24649131410972466,
              0.006077577463294019,
              0.0001522339717473458,
              3.850193482483517e-06,
              9.580556188283473e-08,
              2.4524761992737956e-09,
              6.168548118175225e-11,
              1.539749328134819e-12,
              3.873298520507129e-14
          ]
      },
      {
          "spcies": "Sns",
          "shell": 10,
          "populations": [
              11.0,
              0.2655236303002727,
              0.006378938391089779,
              0.00015585073775694564,
              3.85384058277332e-06,
              9.402350635832108e-08,
              2.3525326120697053e-09,
              5.792405469388421e-11,
              1.4184998141292865e-12,
              3.498026762488862e-14
          ]
      },
      {
          "spcies": "B",
          "shell": 1,
          "populations": [
              203.0,
              287.2988903830722,
              369.1347224311475,
              445.0841925995899,
              514.7407904524881,
              583.5911028514007,
              650.7797296659832,
              720.9129518819565,
              783.3618098933707,
              837.6849328429174
          ]
      },
      {
          "spcies": "B",
          "shell": 2,
          "populations": [
              163.0,
              197.8857958428894,
              228.3924306372117,
              254.72445839884813,
              281.6864386301261,
              311.2310401231212,
              339.1089307629195,
              364.2288405590627,
              387.71837195670025,
              411.9163989259863
          ]
      },
      {
          "spcies": "B",
          "shell": 3,
          "populations": [
              140.0,
              158.47618520826208,
              179.0283469740368,
              198.34260669347486,
              217.44999302300857,
              236.7756285587118,
              254.5147522586057,
              271.0907592867661,
              289.47237390347175,
              308.6324422529118
          ]
      },
      {
          "spcies": "B",
          "shell": 4,
          "populations": [
              227.0,
              239.6392917156827,
              249.0419626342807,
              258.7805537449814,
              269.48164664456704,
              278.8246622619977,
              290.0402325880725,
              299.683974214675,
              307.9224097767605,
              317.8351725435046
          ]
      },
      {
          "spcies": "B",
          "shell": 5,
          "populations": [
              40.0,
              39.672283639682306,
              39.31516129169709,
              38.98825071961396,
              38.71509310800608,
              38.50122915741342,
              38.27755873197112,
              38.091161984761335,
              37.95331844839098,
              37.83669168626303
          ]
      },
      {
          "spcies": "B",
          "shell": 6,
          "populations": [
              29.0,
              34.03117004581321,
              37.97050166380074,
              41.34789390614106,
              44.67570107678471,
              48.485880327570506,
              52.17185202815568,
              55.835599892651906,
              59.96223244572628,
              63.011352709057434
          ]
      },
      {
          "spcies": "B",
          "shell": 7,
          "populations": [
              67.0,
              66.86201831498965,
              66.71268812890631,
              66.56234920699157,
              66.41728947031095,
              66.27735090535107,
              66.12685681596716,
              65.97745403470817,
              65.83224996573483,
              65.68104283689676
          ]
      },
      {
          "spcies": "B",
          "shell": 8,
          "populations": [
              51.0,
              50.672111004618515,
              50.29676425380724,
              49.925831667715684,
              49.57682128184877,
              49.24807677479998,
              48.89697066496927,
              48.55507157650592,
              48.22985491352739,
              47.89487577257777
          ]
      },
      {
          "spcies": "B",
          "shell": 9,
          "populations": [
              5.0,
              4.978365227788482,
              4.952961826486396,
              4.927569549068551,
              4.903716906743302,
              4.881557418207983,
              4.857403720735467,
              4.8338873544104315,
              4.8113984400073,
              4.788238665994896
          ]
      },
      {
          "spcies": "B",
          "shell": 10,
          "populations": [
              3.0,
              2.979080356955056,
              2.954980719315338,
              2.9311719770564872,
              2.908817393712216,
              2.887805676367763,
              2.8653070443482704,
              2.84341703706154,
              2.8226311774462927,
              2.801195988642125
          ]
      }
  ]
}

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
          VALUES (${simulation.simulation_name}, ${simulation.owner}, ${simulation.description}, ${simulation.created}, ${simulation.modified}, ${simulation.scenario_properties}, ${JSON.stringify(simulation.species)}, ${simulation.status});        `,
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


  async function seedResults(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      const createTable = await client.sql`
        DROP TABLE IF EXISTS results;
        CREATE TABLE IF NOT EXISTS results (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          times FLOAT8[] NOT NULL,
          n_shells INT NOT NULL,
          species TEXT[] NOT NULL,
          Hmid FLOAT8[] NOT NULL,
          max_altitude FLOAT8 NOT NULL,
          min_altitude FLOAT8 NOT NULL,
          population_data JSONB NOT NULL
        );
      `;
  
      console.log(`Created "results" table`);
  
      const insertResult = await client.sql`
        INSERT INTO results (id, times, n_shells, species, Hmid, max_altitude, min_altitude, population_data)
        VALUES (
          ${resultsData.id}, ${resultsData.times}, ${resultsData.n_shells},
          ${resultsData.species}, ${resultsData.Hmid}, ${resultsData.max_altitude},
          ${resultsData.min_altitude}, ${JSON.stringify(resultsData.population_data)}
        );
      `;
  
      return {
        createTable,
        insertResult,
      };
    } catch (error) {
      console.error('Error seeding results:', error);
      throw error;
    }
  }
  

async function main() {
  const client = await db.connect();

  await seedSimulations(client);

  await seedResults(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
