"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to ensure it only runs on the client side
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PlotData {
    species: {
        name: string;
        shells: {
            shell_index: number;
            values: number[];
        }[];
    }[];
    time_points: number[];
}

const SummaryGraph: React.FC = () => {
    const [plotData, setPlotData] = useState<PlotData | null>(null);

    useEffect(() => {
        fetch('/plotly_data.json')
            .then(response => response.json())
            .then(data => setPlotData(data));
    }, []);

    if (!plotData) {
        return <div>Loading...</div>;
    }

    const { time_points, species } = plotData;

    const speciesTotals = species.map(species => {
        return species.shells.reduce((acc, shell) => {
            return acc.map((sum, idx) => sum + shell.values[idx]);
        }, new Array(time_points.length).fill(0));
    });

    const totalAllSpecies = speciesTotals.reduce((acc, speciesTotal) => {
        return acc.map((sum, idx) => sum + speciesTotal[idx]);
    }, new Array(time_points.length).fill(0));

    const summaryTraces = species.map((species, idx) => ({
        x: time_points,
        y: speciesTotals[idx],
        mode: 'lines',
        name: species.name
    }));

    summaryTraces.push({
        x: time_points,
        y: totalAllSpecies,
        mode: 'lines',
        name: 'Total All Species',
        line: { color: 'black', width: 2, dash: 'dash' }
    });

    const summaryLayout: Partial<Plotly.Layout> = {
        title: 'Objects Over Time for Each Species and Total',
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
