"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { SummaryGraphProps } from '@/app/lib/definitions';

// Dynamically import Plotly to ensure it only runs on the client side
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const LaunchGraph: React.FC<SummaryGraphProps> = ({ results }) => {
  const plotData = results;

  console.log("Launch Graph Data:", plotData)

  if (!plotData.launch || plotData.launch.length === 0) {
    return <div>There are no launches for this simulation</div>;
  }

  const { times, launch } = plotData;

  if (!times || !times.length) {
    console.error('Time points data is missing or empty:', times);
    return <div>Error: Time points data is missing or empty</div>;
  }

  // Generate traces for each species
  const launchTraces = launch.map((launchData: any) => ({
    x: times,
    y: launchData.counts,
    mode: 'lines',
    name: launchData.species
  }));

  // Debugging: log the generated traces
  console.log("Launch Traces:", launchTraces);

  const launchLayout: Partial<Plotly.Layout> = {
    title: 'Launch Counts for Each Time Step',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Count Across All Alt Bins' }
  };

  return (
    <div style={{ marginBottom: '50px' }}>
      <Plot
        data={launchTraces}
        layout={launchLayout}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default LaunchGraph;
