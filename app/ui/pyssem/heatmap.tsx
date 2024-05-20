"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Dynamically import Plotly to ensure it only runs on the client side
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface Shell {
    shell_index: number;
    values: number[];
}

interface Species {
    name: string;
    shells: Shell[];
}

interface PlotData {
    species: Species[];
    time_points: number[];
}

interface Simulation {
    simulation_name: string;
    id: string;
    owner: string;
    description: string;
    created: string;
    modified: string;
    scenario_properties: {
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
    };
    species: {
        [key: string]: {
            sym_name: string;
            Cd: number;
            mass: number[];
            A: number[] | string;
            radius: number[];
            active: boolean;
            maneuverable: boolean;
            trackable: boolean;
            deltat: number[] | null;
            Pm: number;
            alpha: number;
            alpha_active: number;
            RBflag: number;
            slotting_effectiveness: number;
            drag_effected: boolean;
            launch_func: string;
            pmd_func: string;
            drag_func: string;
        };
    };
}

const PlotlyHeatmap: React.FC = () => {
    const [plotData, setPlotData] = useState<PlotData | null>(null);
    const [simulationData, setSimulationData] = useState<Simulation | null>(null);

    useEffect(() => {
        fetch('/plotly_data.json')
            .then(response => response.json())
            .then(data => setPlotData(data));

        fetch('/simulation.json')
            .then(response => response.json())
            .then(data => setSimulationData(data));
    }, []);

    if (!plotData || !simulationData) {
        return <div>Loading...</div>;
    }

    const { time_points, species } = plotData;
    const speciesInfo = simulationData.species;

    const numSpecies = species.length;
    const numShells = species[0].shells.length;

    return (
        <Accordion type="single" collapsible className="w-full">
            {species.map((species, speciesIndex) => {
                const speciesName = species.name;
                const speciesPrefix = speciesName.split('_')[0];
                const speciesData = speciesInfo[speciesPrefix];

                const dataPerSpecies = species.shells.map(shell => shell.values);

                const heatmapTrace: Partial<Plotly.PlotData> = {
                    z: dataPerSpecies,
                    x: time_points,
                    y: Array.from({ length: numShells }, (_, i) => i),
                    type: 'heatmap',
                    colorscale: 'Viridis'
                };

                const lineGraphTraces = species.shells.map(shell => ({
                    x: time_points,
                    y: shell.values,
                    mode: 'lines',
                    name: `Shell ${shell.shell_index}`
                }));

                const heatmapLayout: Partial<Plotly.Layout> = {
                    title: `${species.name} - Heatmap`,
                    xaxis: { title: 'Time' },
                    yaxis: { title: 'Orbital Shell', tickvals: Array.from({ length: numShells }, (_, i) => i) },
                };

                const lineGraphLayout: Partial<Plotly.Layout> = {
                    title: `${species.name} - Line Graph`,
                    xaxis: { title: 'Time' },
                    yaxis: { title: 'Number of Objects' }
                };

                return (
                    <AccordionItem key={speciesIndex} value={`item-${speciesIndex}`}>
                        <AccordionTrigger>{species.name}</AccordionTrigger>
                        <AccordionContent>
                            {speciesData && (
                                <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                                    <div><strong>Symbol Name:</strong> {speciesData.sym_name}</div>
                                    <div><strong>Cd:</strong> {speciesData.Cd}</div>
                                    <div><strong>Mass:</strong> {speciesData.mass.join(', ')}</div>
                                    <div><strong>Radius:</strong> {speciesData.radius.join(', ')}</div>
                                    <div><strong>Active:</strong> {speciesData.active ? 'Yes' : 'No'}</div>
                                    <div><strong>Maneuverable:</strong> {speciesData.maneuverable ? 'Yes' : 'No'}</div>
                                    <div><strong>Trackable:</strong> {speciesData.trackable ? 'Yes' : 'No'}</div>
                                    <div><strong>Delta t:</strong> {speciesData.deltat ? speciesData.deltat.join(', ') : 'N/A'}</div>
                                    <div><strong>Pm:</strong> {speciesData.Pm}</div>
                                    <div><strong>Alpha:</strong> {speciesData.alpha}</div>
                                    <div><strong>Alpha Active:</strong> {speciesData.alpha_active}</div>
                                    <div><strong>RBflag:</strong> {speciesData.RBflag}</div>
                                    <div><strong>Slotting Effectiveness:</strong> {speciesData.slotting_effectiveness}</div>
                                    <div><strong>Drag Effected:</strong> {speciesData.drag_effected ? 'Yes' : 'No'}</div>
                                    <div><strong>Launch Func:</strong> {speciesData.launch_func}</div>
                                    <div><strong>PMD Func:</strong> {speciesData.pmd_func}</div>
                                    <div><strong>Drag Func:</strong> {speciesData.drag_func}</div>
                                </div>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '50px' }}>
                                <div style={{ flex: 1 }}>
                                    <Plot
                                        data={[heatmapTrace]}
                                        layout={heatmapLayout}
                                        style={{ width: '100%', height: '400px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Plot
                                        data={lineGraphTraces}
                                        layout={lineGraphLayout}
                                        style={{ width: '100%', height: '400px' }}
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default PlotlyHeatmap;
