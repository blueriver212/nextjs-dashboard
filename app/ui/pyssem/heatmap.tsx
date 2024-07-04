"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SimulationForm, PlotData } from '@/app/lib/definitions';

// Dynamically import Plotly to ensure it only runs on the client side
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const PlotlyHeatmap: React.FC<{ results: PlotData, simulation: SimulationForm }> = ({ results, simulation }) => {
    const { population_data, times, species } = results;
    const speciesInfo = simulation.species;

    const numShells = simulation.scenario_properties.n_shells;

    return (
        <Accordion type="single" collapsible className="w-full">
            {species.map((speciesName, speciesIndex) => {
                const speciesData = simulation.species.find(species => species.sym_name === speciesName);
                const speciesPopulationData = population_data.filter(data => data.species === speciesName);

                const dataPerShell = Array(numShells).fill(null).map(() => Array(times.length).fill(0));

                speciesPopulationData.forEach(data => {
                    data.populations.forEach((population, idx) => {
                        dataPerShell[data.shell - 1][idx] = population;
                    });
                });

                const heatmapTrace: Partial<Plotly.PlotData> = {
                    z: dataPerShell,
                    x: times,
                    y: Array.from({ length: numShells }, (_, i) => i + 1),
                    type: 'heatmap',
                    colorscale: 'Viridis'
                };

                const lineGraphTraces = dataPerShell.map((shellData, idx) => ({
                    x: times,
                    y: shellData,
                    mode: 'lines',
                    name: `Shell ${idx + 1}`
                }));

                const heatmapLayout: Partial<Plotly.Layout> = {
                    title: `${speciesName} - Heatmap`,
                    xaxis: { title: 'Time' },
                    yaxis: { title: 'Orbital Shell', tickvals: Array.from({ length: numShells }, (_, i) => i + 1) },
                };

                const lineGraphLayout: Partial<Plotly.Layout> = {
                    title: `${speciesName} - Line Graph`,
                    xaxis: { title: 'Time' },
                    yaxis: { title: 'Number of Objects' }
                };

                return (
                    <AccordionItem key={speciesIndex} value={`item-${speciesIndex}`}>
                        <AccordionTrigger>{speciesName}</AccordionTrigger>
                        <AccordionContent>
                            {speciesData && (
                                <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                                    <div><strong>Symbol Name:</strong> {speciesData.sym_name}</div>
                                    <div><strong>Cd:</strong> {speciesData.Cd}</div>
                                    <div><strong>Mass:</strong> {Array.isArray(speciesData.mass) ? speciesData.mass.join(', ') : speciesData.mass}</div>
                                    <div><strong>Radius:</strong> {Array.isArray(speciesData.radius) ? speciesData.radius.join(', ') : speciesData.radius}</div>
                                    <div><strong>Active:</strong> {speciesData.active ? 'Yes' : 'No'}</div>
                                    <div><strong>Maneuverable:</strong> {speciesData.maneuverable ? 'Yes' : 'No'}</div>
                                    <div><strong>Trackable:</strong> {speciesData.trackable ? 'Yes' : 'No'}</div>
                                    <div><strong>Delta t:</strong> {speciesData.deltat ? (Array.isArray(speciesData.deltat) ? speciesData.deltat.join(', ') : speciesData.deltat) : 'N/A'}</div>
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
