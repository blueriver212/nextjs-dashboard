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

const SimulationSummary: React.FC<{ simulation: SimulationForm }> = ({ simulation }) => {
  const { simulation_name, owner, description, created, modified, status, scenario_properties } = simulation;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-0">
        <AccordionTrigger>Simulation Properties</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><strong>Simulation Name:</strong> {simulation_name}</div>
            <div><strong>Owner:</strong> {owner}</div>
            <div><strong>Description:</strong> {description}</div>
            <div><strong>Date Created:</strong> {new Date(created).toLocaleString()}</div>
            <div><strong>Last Modified:</strong> {new Date(modified).toLocaleString()}</div>
            <div><strong>Status:</strong> {status}</div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>Scenario Properties</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><strong>Start Date:</strong> {scenario_properties.start_date}</div>
            <div><strong>Simulation Duration:</strong> {scenario_properties.simulation_duration}</div>
            <div><strong>Steps:</strong> {scenario_properties.steps}</div>
            <div><strong>Min Altitude:</strong> {scenario_properties.min_altitude}</div>
            <div><strong>Max Altitude:</strong> {scenario_properties.max_altitude}</div>
            <div><strong>Number of Shells:</strong> {scenario_properties.n_shells}</div>
            <div><strong>Launch Function:</strong> {scenario_properties.launch_function}</div>
            <div><strong>Integrator:</strong> {scenario_properties.integrator}</div>
            <div><strong>Density Model:</strong> {scenario_properties.density_model}</div>
            <div><strong>LC:</strong> {scenario_properties.LC}</div>
            <div><strong>Impact Velocity (v_imp):</strong> {scenario_properties.v_imp}</div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SimulationSummary;
