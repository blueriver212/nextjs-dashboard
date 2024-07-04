"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {SummaryGraphProps, PlotData} from '@/app/lib/definitions';

// Dynamically import Plotly to ensure it only runs on the client side
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


const SummaryGraph: React.FC<SummaryGraphProps> = ({results}) => {
    const plotData = results;

    console.log(plotData.population_data[100])

    if (!plotData) {
        return <div>Loading...</div>;
    }

    const { times, species, population_data } = plotData;

    if (!times || !times.length) {
        console.error('Time points data is missing or empty:', times);
        return <div>Error: Time points data is missing or empty</div>;
    }

    // Initialize speciesData for each species
    const speciesData = species.map(speciesName => {
        const populationsByTime = new Array(times.length).fill(0);
        population_data
            .filter(data => data.species === speciesName) // Using the correct key here
            .forEach(data => {
                data.populations.forEach((population, idx) => {
                    populationsByTime[idx] += population;
                });
            });
        return populationsByTime;
    });

    // Generate traces for each species
    const summaryTraces = species.map((speciesName, idx) => ({
        x: times,
        y: speciesData[idx],
        mode: 'lines',
        name: speciesName
    }));

    const summaryLayout: Partial<Plotly.Layout> = {
        title: 'Objects Over Time for Each Species',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Total Number of Objects' }
    };

    return (
        <div style={{ marginBottom: '50px' }}>
            <Plot
                data={summaryTraces}
                layout={summaryLayout}
                style={{ width: '100%', height: '500px' }}
            />
        </div>
    );
};

export default SummaryGraph;
