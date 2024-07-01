// "use client";

// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import Plotly to ensure it only runs on the client side
// const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// interface PopulationData {
//     shell: number;
//     species: string;
//     populations: number[];
// }

// interface PlotData {
//     population_data: PopulationData[];
//     times: number[];
//     max_altitude: number;
//     min_altitude: number;
//     hmid: number[];
//     species: string[];
// }

// interface SummaryGraphProps {
//     simulation: any;
// }

// const SummaryGraph: React.FC<SummaryGraphProps> = ({ simulation }) => {
//     // const [plotData, setPlotData] = useState<PlotData | null>(null);

//     // useEffect(() => {
//     //     fetch('/plotly_data.json')
//     //         .then(response => response.json())
//     //         .then(data => setPlotData(data));
//     // }, []);

//     // if (!plotData) {
//     //     return <div>Loading...</div>;
//     // }
//     const plotData = simulation;


//     const { times, species, population_data } = plotData;

//     const speciesData = species.map(speciesName => {
//         return population_data
//             .filter(data => data.species === speciesName)
//             .map(data => data.populations);
//     });

//     const speciesTotals = speciesData.map(speciesPopulations => {
//         return speciesPopulations.reduce((acc, populations) => {
//             populations.forEach((population, idx) => {
//                 acc[idx] = (acc[idx] || 0) + population;
//             });
//             return acc;
//         }, new Array(times.length).fill(0));
//     });

//     const totalAllSpecies = speciesTotals.reduce((acc, speciesTotal) => {
//         return acc.map((sum, value, idx) => sum + value, acc);
//     }, new Array(times.length).fill(0));

//     const summaryTraces = species.map((speciesName, idx) => ({
//         x: times,
//         y: speciesTotals[idx],
//         mode: 'lines',
//         name: speciesName
//     }));

//     summaryTraces.push({
//         x: times,
//         y: totalAllSpecies,
//         mode: 'lines',
//         name: 'Total All Species',
//         // line: { color: 'black', width: 2, dash: 'dash' }
//     });

//     const summaryLayout: Partial<Plotly.Layout> = {
//         title: 'Objects Over Time for Each Species and Total',
//         xaxis: { title: 'Time' },
//         yaxis: { title: 'Total Number of Objects' }
//     };

//     return (
//         <div style={{ marginBottom: '50px' }}>
//             <Plot
//                 data={summaryTraces}
//                 layout={summaryLayout}
//                 style={{ width: '100%', height: '500px' }}
//             />
//         </div>
//     );
// };

// export default SummaryGraph;

"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to ensure it only runs on the client side
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PopulationData {
    shell: number;
    species: string;
    populations: number[];
}

interface PlotData {
    population_data: PopulationData[];
    times: number[];
    max_altitude: number;
    min_altitude: number;
    hmid: number[];
    species: string[];
}

interface SummaryGraphProps {
    simulation: PlotData;
}

const SummaryGraph: React.FC<SummaryGraphProps> = ({ simulation }) => {
    const plotData = simulation;

    if (!plotData) {
        return <div>Loading...</div>;
    }

    const { times, species, population_data } = plotData;

    if (!times || !times.length) {
        console.error('Time points data is missing or empty:', times);
        return <div>Error: Time points data is missing or empty</div>;
    }

    const speciesData = species.map(speciesName => {
        return population_data
            .filter(data => data.species === speciesName)
            .map(data => data.populations);
    });

    const speciesTotals = speciesData.map(speciesPopulations => {
        return speciesPopulations.reduce((acc, populations) => {
            populations.forEach((population, idx) => {
                acc[idx] = (acc[idx] || 0) + population;
            });
            return acc;
        }, new Array(times.length).fill(0));
    });

    const totalAllSpecies = speciesTotals.reduce((acc, speciesTotal) => {
        return acc.map((sum, value, idx) => sum + value, acc);
    }, new Array(times.length).fill(0));

    const summaryTraces = species.map((speciesName, idx) => ({
        x: times,
        y: speciesTotals[idx],
        mode: 'lines',
        name: speciesName
    }));

    summaryTraces.push({
        x: times,
        y: totalAllSpecies,
        mode: 'lines',
        name: 'Total All Species',
        // line: { color: 'black', width: 2, dash: 'dash' }
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
